import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

export const styles = StyleSheet.create({

  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: colors.background
  },

   sessionCardContainer: {
    marginVertical: 8,
    marginHorizontal: 0,
    backgroundColor: '#1a2332',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a3a4a',
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
    //textAlign: 'center',
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

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
});
