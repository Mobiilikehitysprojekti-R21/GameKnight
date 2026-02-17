import { useCallback } from 'react';
import { GameSessionsApiRepository } from '../../infrastructure/api/GameSessionsApiRepository';
import { BoardGameApiRepository } from '../../infrastructure/api/BoardGameApiRepository';
import { sendLocalNotification } from '../../ui/services/notifications';
import { useAuth } from '../auth/useAuth';

export function useSessionNotifications() {
  const { getAccessToken } = useAuth();

  const sessionRepo = new GameSessionsApiRepository();
  const gameRepo = new BoardGameApiRepository(getAccessToken);

  // hae pelikerta ja formatoi alertiksi
 const notifySessionInvite = useCallback(async (invitedUserId: string, session_id: number) => {
  try {
    const session = await sessionRepo.getSessionById(session_id);
    if (!session) return;

    const game = await gameRepo.getGameById(session.game_id);
    const gameName = game?.name ?? `Game ${session.game_id}`;

    await sendLocalNotification({
      type: 'session_invite',
      title: '🎮 Kutsu pelaamaan',
      body: `Sinut liitettiin pelaamaan peliä: ${gameName}`,
      data: { session_id, invitedUserId, gameName }
    });
  } catch (error) {
    console.error('Failed to send session invite notification:', error);
  }
}, [sessionRepo, gameRepo]);


  const notifySessionUpdate = useCallback(async (session_id: number) => {
    try {
      const session = await sessionRepo.getSessionById(session_id);
      if (!session) return;

      const playerCount = session.players?.length ?? 0;
      await sendLocalNotification({
        type: 'session_update',
        title: '📊 Pelikerta päivittyi',
        body: `Pelissä on nyt ${playerCount} pelaajaa`,
        data: { session_id, playerCount }
      });
    } catch (error) {
      console.error('Failed to send session update notification:', error);
    }
  }, []);
  

  const notifyStatsUpdate = useCallback(async (statName: string, newValue: number) => {
    await sendLocalNotification({
      type: 'stats_update',
      title: '📈 Statistiikka päivittyi',
      body: `${statName}: ${newValue}`,
      data: { statName, newValue }
    });
  }, []);

  return {
    notifySessionInvite,
    notifySessionUpdate,
    notifyStatsUpdate,
  };
}