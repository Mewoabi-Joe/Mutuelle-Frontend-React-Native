import React, { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { AdministratorContext } from "../../contexts/administratorContext";
import { globalStyles } from "../../styles/global";

export default function Administrateurs() {
	const { administrators } = useContext(AdministratorContext);
	useEffect(() => {
		console.log(administrators);
	}, []);
	return (
		<View style={globalStyles.container}>
			<FlatList
				data={administrators}
				keyExtractor={(admin) => admin.id}
				renderItem={({ item }) => (
					<ListItem
						bottomDivider
						containerStyle={{ borderRadius: 20, marginBottom: 20 }}
					>
						<Avatar
							rounded
							icon={{ name: "user", type: "simple-line-icon", color: "red" }}
						/>
						<ListItem.Content>
							<ListItem.Title>{`${item.first_name} ${item.name}`}</ListItem.Title>
							<ListItem.Subtitle>{item.email}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				)}
			/>
			<Icon
				name="add-circle"
				size={70}
				color="#f4511e"
				containerStyle={{ position: "absolute", bottom: 10, right: 10 }}
			/>
		</View>
	);
}
