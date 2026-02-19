import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  menuContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  sectionSubtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },

  favoriteLocation: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },

  favoriteLocationText: {
    color: colors.textPrimary,
    fontSize: 15,
  },

  link: {
    color: colors.primary,
    marginBottom: spacing.sm,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  input: {
    flex: 1,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    padding: spacing.sm,
    borderRadius: radius.sm,
  },

  addButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.secondary,
    borderRadius: radius.sm,
  },

  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
  },

  locationInput: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginTop: spacing.sm,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: spacing.xl,
  },

  primaryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },

  friendRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  friendName: {
    fontSize: 16,
  },

  secondaryButton: {
    padding: 12,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },

  secondaryButtonText: {
    fontSize: 16,
  },

  playerName: {
    fontSize: 16,
  },
  playerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  deleteButton: {
    backgroundColor: "#ffdddd",
  },

  addIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },

  settings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%'
  },

  settingsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: 16,
  },

  settingsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

});
