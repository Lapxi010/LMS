import axios from "axios";


export const Api = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:6789/api/v1/',
})

Api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

export default Api;
