import {createAsyncThunk} from "@reduxjs/toolkit";
import AppFetch from "@api/index";

export const fetchLogin = createAsyncThunk<any, any, any>(
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

        return await response.json();

    } catch (e) {
        return rejectWithValue(e.message);
    }
});

export const fetchRegister = createAsyncThunk<any, any, any>(
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

            return await response.json();

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchAuthMe = createAsyncThunk<any, any, any>(
    'auth/fetchAuthMe',
    async ( _,{rejectWithValue}) => {
        try {
            const response = await AppFetch('users/authMe');
            const value = await response.json();
            if (!(response.status === 200)) {
                throw new Error(`Error: ${value.message}`);
            }


            return await response.json();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    });
