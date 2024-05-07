import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    padding: 32,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  container: {
    padding: 16,
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#000000",
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
  },
  text: {
    fontSize: 16,
    color: "#808080",
  },
  inputContainer: {
    display: "flex",
    textAlign: "left",
    gap: 8,
    padding: 8,
  },
  input: {
    margin: 8,
    width: "100%",
    height: 40,
    borderRadius: 10,
    color: "#000000",
    padding: 8,
    backgroundColor: "#ffffff",
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 32,
  },
  icon: {
    height: 36,
    width: 36,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 50,
    padding: 8,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    color: "#000",
    fontFamily: "600",
    width: "100%",
    marginHorizontal: 16,
    height: 48,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
