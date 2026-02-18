import { Alert } from 'react-native';

export type NotificationType = 'friend_request' | 'session_invite' | 'session_update' | 'stats_update';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, any>;
}

export async function requestNotificationPermission(): Promise<boolean> {
  return true; 
}

export async function getPushToken(): Promise<string | null> {
  // Mock token testaukseen: tähän integroida Expo Notifications 
  return 'mock-token-' + Math.random().toString(36).substr(2, 9);
}

export async function sendLocalNotification(payload: NotificationPayload) {
  Alert.alert(payload.title, payload.body, [
    { text: 'OK', onPress: () => console.log('Notification closed') },
  ]);
}

export function setupNotificationHandler(
  onNotificationReceived: (payload: NotificationPayload) => void
) {}