import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import { colors, spacing, radius } from '../styles/theme'
import { StyleSheet } from 'react-native';
import { BoardGame } from '../../domain/entities/BoardGame';

// Component for Modal view. Allows input to be submitted

type ModalProps = {

  modalVisible: boolean                       // boolean for modal visibility
  setModalVisible: (value: boolean) => void   // function to set boolean for modal visibility
  header: string                              // Components header
  placeholder: string                         // Inputfields placeholder
  inputValue: string                          // value for inputfield
  setInputValue: (input: string) => void      // function to set the input value
  checkValue: () => void                      // function to handle the input value
  games?: BoardGame[]                         // gamelist (optional)
  onSelected?: (game: BoardGame) => void      // onPress -function for gamelist items (optional)
  isValueAvailable: boolean                   // boolean for allowing submit function
  onPress: () => void                         // submit function
  buttonText: string                          // submit-button´s text
  showCheck?: boolean                         // boolean for showing check-text (optional)
  trueText?: string                           // text option for true (optional)
  falseText?: string                          // text option for false (optional)
}

const ModalComponent = ({
  modalVisible,
  setModalVisible,
  header,
  placeholder,
  inputValue,
  setInputValue,
  checkValue,
  games,
  onSelected,
  isValueAvailable,
  onPress,
  buttonText,
  showCheck,
  trueText,
  falseText,

}: ModalProps) => {

  const [selectedGameId, setSelectedGameId] = useState<number | null>(null) // state to inform user of selected game (color change)

  const back = () => {
    setInputValue('')
    showCheck = false
    setModalVisible(false)
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      backdropColor={colors.background}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.sectionTitle}>
            {header}
          </Text>
          <View style={styles.inputRow}>
            <View style={styles.gamelist}>
              <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={checkValue}
              />
              {games && (
                <FlatList
                  data={games}
                  keyExtractor={g => g.game_id.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        style={[
                          styles.listButton,
                          selectedGameId === item.game_id && styles.selectedListButton
                        ]}
                        onPress={() => {
                          setSelectedGameId(item.game_id)
                          onSelected && onSelected(item)
                        }}
                      >
                        <Text style={styles.statText}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                />
              )}

            </View>

            <TouchableOpacity
              style={[
                styles.settingsButton,
                !isValueAvailable && styles.disabledButton
              ]}
              onPress={onPress}
              disabled={!isValueAvailable}
            >
              <Text>{buttonText}</Text>
            </TouchableOpacity>
          </View>
          {showCheck && (
            <Text style={[
              styles.nicknameText,
              isValueAvailable ? styles.available : styles.unavailable
            ]}>
              {isValueAvailable ? trueText : falseText}
            </Text>
          )}
          <View style={styles.back}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={back}
            >
              <Text style={styles.statText}>Poistu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(15,23,42,0.9)',
    margin: spacing.md
  },

  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
    maxWidth: '100%',
    alignItems: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: colors.textSecondary,
    borderRadius: 4,
    padding: 8,
    marginRight: 16,
    maxWidth: '100%',
  },

  settingsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60,
  },

  disabledButton: {
    backgroundColor: '#aaa',
    opacity: 0.6,
  },

  nicknameText: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center'
  },

  available: {
    color: 'green',
  },

  unavailable: {
    color: 'red',
  },

  listButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  selectedListButton: {
    backgroundColor: colors.primary,
  },

  gamelist: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight: 16,
  },

  statText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  back: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60,
  }
})

export default ModalComponent