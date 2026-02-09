import { useState, useEffect } from "react";
import type { BoardGame } from "../../domain/entities/BoardGame";
import { useAuth } from "../auth/useAuth";
import { BoardGameApiRepository } from "../../infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "../../application/FindBoardGames";
import { AddGameToCollection } from "../../application/AddGameToCollection";
import { GetGameCollection } from "../../application/GetGameCollection";

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

    // Load user´s game collection, set loading state
    const loadGames = async () => {
        try {
            const gamelist = await getGameCollection.execute(6)
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
    // TODO: remove game from database
    const handleDeleteGame = (gameId: number) => {
        const newGames = games.filter(g => g.game_id !== gameId)
        setGames(newGames)
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
        const userID = 6    // VAIHDA TÄHÄN oikea user_id !!!
        try {
            await addGameToCollection.execute(userID, Number(bggId))
            await loadGames()   // update game collection
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
        isGameAdded
    }
}