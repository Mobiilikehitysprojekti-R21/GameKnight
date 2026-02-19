import type { Friend } from "../../../domain/entities/Friend";
import { Text, Pressable } from "react-native";
import { styles } from "../../styles/NewGameStyles";

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
          key={friend.user_id.toString()}
          style={styles.friendRow}
          onPress={() =>
            onSelect({ id: friend.user_id.toString(), name: friend.nickname })
          }
        >
          <Text style={styles.addIcon}>＋</Text>

          <Text style={styles.friendName}>
            {friend.nickname}
          </Text>
        </Pressable>
      ))}
    </>
  );
};