import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../../screens/adminScreens/Accueil";
import Epargnes from "../../screens/adminScreens/Epargnes";
import Remboursements from "../../screens/adminScreens/Remboursements";
import Emprunts from "../../screens/adminScreens/Emprunts";
import { Icon } from "react-native-elements";
const Tab = createBottomTabNavigator();

export default function AccueilTab() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Accueil") {
						iconName = focused ? "home" : "home";
					} else if (route.name === "Epargnes") {
						iconName = focused
							? "vertical-align-bottom"
							: "vertical-align-bottom";
					} else if (route.name === "Remboursements") {
						iconName = focused ? "rotate-left" : "rotate-left";
					} else if (route.name === "Emprunts") {
						iconName = focused ? "vertical-align-top" : "vertical-align-top";
					}

					// You can return any component that you like here!
					return <Icon name={iconName} />;
				},
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
				headerShown: false,
			})}
		>
			<Tab.Screen name="Accueil" component={Accueil} />
			<Tab.Screen name="Epargnes" component={Epargnes} />
			<Tab.Screen name="Remboursements" component={Remboursements} />
			<Tab.Screen name="Emprunts" component={Emprunts} />
		</Tab.Navigator>
	);
}
