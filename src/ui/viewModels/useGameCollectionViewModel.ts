import { useState, useEffect } from "react";
import type { BoardGame } from "../../domain/entities/BoardGame";
import { useAuth } from "../auth/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function useGameCollectionViewModel() {

    const { isLoggedIn } = useAuth()
    const [games, setGames] = useState<BoardGame[]>([])
    const [loading, setLoading] = useState(true)

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


    return {
        games, loading, isLoggedIn, setGames, handleDeleteGame
    }
}