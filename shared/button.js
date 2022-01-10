import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function FlatButton({ text, color, onPress, percentWidth }) {
	return (
		<TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
			<View style={{ ...styles.button, backgroundColor: color }}>
				<Text style={styles.buttonText}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		borderRadius: 20,
		paddingVertical: 14,
		paddingHorizontal: 10,
		backgroundColor: "#f01d71",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		textTransform: "uppercase",
		fontSize: 16,
		textAlign: "center",
	},
});
