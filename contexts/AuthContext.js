import React, { createContext, useState, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	console.log("AUTH CONTEXT.JS\n");
	const [auth, dispatch] = useReducer(authReducer, {
		loading: true,
		token: "",
		isAuthenticated: false,
		user: null,
	});
	return (
		<AuthContext.Provider value={{ auth, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};


export default AuthContextProvider;
