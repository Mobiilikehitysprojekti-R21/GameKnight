import { Modal, View, TextInput, Pressable, Text } from 'react-native';
import { useState } from 'react';
import { styles } from '../../styles/NewGameStyles';

type Props = {
  visible: boolean;
  onAdd: (name: string) => void;
  onClose: () => void;
};

export const GuestPlayerModal = ({ visible, onAdd, onClose }: Props) => {
  const [name, setName] = useState<string>("");

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Vieraspelaajan nimi"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
          />

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              if (!name.trim()) return;
              onAdd(name.trim());
              setName("");
              onClose();
            }}
          >
            <Text style={styles.primaryButtonText}>Lisää</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};