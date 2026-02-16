import { GameSession } from '../../domain/entities/GameSessions';

export const calculateUserStats = (sessions: GameSession[], userId: number) => {
    const userSessions = sessions.filter(session =>
        session.players.some((player) => player.user_id === userId)
    );

    const gamesPlayed = userSessions.length;

    const gamesWon = userSessions.filter(session => {
        const player = session.players.find((p) => p.user_id === userId);
        return player?.is_winner === true;
    }).length;

    const gamesWonPercentage = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

    const gameFrequency: { [key: string]: number } = {};
    userSessions.forEach(session => {
        const gameName = session.game_id.toString();
        gameFrequency[gameName] = (gameFrequency[gameName] || 0) + 1;
    });

    const mostPlayedGame = Object.entries(gameFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const opponents = new Set<number>();
    userSessions.forEach(session => {
        session.players.forEach((player) => {
            if (player.user_id !== userId) {
                opponents.add(player.user_id);
            }
        });
    });

    return {
        gamesPlayed,
        gamesWonPercentage: Math.round(gamesWonPercentage),
        mostPlayedGame,
        opponentsCount: opponents.size,
    };
};

// ...existing code...

export const calculateGeneralStats = (sessions: GameSession[]) => {
    const userIds = new Set<number>();
    const groups = new Set<number>();
    const gameFrequency: { [key: string]: number } = {};
    let mostWinningPlayer = '';
    let maxWins = 0;

    sessions.forEach(session => {
        session.players.forEach((player) => userIds.add(player.user_id));
        if (session.group_id) {
            groups.add(session.group_id);
        }
        gameFrequency[session.game_id.toString()] = (gameFrequency[session.game_id.toString()] || 0) + 1;
    });

    const playerWins: { [key: string]: number } = {};
    sessions.forEach(session => {
        session.players.forEach((player) => {
            if (player.is_winner) {
                playerWins[player.user_id.toString()] = (playerWins[player.user_id.toString()] || 0) + 1;
            }
        });
    });

    Object.entries(playerWins).forEach(([playerId, wins]) => {
        if (wins > maxWins) {
            maxWins = wins;
            mostWinningPlayer = playerId;
        }
    });

    const mostPlayedGames = Object.entries(gameFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([game]) => game);

    // suosituimmat
    const gameFrequencies = Object.entries(gameFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([_, count]) => count);

    return {
        mostPlayedGames,
        gameFrequencies, 
        userCount: userIds.size,
        groupCount: groups.size,
        mostWinningPlayer,
    };
};