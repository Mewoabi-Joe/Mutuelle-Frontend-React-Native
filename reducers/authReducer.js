import AsyncStorage from "@react-native-async-storage/async-storage";

export const authReducer = (state, action) => {
	console.log("AUTH REDUCER.JS\n");

	const removeKey = async () => {
		try {
			await AsyncStorage.removeItem("@token");
			console.log("key removed sucessfully");
		} catch (error) {
			console.log("error while trying to remove key from async storage", error);
		}
	};

	const getToken = async () => {
		try {
			const value = await AsyncStorage.getItem("@token");
			console.log(value);
		} catch (e) {
			console.log("Error while getting token from Async storage", e.message);
		}
	};

	const setKey = async (value) => {
		try {
			await AsyncStorage.setItem("@token", value);
			console.log(`Token ${value} set succesfully`);
		} catch (e) {
			console.log("error while setting key in async storage", e);
		}
	};

	switch (action.type) {
		case "TOKEN_OBTAINED":
			console.log("TOKEN_OBTAINED_REDUCER");

			return {
				token: action.payload,
				isAuthenticated: false,
				user: null,
			};
		case "LOADING":
			console.log("LOADING_REDUCER");
			return {
				...state,
				loading: true,
			};
		case "LOADED":
			console.log("LOADING_REDUCER");
			return {
				...state,
				loading: false,
			};
		case "USER_LOADED":
			console.log("USER_LOADED_REDUCER");

			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false,
			};
		case "LOGIN_SUCCESS":
		case "REGISTER_SUCCESS":
			console.log("SUCCESS_REDUCER");

			setKey(action.payload.token);
			getToken();
			return {
				...state,
				...action.payload,
				loading: false,
				isAuthenticated: true,
			};
		case "LOGOUT_SUCCESS":
			removeKey();
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
