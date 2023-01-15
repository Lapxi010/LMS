import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "@api/index";
import {IAuthResponse} from "@store/slices/auth/IUser";

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post<IAuthResponse>('users/login', data);

            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post<IAuthResponse>('users/register', data);
            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }

            return response.data;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async (_, {rejectWithValue}) => {
        try {
            const response = await Api.get<IAuthResponse>('users/refresh');
            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }

            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchLogout = createAsyncThunk(
    'auth/logout',
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post<IAuthResponse>('users/logout');

            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });
