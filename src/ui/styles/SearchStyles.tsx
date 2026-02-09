import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  searchInput: {
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },

  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: "center",
    marginBottom: spacing.md,
  },

  searchButtonText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  loadingText: {
    color: colors.textSecondary,
    marginVertical: spacing.sm,
  },

  listItem: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.xs,
  },

  listItemText: {
    color: colors.textPrimary,
  },
});
