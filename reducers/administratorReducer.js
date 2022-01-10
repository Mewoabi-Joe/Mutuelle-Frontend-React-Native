import { v4 as uuidv4 } from "uuid";

export const administratorReducer = (state, action) => {
	switch (action.type) {
		case "INITIALIZE_ADMINISTRATORS":
			return action.payload;
		// case 'ADD_ADMINISTRATOR':
		//   return [...state, {
		//     title: action.administrator.title,
		//     author: action.administrator.author,
		//     id: uuidv4()}
		//   ]
		// case 'REMOVE_ADMINISTRATOR':
		//   return state.filter(administrator => administrator.id !== action.id);
		default:
			return state;
	}
};
