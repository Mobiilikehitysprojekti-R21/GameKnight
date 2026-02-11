import { View, Text, Pressable } from 'react-native';
import { styles } from '../../styles/NewGameStyles';

type Friend = {
    id: string;
    nickname: string;
};

type Props = {
    friends: Friend[];
    onSelect: (user: { id: string; name: string }) => void;
};

export const FriendsPicker = ({ friends, onSelect }: Props) => {
  return (
    <>
      <Text style={styles.sectionSubtitle}>Kaverit</Text>

      {friends.map((friend) => (
        <Pressable
          key={friend.id}
          style={styles.friendRow}
          onPress={() =>
            onSelect({ id: friend.id, name: friend.nickname })
          }
        >
          <Text style={styles.friendName}>
            {friend.nickname}
          </Text>

          <Text style={styles.addIcon}>＋</Text>
        </Pressable>
      ))}
    </>
  );
};
