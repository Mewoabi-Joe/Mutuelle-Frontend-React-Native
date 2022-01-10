import React, { useEffect, useContext } from "react";
import {
	StyleSheet,
	Button,
	TextInput,
	View,
	Text,
	Alert,
	ImageBackground,
} from "react-native";
import { globalStyles } from "../styles/global.js";
import { Formik } from "formik";
import FlatButton from "../shared/button.js";
import { AuthContext } from "../contexts/AuthContext";
import axiosNoTokenInstance from "../utils/axiosNoTokenInstance.js";
import * as yup from "yup";
import AccueilDrawer from "../routes/AdminRoutes/AccueilDrawer.js";
import { Image } from "react-native";

const reviewSchema = yup.object({
	email: yup.string().required().email(),
	password: yup.string().required(),
});

export default function Login({ navigation }) {
	console.log("LOGIN.JS\n");

	const { auth, dispatch } = useContext(AuthContext);

	const login = (email, password) => {
		dispatch({ type: "LOADING" });

		// Request Body
		const body = JSON.stringify({ email, password });

		axiosNoTokenInstance
			.post("/api/auth/login", body)
			.then((res) => {
				console.log(res.data);
				dispatch({
					type: "LOGIN_SUCCESS",
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({ type: "LOADED" });
				console.log(err.response.data);
				Alert.alert("OOPS!", "A user with this credentials does not exist.", [
					{
						text: "Understood",
					},
				]);
			});
	};

	// if (auth.isAuthenticated) {
	// 	// navigation.setOptions({ headerShown: false });
	// }

	return auth.isAuthenticated ? (
		<AccueilDrawer />
	) : (
		<ImageBackground
			style={{ ...globalStyles.container, ...styles.container }}
			// source={require("../assets/login1.jpg")}
		>
			<Formik
				validationSchema={reviewSchema}
				initialValues={{ email: "", password: "" }}
				onSubmit={(values) => {
					// console.log(values);
					login(values.email, values.password);
					// handlePress();
				}}
			>
				{(props) => (
					<View style={{ ...styles.formikView, opacity: 1 }}>
						<Image
							source={require("../assets/polytech-logo.png")}
							style={{
								width: 200,
								height: 200,
								alignSelf: "center",
								// position: "absolute",
								// top: 10,
							}}
						></Image>
						<TextInput
							style={{ ...globalStyles.input, marginTop: 60 }}
							placeholder="Email"
							onChangeText={props.handleChange("email")}
							value={props.values.email}
							onBlur={props.handleBlur("email")}
						/>
						<Text style={globalStyles.errorText}>
							{props.touched.email && props.errors.email}
						</Text>

						<TextInput
							style={globalStyles.input}
							placeholder="Password"
							onChangeText={props.handleChange("password")}
							value={props.values.password}
							onBlur={props.handleBlur("password")}
						/>
						<Text style={globalStyles.errorText}>
							{props.touched.password && props.errors.password}
						</Text>

						<FlatButton
							text={auth.loading ? "loading..." : "login"}
							onPress={props.handleSubmit}
							color="black"
						/>
					</View>
				)}
			</Formik>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ff751a",
		justifyContent: "center",
	},
	formikView: {
		marginTop: 50,
		flex: 1,
		// justifyContent: "center",
	},
});
