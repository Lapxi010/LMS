import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AppFetch from '@api/index';

interface IauthState {
	isLoggedIn: boolean;
	status: 'idle' | 'loading' | 'failed' | 'success';
}

const initialState: IauthState = {
	isLoggedIn: false,
	status: 'idle'
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action:PayloadAction<{email: string, password: string}>) => {
			state.isLoggedIn = true;
			state.status = 'success';
		},
		authMe: (state) => {
			state.isLoggedIn = true;
			state.status = 'success';
		}
	}
});


export const login = (data) => (dispatch, getState) => {
	AppFetch('users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),

	})
		.then(v => {
			console.log(v);
			if (v) {
				dispatch(authSlice.actions.login(data));
			}
		});
};
export const authMe = (dispatch, getState) => {
	AppFetch('users/authMe')
		.then(data => {
			if (data.status === 200) {
				dispatch(authSlice.actions.authMe());
			}
		});
};

export const selectIsAuth = (state) => state.auth.status;
export default  authSlice.reducer;
