import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchRegister, fetchLogin, fetchRefresh, fetchLogout} from './AsyncThunks';

interface IauthState {
    data: any;
    status: 'idle' | 'loading' | 'failed' | 'success';
    isAuth: boolean;
    error: string | null;
}

const initialState: IauthState = {
    data: null,
    status: 'idle',
    isAuth: false,
    error: null
};

const isError = (action) => {
    return action.type.endsWith('rejected');
}

const authSlice = createSlice({
    reducers: undefined,
    name: 'auth',
    initialState,
    extraReducers: (builder) =>{
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(fetchRefresh.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRefresh.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload.user;
                state.isAuth = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(fetchLogout.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = null;
                state.isAuth = false;
                localStorage.removeItem('token');

            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'failed';
                state.isAuth = false;
            });
    }
});

export const selectStatus = (state) => state.auth.status;
export const selectIsAuth = (state) => state.auth.isAuth;
export default authSlice.reducer;
