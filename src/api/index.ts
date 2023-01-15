import axios from "axios";


export const Api = axios.create({
	withCredentials: true,
	baseURL: 'http://localhost:6789/api/v1/',
})

Api.interceptors.request.use((config) => {
	config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

Api.interceptors.response.use((config) => {
	return config;
}, async (error) => {
	const originalRequest = error.config;
	if (error.response.status === 401 && error.config && !error.config._isRetry) {
		originalRequest._isRetry = true;
		try {
			const response = await Api.get('users/refresh');
			localStorage.setItem('token', response.data.accessToken);
			return Api.request(originalRequest);
		} catch (e) {
			console.log('Нет токена');
		}
	}
});

export default Api;
