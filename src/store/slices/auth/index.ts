import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchRegister, fetchLogin, fetchAuthMe} from './AsyncThunks';

interface IauthState {
    data: any;
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
}

const initialState: IauthState = {
    data: null,
    status: 'idle',
    error: null
};

const isError = (action) => {
    return action.type.endsWith('rejected');
}

const authSlice = createSlice({
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'idle';
        }
    },
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
                state.data = action.payload;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    }
});

export const {logout} = authSlice.actions;

export const selectIsAuth = (state) => state.auth.status;
export default authSlice.reducer;
