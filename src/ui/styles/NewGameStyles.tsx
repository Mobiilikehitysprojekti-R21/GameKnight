import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./theme";

export const styles = StyleSheet.create({
  container: {
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

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  friendChip: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },

  friendChipText: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  playerName: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  playerActions: {
    flexDirection: "row",
    gap: 8,
  },

  friendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 8,
  },

  friendName: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  addIcon: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "600",
  },

  playerCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: colors.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 12,
  },

  secondaryButtonText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },

  actionButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  actionIcon: {
    fontSize: 18,          // isompi
    fontWeight: "700",
    color: colors.primary, // kirkkaampi
  },

  deleteIcon: {
    color: "#EF4444",      // selkeä punainen poisto
  },

  iconButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#EF4444",
  },


});
