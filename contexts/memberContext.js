import React, { createContext, useReducer, useEffect, useState } from "react";
import { memberReducer } from "../reducers/memberReducer";
import axiosJSI from "../utils/axiosJSI";

export const MemberContext = createContext();

const MemberContextProvider = (props) => {
	// const [membersUS, setMembersUS] = useState([]);
	const [members, dispatch] = useReducer(memberReducer, []);

	useEffect(() => {
		const getMembers = async () => {
			const res = await axiosJSI.get("/members");
			dispatch({ type: "INITIALIZE_MEMBERS", payload: res.data });
		};

		getMembers();
	}, [members]);

	return (
		<MemberContext.Provider value={{ members, dispatch }}>
			{props.children}
		</MemberContext.Provider>
	);
};

export default MemberContextProvider;
