import { Formik } from "formik";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback,
	Keyboard,
	TextInput,
	ScrollView,
	FlatList,
	Alert,
} from "react-native";
import { Avatar, Icon, ListItem } from "react-native-elements";
import FlatButton from "../../shared/button";
import { globalStyles } from "../../styles/global";
import * as yup from "yup";
import { MemberContext } from "../../contexts/memberContext";
import axiosJSI from "../../utils/axiosJSI";

const memberCreateSchema = yup.object({
	nom: yup.string().required("un nom est requis"),
	prenom: yup.string().required("un prenom est requis"),
	telephone: yup
		.string()
		.required("un numero de telephone est requis")
		.test(
			"isValidNumber",
			"Numero de telephone invalid",
			(val) => parseInt(val) > 600000000 && parseInt(val) < 700000000
		),
	email: yup
		.string()
		.required("un email est requis")
		.email("l'email n'est pas sur le bon format"),
	adresse: yup
		.string()
		.required("un adresse est requis")
		.min(4, "minimum 4 charactere pour l'addresse"),
	motDePasse: yup
		.string()
		.required("un mot de passe est requis")
		.min(4, "minimum 4 charactere pour le mot de passse"),
	motDePasseR: yup
		.string()
		.oneOf(
			[yup.ref("motDePasse"), null],
			"les mot de passes ne correspond pas"
		),
});

export default function Membres() {
	const [loading, setLoading] = useState(false);
	const { members, dispatch } = useContext(MemberContext);
	const [modalOpen, setModalOpen] = useState(false);

	// useEffect(() => {
	// 	console.log("IN MEMBER USEEFFECT");
	// 	console.log(members);
	// }, []);
	// const { auth, dispatch } = useContext(AuthContext);

	const handleCreateMember = (
		name,
		first_name,
		tel,
		email,
		address,
		password
	) => {
		// dispatch({ type: "LOADING" });

		// Request Body
		const body = JSON.stringify({
			name,
			first_name,
			tel,
			email,
			address,
			password,
		});

		axiosJSI
			.post("/members", body)
			.then((res) => {
				console.log("responds from post:", res.data);
				setLoading(false);
				Alert.alert("SUCCESS", "A new member has been created", [
					{
						text: "OKAY",
					},
				]);
				dispatch({
					type: "ADD_MEMBER",
					payload: res.data,
				});
			})
			.catch((err) => {
				// dispatch({ type: "LOADED" });
				console.log(err.response.data);
				// Alert.alert("OOPS!", "A user with this credentials does not exist.", [
				// 	{
				// 		text: "Understood",
				// 	},
				// ]);
			});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={globalStyles.container}>
				<Modal visible={modalOpen} animationType="slide">
					<View style={globalStyles.container}>
						<Icon name="close" onPress={() => setModalOpen(false)} />
						<Formik
							validationSchema={memberCreateSchema}
							initialValues={{
								nom: "",
								prenom: "",
								telephone: "",
								email: "",
								adresse: "",
								motDePasse: "",
								motDePasseR: "",
							}}
							onSubmit={(values) => {
								console.log(values);
								handleCreateMember(
									values.nom,
									values.prenom,
									values.telephone,
									values.email,
									values.adresse,
									values.motDePasse
								);
								// handlePress();
							}}
						>
							{(props) => (
								<ScrollView style={{ flex: 1, opacity: 1, paddingTop: 10 }}>
									<TextInput
										style={{ ...globalStyles.input }}
										placeholder="Nom"
										onChangeText={props.handleChange("nom")}
										value={props.values.nom}
										onBlur={props.handleBlur("nom")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.nom && props.errors.nom}
									</Text>

									<TextInput
										style={globalStyles.input}
										placeholder="Prenom"
										onChangeText={props.handleChange("prenom")}
										value={props.values.prenom}
										onBlur={props.handleBlur("prenom")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.prenom && props.errors.prenom}
									</Text>

									<TextInput
										keyboardType="numeric"
										style={globalStyles.input}
										placeholder="Telephone"
										onChangeText={props.handleChange("telephone")}
										value={props.values.telephone}
										onBlur={props.handleBlur("telephone")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.telephone && props.errors.telephone}
									</Text>

									<TextInput
										style={globalStyles.input}
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
										placeholder="Addresse"
										onChangeText={props.handleChange("adresse")}
										value={props.values.adresse}
										onBlur={props.handleBlur("adresse")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.adresse && props.errors.adresse}
									</Text>

									<TextInput
										style={globalStyles.input}
										placeholder="Mot de passe"
										onChangeText={props.handleChange("motDePasse")}
										value={props.values.motDePasse}
										onBlur={props.handleBlur("motDePasse")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.motDePasse && props.errors.motDePasse}
									</Text>
									<TextInput
										style={globalStyles.input}
										placeholder="Repeter mot de passe"
										onChangeText={props.handleChange("motDePasseR")}
										value={props.values.motDePasseR}
										onBlur={props.handleBlur("motDePasseR")}
									/>
									<Text style={globalStyles.errorText}>
										{props.touched.motDePasseR && props.errors.motDePasseR}
									</Text>

									<FlatButton
										text={loading ? "loading..." : "Add Member"}
										onPress={() => {
											setLoading(true);
											props.handleSubmit();
										}}
										color="black"
									/>
								</ScrollView>
							)}
						</Formik>
					</View>
				</Modal>

				<FlatList
					data={members}
					keyExtractor={(member) => member.id}
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
					onPress={() => setModalOpen(true)}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}
