import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@api/index";
import {ICourse, ICourses} from "./ICourse";

export const fetchCourses = createAsyncThunk(
    'auth/fetchCourses',
    async (_, {rejectWithValue}) => {
        try {
            const response = await Api.get<ICourses>('courses/course');

            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data.courses;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

export const fetchCreateCourse = createAsyncThunk<any, {title: string, description: string, shorDesc: string}, any>(
    'auth/fetchCreateCourse',
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post<ICourses>('courses/course', data);
            if (!(response.status === 200)) {
                throw new Error(`Error: ${response.data.message}`);
            }
            return response.data.message;

        } catch (e) {
            return rejectWithValue(e.message);
        }
    });

