import axios from "axios";

const baseURL = "http://192.168.0.103:3000";
// console.log("AXIOS_LOGIN_INSTANCE.JS");

const axiosJSI = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosJSI;
