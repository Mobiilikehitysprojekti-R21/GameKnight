import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./theme";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  playerRow: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  winnerRow: {
    borderWidth: 2,
    borderColor: colors.primary,
  },

  playerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  rank: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  scoreInput: {
    width: 70,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    textAlign: "center",
    fontWeight: "600",
  },

  winnerBanner: {
  backgroundColor: "#FDE68A", // vaalea kulta
  padding: spacing.lg,
  borderRadius: radius.md,
  marginBottom: spacing.lg,
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#F59E0B", // tumma kulta
  elevation: 8,
},

winnerText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 16,
},

saveButton: {
  backgroundColor: colors.primary,
  padding: spacing.md,
  borderRadius: radius.md,
  alignItems: "center",
  marginTop: spacing.xl,
},

saveButtonText: {
  color: colors.textPrimary,
  fontWeight: "700",
  fontSize: 16,
},

});
