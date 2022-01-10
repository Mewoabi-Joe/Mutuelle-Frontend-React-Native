import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Header from "../shared/header";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function WelcomeStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Welcome"
				screenOptions={{
					headerStyle: { backgroundColor: "#eee", height: 100 },
					headerTintColor: "#444",
				}}
			>
				<Stack.Screen
					name="Welcome"
					component={Welcome}
					options={{
						headerShown: false,
						headerTitle: () => <Header title="Mutuelle" />,
					}}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
