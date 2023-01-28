import {createAsyncThunk} from '@reduxjs/toolkit';
import Api from '@api/index';

export const fetchCourse = createAsyncThunk<any, any, any>(
    'fetchCourse',
    async (id, {rejectWithValue}) => {
        try {
            const response = await Api.get(`courses/course/${id}`);

            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchCreateLesson = createAsyncThunk<any, any, any>(
    'fetchCreateLesson',
    async  (data, {rejectWithValue}) => {
        try {
            const response = await Api.post(`courses/lesson/${data.id}`, data.data);

            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);