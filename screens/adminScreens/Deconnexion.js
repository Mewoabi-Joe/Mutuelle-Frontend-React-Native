import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import FlatButton from "../../shared/button";
import axiosInstance from "../../utils/axiosInstance";

export default function Deconnexion() {
	console.log("DECONNEXION.JS\n");

	const { auth, dispatch } = useContext(AuthContext);

	const tokenConfig = () => {
		// Get token from state
		const token = auth.token;

		// Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		// If token, add to headers config
		if (token) {
			config.headers["Authorization"] = `Token ${token}`;
		}
		return config;
	};

	const logout = () => {
		axiosInstance
			.post("/api/auth/logout")
			.then((res) => {
				dispatch({
					type: "LOGOUT_SUCCESS",
				});
			})
			.catch((err) => {
				console.log("error while trying to logout user", err);
			});
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Deconnexion Screen</Text>
			<FlatButton text="Logout" color="black" onPress={logout}></FlatButton>
		</View>
	);
}
