import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native'
import React from 'react'
import { colors, spacing, radius } from '../styles/theme'
import { StyleSheet } from 'react-native';
import { BoardGame } from '../../domain/entities/BoardGame';

// Component for Modal view. Allows input to be submitted

type ModalProps = {

    modalVisible: boolean                       // boolean for modal visibility
    setModalVisible: (value: boolean) => void   // function to set boolean for modal visibility
    header: string                              // Components header
    onPress: () => void                         // submit function
    buttonText: string                          // button´s text
  }

const DCModalComponent = ({
    modalVisible, 
    setModalVisible, 
    header,
    onPress,
    buttonText,
}: ModalProps) => {

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.sectionTitle}>
                  {header}
                </Text>
                <View style={styles.inputRow}>
                  <TouchableOpacity
                    style={[
                      styles.deleteButton,
                    ]}
                    onPress={onPress}
                  >
                    <Text style={styles.statText}>{buttonText}</Text>
                  </TouchableOpacity>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.statText}>Peruuta</Text>
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
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

    inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
    maxWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  deleteButton: {
    backgroundColor: '#dc0808',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 60,
  },

  statText: {
    color: colors.textSecondary,
    fontSize: 14,
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

export default DCModalComponent
