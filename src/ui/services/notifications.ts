import { Alert } from 'react-native';
import Constants from 'expo-constants'
import type * as NotificationsType from 'expo-notifications';

export type NotificationType = 'friend_request' | 'session_invite' | 'session_update' | 'stats_update';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, any>;
}

let hasShownExpoGoNotificationInfo = false;

function isExpoGoClient(): boolean {
  return Constants.executionEnvironment === 'storeClient';
}

function showExpoGoNotificationInfoOnce() {
  if (hasShownExpoGoNotificationInfo || !isExpoGoClient()) {
    return;
  }

  hasShownExpoGoNotificationInfo = true;
  Alert.alert(
    'Push notifikaatiot eivät toimi Expo Go:ssa',
    'Remote push-ilmoitukset on poistettu käytöstä Expo Go:ssa. Testaa push-toiminnallisuutta kehitysbuildilla.'
  );
}

async function getNotificationsModule(): Promise<typeof NotificationsType | null> {
  if (isExpoGoClient()) {
    return null;
  }

  return import('expo-notifications');
}

export async function requestNotificationPermission(): Promise<boolean> {
  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    showExpoGoNotificationInfoOnce();
    return false;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted'
}

export async function getPushToken(): Promise<string | null> {
  // Mock token testaukseen: tähän integroida Expo Notifications 
  return 'mock-token-' + Math.random().toString(36).substr(2, 9);
}

export async function sendLocalNotification(payload: NotificationPayload) {
  // Expo Go:ssa lähetetään Alert
  if (isExpoGoClient() || !Constants.isDevice) {
    Alert.alert(payload.title, payload.body)
    return
  }

  const Notifications = await getNotificationsModule();
  if (!Notifications) {
    return;
  }

  // Jos olisi tuotannossa ja oikealla puhelimella, niin lähetettäisiin local notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: payload.title,
      body: payload.body,
      data: payload.data,
    },
    trigger: null,
  });
}


export function setupNotificationHandler(
  onNotificationReceived: (payload: NotificationPayload) => void
) {
  if (isExpoGoClient()) {
    return;
  }

  void getNotificationsModule().then((Notifications) => {
    if (!Notifications) {
      return;
    }

    Notifications.addNotificationReceivedListener((notification) => {
      const data = notification.request.content.data;

      if (
        typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        'title' in data &&
        'body' in data &&
        'data' in data &&
        typeof (data as Record<string, any>).type === 'string' &&
        typeof (data as Record<string, any>).title === 'string' &&
        typeof (data as Record<string, any>).body === 'string' &&
        typeof (data as Record<string, any>).data === 'object'
      ) {
        onNotificationReceived(data as unknown as NotificationPayload);
      }
    });
  });
}
