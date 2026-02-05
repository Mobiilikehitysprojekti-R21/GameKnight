import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native'
import React from 'react'
import { colors, spacing, radius } from '../styles/theme'
import { StyleSheet } from 'react-native';
import { BoardGame } from '../../domain/entities/BoardGame';


type ModalProps = {

    modalVisible: boolean
    setModalVisible: (value: boolean) => void
    header: string
    placeholder: string
    inputValue: string
    setInputValue: (input: string) => void
    checkValue: () => void
    games?: BoardGame[]
    onSelected?: (game: BoardGame) => void
    isValueAvailable: boolean
    onPress: () => void
    buttonText: string
    showCheck?: boolean
    trueText?: string
    falseText?: string
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
    falseText

}: ModalProps) => {


return (
    <Modal
            animationType='slide'
            transparent={false}
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
                    onEndEditing={checkValue}
                    />
                    { games && (
                      <FlatList
                        data={games}
                        keyExtractor={g=> g.game_id.toString()}
                        renderItem={({item})=> (
                          <View>
                            <TouchableOpacity style={styles.listButton} onPress={() => onSelected && onSelected(item)}>
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
              </View>
            </View>
          </Modal>
)
}

const styles = StyleSheet.create({

   modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.background,
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
  
  gamelist: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight: 16,
  },

  statText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
})

export default ModalComponent