import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { globalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axiosInstance";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import AccueilDrawer from "../routes/AdminRoutes/AccueilDrawer";

export default function Welcome({ navigation }) {
	console.log("WELCOME.JS\n");

	const { auth, dispatch } = useContext(AuthContext);
	const [token, setToken] = useState("");
	console.log("Auth:");
	console.log(auth);

	useEffect(() => {
		dispatch({ type: "LOADING" });
		getUserPlusToken()
			.then((res) => {
				if (res) {
					dispatch({ type: "USER_LOADED", payload: res });
				} else {
					dispatch({ type: "LOADED" });
				}
			})
			.catch((err) => {
				dispatch({ type: "LOADED" });
				console.log(err.message);
			});
	}, []);

	//Verify if a users token is present
	const getUserPlusToken = async () => {
		try {
			const value = await AsyncStorage.getItem("@token");
			if (value) {
				setToken(value);
				dispatch({
					type: "TOKEN_OBTAINED",
					payload: value,
				});
				const res = await axiosInstance.get("/api/auth/user");
				return res.data;
			}
			return null;
		} catch (error) {
			console.log(error.message);
		}
	};

	if (auth.loading) {
		return (
			<View style={globalStyles.container}>
				<Text>Loading</Text>
			</View>
		);
	} else {
		return !auth.isAuthenticated ? (
			<ImageBackground
				style={{ ...globalStyles.container, ...styles.container }}
				// source={require("../assets/welcome2.jpg")}
			>
				<Image
					source={require("../assets/polytech-logo.png")}
					style={{ width: 200, height: 200 }}
				></Image>
				<View style={styles.centerView}>
					<Text style={styles.mainText}>WELCOME</Text>
					<Text style={styles.mainText}>to </Text>
					<Text style={styles.mainText}>MUTUELLE</Text>
				</View>
				<TouchableOpacity>
					<Button
						color="danger"
						buttonStyle={{
							paddingVertical: 15,
							borderRadius: 20,
							backgroundColor: "black",
							width: 300,
						}}
						iconRight
						titleStyle={{ marginRight: 10 }}
						title="Login"
						icon={<Icon name="arrow-right" size={15} color="white" />}
						onPress={() => navigation.navigate("Login")}
					/>
				</TouchableOpacity>
			</ImageBackground>
		) : (
			<AccueilDrawer />
		);
	}
}

const styles = StyleSheet.create({
	mainText: {
		fontSize: 40,
		color: "white",
		fontWeight: "bold",
	},
	container: {
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: "#ff751a",
	},
	centerView: {
		borderBottomWidth: 2,
		borderTopWidth: 2,
		alignItems: "center",
		borderBottomColor: "white",
		borderTopColor: "white",
	},
	avatar: {
		backgroundColor: "#555",
		width: 200,
		height: 200,
		borderRadius: 100,
	},
});
