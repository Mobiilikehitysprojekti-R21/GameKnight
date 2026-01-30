import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from './theme';

export const styles = StyleSheet.create({

  container: {
    padding: 24,
    paddingBottom: 40,
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  inputColumn: {
    flexDirection: 'column',
    marginBottom: 20,
    marginRight: 16,
    marginLeft: 16,
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

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: 1,
    marginBottom: 20,
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

  text: {
    color: colors.textSecondary,
    fontSize: 20,
    textAlignVertical: 'center',
    marginRight: 16,
    minWidth: 100
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
  }
});
