import { useState, useEffect } from "react";
import type { BoardGame } from "../../domain/entities/BoardGame";
import { useAuth } from "../auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BoardGameApiRepository } from "../../infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "../../application/FindBoardGames";
import { AddGameToCollection } from "../../application/AddGameToCollection";
import { GetGameCollection } from "../../application/GetGameCollection";

export function useGameCollectionViewModel() {

    const { isLoggedIn } = useAuth()
    const [games, setGames] = useState<BoardGame[]>([])
    const [searhedGame, setSearchedGame] = useState<BoardGame[]>()
    const [bggId, setBggId] = useState<BoardGame["bgg_id"]>()
    const [loading, setLoading] = useState(true)
    const [isGameChosen, setIsGameChosen] = useState(false)
    const [isGameAdded, setIsGameAdded] = useState(false)

    const repo = new BoardGameApiRepository()
    const findBoardgames = new FindBoardGames(repo)
    const addGameToCollection = new AddGameToCollection(repo)
    const getGameCollection = new GetGameCollection(repo)

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

    useEffect(() => {
        loadGames()
    }, [])

    const handleDeleteGame = (gameId: number) => {
        const newGames = games.filter(g => g.game_id !== gameId)
        setGames(newGames)
    }

    const findGame = async (name: string) => {
        const games = await findBoardgames.execute(name)
        setSearchedGame(games)
    }

    const chooseGame = async (game: BoardGame) => {
        setBggId(game.bgg_id)
        setIsGameChosen(true)
    }

    const addGame = async () => {
        const userID = 1    // VAIHDA TÄHÄN oikea user_id !!!
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
        isLoggedIn,
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