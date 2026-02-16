import { View, Text, Pressable } from 'react-native';
import { styles } from '../../styles/NewGameStyles';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';


type Player = {
  id?: string;
  name: string;
  type: "USER" | "GUEST";
};

type Props = {
  players: Player[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
};

export const PlayersList = ({
  players,
  onMoveUp,
  onMoveDown,
  onRemove,
}: Props) => {
  if (players.length === 0) {
    return (
      <Text style={{ marginBottom: 10 }}>
        Ei vielä pelaajia
      </Text>
    );
  }

  return (
    <>
      {players.map((p, index) => (
        <View key={index} style={styles.playerRow}>
          <Text style={styles.playerName}>
            {p.name} {p.type === "GUEST" && "(vieras)"}
          </Text>

          <View style={styles.playerActions}>
            <Pressable
              style={styles.iconButton}
              onPress={() => onMoveUp(index)}
            >
              <Ionicons
                name="chevron-up"
                size={22}
                color={colors.primary}
              />
            </Pressable>

            <Pressable
              style={styles.iconButton}
              onPress={() => onMoveDown(index)}
            >
              <Ionicons
                name="chevron-down"
                size={22}
                color={colors.primary}
              />
            </Pressable>

            <Pressable
              style={[styles.iconButton, styles.deleteButton]}
              onPress={() => onRemove(index)}
            >
              <Ionicons
                name="close"
                size={20}
                color="#FFFFFF"
              />
            </Pressable>
          </View>

        </View>
      ))}
    </>
  );
};