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

    inputColumn: {
    flexDirection: 'column',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#fff',
  },

    inputRow: {
    flexDirection: 'row',
    maxWidth: '100%',
    alignItems: 'center'
  },

    input: {
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
    minWidth: 200
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
    color: colors.textPrimary,
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

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

     deleteButton: {
    backgroundColor: colors.danger,
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
});
