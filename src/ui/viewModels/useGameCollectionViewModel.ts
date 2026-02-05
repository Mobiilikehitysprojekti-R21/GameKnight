import { useState, useEffect } from "react";
import type { BoardGame } from "../../domain/entities/BoardGame";
import { useAuth } from "../auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BoardGameApiRepository } from "../../infrastructure/api/BoardGameApiRepository";
import { FindBoardGames } from "../../application/FindBoardGames";
import { AddGameToCollection } from "../../application/AddGameToCollection";

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

    useEffect(()=> {
        // TODO: korvaa oikeilla peleillä
        const mygames: BoardGame[] = [
            {
                game_id: 1,
                bgg_id: 13,
                name: 'Catan',
                year_published: 1995,
                rank: 480,
                bayes_average: 7.1,
                average: 7.2,
                users_rated: 120000,
                is_expansion: false,
            },
            {
                game_id: 2,
                bgg_id: 68448,
                name: '7 Wonders',
                year_published: 2010,
                rank: 89,
                bayes_average: 7.7,
                average: 7.8,
                users_rated: 180000,
                is_expansion: false,
            },
            {
                game_id: 3,
                bgg_id: 174430,
                name: 'Gloomhaven',
                year_published: 2017,
                rank: 1,
                bayes_average: 8.4,
                average: 8.6,
                users_rated: 65000,
                is_expansion: false,
            },
            {
                game_id: 4,
                bgg_id: 30549,
                name: 'Pandemic',
                year_published: 2008,
                rank: 125,
                bayes_average: 7.6,
                average: 7.6,
                users_rated: 110000,
                is_expansion: false,
            },
            {
                game_id: 5,
                bgg_id: 50,
                name: 'Catan: Seafarers',
                year_published: 1997,
                rank: 600,
                bayes_average: 6.9,
                average: 7.0,
                users_rated: 45000,
                is_expansion: true,
            },
        ]
        setGames(mygames)
        setLoading(false)
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
        const userID = 1    // VAIHDA TÄHÄN oikea user_id 
        try {
            await addGameToCollection.execute(userID, Number(bggId))
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