import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
  },

  addButton: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  locationInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 24,
  },

  primaryButton: {
    backgroundColor: "#6c5ce7",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },

  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  link: {
    color: "#6c5ce7",
    marginBottom: 16,
  },
});
