import { v4 as uuidv4 } from "uuid";

export const memberReducer = (state, action) => {
	switch (action.type) {
		case "INITIALIZE_MEMBERS":
			return action.payload;

		case "ADD_MEMBER":
			return [...state, action.payload];
		//     case 'REMOVE_MEMBER':
		//       return state.filter(member => member.id !== action.id);
		default:
			return state;
	}
};
