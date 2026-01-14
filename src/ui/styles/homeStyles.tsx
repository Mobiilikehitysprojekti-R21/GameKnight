import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

export const styles = StyleSheet.create({
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

  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
  },


  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  statText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

    loginButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '500',
  },

});
