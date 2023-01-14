import {createAsyncThunk} from "@reduxjs/toolkit";
import AppFetch from "@api/index";
import {logout} from "./index";

export const fetchLogout = (dispatch, getState) =>
{
    document.cookie = `token=dadsa; expires=${new Date().toUTCString()}; path=/`;
    dispatch(logout());
    dispatch(fetchAuthMe());
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (data, {rejectWithValue}) => {
    try {
        const response = await AppFetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const value = await response.json();
        if (!(response.status === 200)) {
            throw new Error(`Error: ${value.message}`);
        }
        return value;

    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (data, {rejectWithValue}) => {
        try {
            const response = await AppFetch('users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const value = await response.json();
            if (!(response.status === 200)) {
                throw new Error(`Error: ${value.message}`);
            }

            return value;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async ( _,{rejectWithValue}) => {
        try {
            const response = await AppFetch('users/authMe');
            const value = await response.json();
            if (!(response.status === 200)) {
                throw new Error(`Error: ${value.message}`);
            }

            return value;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });
