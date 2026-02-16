import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

export const styles = StyleSheet.create({

  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background,
    minHeight: '100%'
  },

  swipeContainer: {
    borderRadius: radius.lg,
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    maxWidth: '100%'
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: 1,

  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '100%'
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    maxWidth: '100%',
  },

  rowBack: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },

  rowBackButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  rowBackIconButton: {
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowBackIconButtonDanger: {
    width: 36,
    height: 36,
    backgroundColor: colors.danger,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowBackIcon: {
    fontSize: 16,
    color: '#000',
  },

  rowFront: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    padding: 16
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    maxWidth: 260,
    paddingRight: 16,
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
    marginBottom: 4,
  },

  settingsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
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
});
