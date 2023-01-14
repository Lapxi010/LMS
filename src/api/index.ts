type IAppFetch = (url: string, options?: RequestInit) => Promise<Response>

const AppFetch: IAppFetch = async (url, options = {}) => {
	return await fetch(`http://localhost:6789/api/v1/${url}`, {
		...options,
		credentials: 'include',
	});
};

export default AppFetch;
