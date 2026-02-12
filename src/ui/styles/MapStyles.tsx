import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    map: {
        flex: 1,
    },

    header: {
        position: "absolute",
        top: spacing.lg,
        left: spacing.md,
        right: spacing.md,
        backgroundColor: colors.surface,
        padding: spacing.sm,
        borderRadius: radius.md,
        zIndex: 10,
    },

    headerText: {
        color: colors.textPrimary,
        textAlign: "center",
        fontWeight: "500",
    },

    confirmButton: {
        position: "absolute",
        bottom: spacing.xl,
        alignSelf: "center",
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radius.md,
    },

    confirmButtonText: {
        color: colors.textPrimary,
        fontWeight: "600",
    },

    input: {
        backgroundColor: colors.surface,
        color: colors.textPrimary,
        padding: spacing.sm,
        borderRadius: radius.sm,
        marginHorizontal: spacing.md,
        marginTop: spacing.sm,
    },

    secondaryButton: {
        backgroundColor: colors.secondary,
        padding: spacing.sm,
        borderRadius: radius.sm,
        marginHorizontal: spacing.md,
        marginTop: spacing.sm,
        alignItems: "center",
    },

    secondaryButtonText: {
        color: colors.textPrimary,
        fontWeight: "600",
    },

    confirmButton: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: radius.md,
        margin: spacing.md,
        alignItems: "center",
    },
    confirmButtonText: {
        color: colors.textPrimary,
        fontWeight: "700",
        fontSize: 16,
    },

    webFallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.lg,
        backgroundColor: colors.background,
    },

    webText: {
        color: colors.textSecondary,
        textAlign: "center",
    },
});
