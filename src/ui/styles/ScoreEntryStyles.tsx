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

   notesInput: {
    width: 270,
    backgroundColor: colors.background,
    color: colors.textPrimary,
    padding: spacing.sm,
    borderRadius: radius.sm,
    textAlign: "center",
    fontWeight: "600",
    marginTop: spacing.sm,
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
  color: "#2b2b2b",
  fontWeight: "700",
  fontSize: 16,
  textShadowColor: "rgba(0, 0, 0, 0.3)",
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
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

 card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },

});