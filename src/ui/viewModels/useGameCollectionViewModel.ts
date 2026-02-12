import { useState, useEffect } from "react";
import type { BoardGame } from "../../domain/entities/BoardGame";
//import { useAuth } from "../auth/useAuth";
import { BoardGameApiRepository } from "../../infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "../../application/FindBoardGames";
import { AddGameToCollection } from "../../application/AddGameToCollection";
import { GetGameCollection } from "../../application/GetGameCollection";
import { DeleteBoardGame } from "../../application/DeleteBoardGame";
import Toast from "react-native-toast-message";

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

    // Load user´s game collection, set loading state
    const loadGames = async () => {
        try {
            const gamelist = await getGameCollection.execute(1)
            setGames(gamelist)
        } catch (e) {
            console.error('Failed to load game collection', e)
        } finally {
            setLoading(false)
        }
    }

    // Load game collection once when the ViewModel is mounted
    useEffect(() => {
        loadGames()
    }, [])

    // Remove a game from local state after deletion
    const handleDeleteGame = async (gameId: number) => {
        /*const newGames = games.filter(g => g.game_id !== gameId)
        setGames(newGames)*/
        if (!gameId) {
            alert('Virhe: pelin id:ta ei löytynyt.')
            return
        }
        try {
            await deleteBoardGame.execute(gameId)
                Toast.show({
                    type: 'success',
                    text1: 'Peli poistettu',
                    text2: `Peli poistettiin kokoelmastasi.`,
                    position: 'top',
                    visibilityTime: 3000,
                })
            await loadGames()
            
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
        const userID = 1    // VAIHDA TÄHÄN oikea user_id !!!
        try {
            await addGameToCollection.execute(userID, Number(bggId))
            await loadGames()   // update game collection
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
    }
}