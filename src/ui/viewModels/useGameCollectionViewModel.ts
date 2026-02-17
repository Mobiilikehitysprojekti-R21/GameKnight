import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import type { BoardGame } from "../../domain/entities/BoardGame";
//import { useAuth } from "../auth/useAuth";
import { BoardGameApiRepository } from "../../infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "../../application/FindBoardGames";
import { AddGameToCollection } from "../../application/AddGameToCollection";
import { GetGameCollection } from "../../application/GetGameCollection";
import { DeleteBoardGame } from "../../application/DeleteBoardGame";
import { useHomeScreenViewModel } from "./useHomeScreenViewModel";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Viewmodel hook for game collection logic

export function useGameCollectionViewModel(repo: BoardGameApiRepository) {


    //const { isLoggedIn } = useAuth()    // authentication state
    const [games, setGames] = useState<BoardGame[]>([]) // user´s game collection
    const [searhedGame, setSearchedGame] = useState<BoardGame[]>()  // Search result of game search
    const [bggId, setBggId] = useState<BoardGame["bgg_id"]>()       // Selected game´s bgg_id
    const [loading, setLoading] = useState(true)                    // Loading state
    const [isGameChosen, setIsGameChosen] = useState(false)         // Indicates if user has chosen a game from the list of search results
    const [isGameAdded, setIsGameAdded] = useState(false)           // Indicates if game has been successfully added to the collection

    // Repository and use cases
    const findBoardgames = new FindBoardGames(repo)
    const addGameToCollection = new AddGameToCollection(repo)
    const getGameCollection = new GetGameCollection(repo)
    const deleteBoardGame = new DeleteBoardGame(repo)

    const STORAGE_KEY = "my_games";

    const [nickname, setNickname] = useState<string | null>(null)
    const [auth0_id, setAuth0_id] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const auth = useAuth()


    // Load user´s game collection, set loading state
    const loadGames = async () => {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY)
            console.log('loadgames json:', json)

            if (json) {
                const storedGames = JSON.parse(json) as BoardGame[]
                setGames(storedGames)

            } else {
                if (!auth0_id) {
                    alert('Virhe: Auth0 ID:tä ei löytynyt.')
                    return
                }
                const gamelist = await getGameCollection.execute(auth0_id)
                console.log('pelilista: ', gamelist)
                setGames(gamelist)
            }
        } catch (e) {
            console.error('Failed to load game collection', e)
        } finally {
            setLoading(false)
        }
    }

    //  fetch user info when the ViewModel is mounted
    useEffect(() => {
        setNickname(auth.user?.nickname ?? null)
        setAuth0_id(auth.user?.sub ?? null)
        setEmail(auth.user?.email ?? null)
        console.log("GCVM: ", auth.user?.nickname, auth.user?.sub, auth.user?.email)
    }, [auth.user])

    // Load game collection when user info is set
    useEffect(() => {
        console.log("auth0 selvitetty: ", auth0_id)
        if (!auth0_id) return

        loadGames()
    }, [auth0_id])


    // Save gamelist to local storage
    useEffect(() => {
        const storeGames = async () => {
            if (loading) return; // älä tallenna ennen kuin lataus on valmis
            try {
                console.log('Tallennetaan pelejä', games);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(games));
            } catch (e) {
                console.error("Failed to store games", e);
            }
        };

        storeGames();
    }, [games, loading]);


    // Load game collection when user info is set
    useEffect(() => {
        console.log("auth0 selvitetty: ", auth0_id)
        if (!auth0_id) return

        loadGames()
    }, [auth0_id])


    // Save gamelist to local storage
    useEffect(() => {
        const storeGames = async () => {
            if (loading) return; // älä tallenna ennen kuin lataus on valmis
            try {
                console.log('Tallennetaan pelejä', games);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(games));
            } catch (e) {
                console.error("Failed to store games", e);
            }
        };

        storeGames();
    }, [games, loading]);


    // Remove a game from local state after deletion
    const handleDeleteGame = async (gameId: number, auth0_id: string) => {
        
        if (!gameId) {
            alert('Virhe: pelin id:ta ei löytynyt.')
            return
        }
        try {
            await deleteBoardGame.execute(gameId, auth0_id)
            Toast.show({
                type: 'success',
                text1: 'Peli poistettu',
                text2: `Peli poistettiin kokoelmastasi.`,
                position: 'top',
                visibilityTime: 3000,
            })
            // update gamelist
            const gamelist = await getGameCollection.execute(auth0_id)
            console.log('pelilista: ', gamelist)
            setGames(gamelist)

        } catch (e: any) {
            console.error("Error deleting game from collection:", e)
        }

    }

    // Search games by name
    const findGame = async (name: string) => {
        const games = await findBoardgames.execute(name)
        setSearchedGame(games)
    }

    // Set bgg_id for chosen game
    const chooseGame = async (game: BoardGame) => {
        setBggId(game.bgg_id)
        setIsGameChosen(true)
    }

    // Add game to collection
    const addGame = async () => {

        if (!auth0_id) {
            alert('Virhe: Auth0 ID:tä ei löytynyt.')
            return
        }
        try {
            await addGameToCollection.execute(auth0_id, Number(bggId))
            
            const gamelist = await getGameCollection.execute(auth0_id)
            setGames(gamelist)
            
            setIsGameAdded(true) // signal that the game was added successfully
            setIsGameChosen(false)
            setBggId(undefined)
            setSearchedGame(undefined)
            Toast.show({
                type: 'success',
                text1: 'Peli lisätty',
                text2: `Peli lisättiin kokoelmaasi.`,
                position: 'top',
                visibilityTime: 3000,
            })
        } catch (e: any) {
            console.error("Error adding the game:", e.message || e)
            alert('Virhe pelin lisäämisessä')
        }
    }



    return {
        games,
        loading,
        //isLoggedIn,
        setGames,
        handleDeleteGame,
        searhedGame,
        findGame,
        addGame,
        chooseGame,
        isGameChosen,
        isGameAdded,
        auth0_id
    }
}