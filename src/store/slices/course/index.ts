import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCourses, fetchCreateCourse} from './AsyncThunks';

interface ICourseState {
    data: any;
    statusCourses: 'idle' | 'loading' | 'failed' | 'success';
    statusCreateCourses: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
}

const initialState: ICourseState = {
    data: null,
    statusCourses: 'idle',
    statusCreateCourses: 'idle',
    error: null
};

const isError = (action) => {
    return action.type.endsWith('rejected');
}

const courseSlice = createSlice({
    reducers: undefined,
    name: 'course',
    initialState,
    extraReducers: (builder) =>{
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.statusCourses = 'loading';
                state.data = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.statusCourses = 'success';
                state.data = action.payload;
            })
            .addCase(fetchCreateCourse.pending, (state) => {
                state.statusCreateCourses = 'loading';
            })
            .addCase(fetchCreateCourse.fulfilled, (state, action) => {
                state.statusCreateCourses = 'success';
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.statusCourses = 'failed';
            })
            .addCase(fetchCreateCourse.rejected, (state, action) => {
                state.statusCreateCourses = 'failed';
            })
    }
});

export const selectStatus = (state) => state.course.status;
export const selectCourses = (state) => state.course.data;
export default courseSlice.reducer;