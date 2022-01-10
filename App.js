import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthContextProvider from "./contexts/AuthContext";
import WelcomeStack from "./routes/welcomeStack";
import { globalStyles } from "./styles/global";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MemberContextProvider from "./contexts/memberContext";
import AdministratorContextProvider from "./contexts/administratorContext";

export default function App() {
	console.log("APP.JS");
	return (
		<AuthContextProvider>
			<AdministratorContextProvider>
				<MemberContextProvider>
					<SafeAreaProvider>
						<WelcomeStack />
					</SafeAreaProvider>
				</MemberContextProvider>
			</AdministratorContextProvider>
		</AuthContextProvider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });
