import { GameSession } from '../../domain/entities/GameSessions';

const toNumericId = (value: unknown): number | null => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
};

const normalizeName = (value: unknown) =>
    typeof value === 'string' ? value.trim().toLowerCase() : '';

const isWinner = (value: unknown) =>
    value === true || value === 1 || value === '1' || value === 'true';
const getGameLabel = (session: GameSession) => {
    const trimmedName = session.game_name?.trim();
    return trimmedName && trimmedName.length > 0 ? trimmedName : session.game_id.toString();
};

const getWinnerLabel = (player: GameSession['players'][number]) => {
    // Priorisoi: name (user nickname) > guest_name > user_id
    const trimmedName = player.name?.trim();
    if (trimmedName && trimmedName.length > 0) return trimmedName;

    const trimmedGuest = player.guest_name?.trim();
    if (trimmedGuest && trimmedGuest.length > 0) return trimmedGuest;

    return player.user_id ? player.user_id.toString() : 'Tuntematon';
};

export const calculateUserStats = (sessions: GameSession[], userId: number | string, userName?: string) => {
    const normalizedUserId = toNumericId(userId);
    const normalizedUserName = normalizeName(userName);
    if (normalizedUserId === null && !normalizedUserName) {
        return {
            gamesPlayed: 0,
            gamesPlayedOverTime: [],
            gamesWonPercentage: 0,
            mostPlayedGame: 'N/A',
            opponentsCount: 0,
            opponentStats: {},
        };
    }

    const isCurrentUserPlayer = (player: GameSession['players'][number]) => {
        const playerId = toNumericId(player.user_id);
        if (normalizedUserId !== null && playerId === normalizedUserId) return true;
        if (!normalizedUserName) return false;
        return normalizeName(player.name) === normalizedUserName;
    };

    const userSessions = sessions.filter(session =>
        session.players.some((player) => isCurrentUserPlayer(player))
    );

    const gamesPlayed = userSessions.length;

    // Calculate games played over time (by date)
    const gamesPlayedOverTime: { [date: string]: number } = {};
    userSessions.forEach(session => {
        const date = new Date(session.played_at).toISOString().split('T')[0]; // YYYY-MM-DD format
        gamesPlayedOverTime[date] = (gamesPlayedOverTime[date] || 0) + 1;
    });

    // Sort by date and convert to array
    const gamesPlayedOverTimeArray = Object.entries(gamesPlayedOverTime)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, count]) => ({ date, count }));

    const gamesWon = userSessions.filter(session => {
        const player = session.players.find((p) => isCurrentUserPlayer(p));
        return isWinner(player?.is_winner);
    }).length;

    const gamesWonPercentage = gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0;

    const gameFrequency: { [key: string]: number } = {};
    userSessions.forEach(session => {
        const gameName = getGameLabel(session);
        gameFrequency[gameName] = (gameFrequency[gameName] || 0) + 1;
    });

    const mostPlayedGame = Object.entries(gameFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const opponents = new Set<string>();
    const opponentStats: { [key: string]: number } = {};

    // Laske käyttäjän omat voitot
    const userWins = userSessions.filter(session => {
        const player = session.players.find(p => isCurrentUserPlayer(p));
        return isWinner(player?.is_winner);
    }).length;

    // Lisää käyttäjän omat voitot
    opponentStats['Minä'] = userWins;

    userSessions.forEach(session => {
        // vain rekisteröidyt ystävät
        session.players.forEach(player => {
            if (isWinner(player.is_winner) && !isCurrentUserPlayer(player)) {
                const playerId = toNumericId(player.user_id);
                if (playerId !== null) {
                    const opponentLabel = getWinnerLabel(player);
                    if (opponentLabel) {
                        opponentStats[opponentLabel] = (opponentStats[opponentLabel] || 0) + 1;
                    }
                }
            }
        });

        // Laske kaikki vastustajat - sekä rekisteröidyt että vieraat
        session.players.forEach(p => {
            if (!isCurrentUserPlayer(p)) {
                // Rekisteröidyt pelaajat (user_id)
                const playerId = toNumericId(p.user_id);
                if (playerId !== null) {
                    opponents.add(`user_${playerId}`);
                }
                // Vieraat pelaajat (guest_name)
                const guestName = typeof p.guest_name === 'string' ? p.guest_name.trim() : '';
                if (guestName) {
                    opponents.add(`guest_${guestName}`);
                }
            }
        });
    });

    return {
        gamesPlayed,
        gamesPlayedOverTime: gamesPlayedOverTimeArray,
        gamesWonPercentage: Math.round(gamesWonPercentage),
        mostPlayedGame,
        opponentsCount: opponents.size,
        opponentStats,
    };
};

export const calculateGeneralStats = (sessions: GameSession[]) => {
    const userIds = new Set<number>();
    const groups = new Set<number>();
    const gameFrequency: { [key: string]: number } = {};
    let mostWinningPlayer = '';
    let maxWins = 0;

    sessions.forEach(session => {
        session.players.forEach((player) => {
            const playerId = toNumericId(player.user_id);
            if (playerId !== null) {
                userIds.add(playerId);
            }
        });

        if (typeof session.group_id === 'number') {
            groups.add(session.group_id);
        }

        const gameLabel = getGameLabel(session);
        gameFrequency[gameLabel] = (gameFrequency[gameLabel] || 0) + 1;
    });

    const playerWins: { [key: string]: number } = {};
    sessions.forEach(session => {
        session.players.forEach((player) => {
            const winnerLabel = getWinnerLabel(player);
            if (isWinner(player.is_winner) && winnerLabel) {
                playerWins[winnerLabel] = (playerWins[winnerLabel] || 0) + 1;
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
        totalGamesCount: sessions.length,
    };
};