import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
	titleText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	paragraph: {
		marginVertical: 8,
		lineHeight: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "#ddd",
		padding: 20,
	},
	input: {
		borderWidth: 2,
		borderColor: "white",
		padding: 10,
		fontSize: 20,
		borderRadius: 20,
		// marginTop: 40,
		color: "black",
		backgroundColor: "white",
	},
	errorText: {
		color: "crimson",
		fontWeight: "bold",
		fontSize: 20,
		marginBottom: 10,
		marginTop: 2,
		textAlign: "center",
	},
});
