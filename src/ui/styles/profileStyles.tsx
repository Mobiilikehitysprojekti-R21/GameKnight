import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

export const styles = StyleSheet.create({

  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    maxWidth: 260,
  },

  card: {
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

  settings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%'
  },

  statText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },

  settingsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  settingsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

   deleteButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

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

  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 16,
    maxWidth: '100%'
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 16,
    maxWidth: '100%',
    color: "white"
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

  disabledButton: {
    backgroundColor: '#aaa',
    opacity: 0.6,
  },
});
