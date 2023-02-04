import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCourses, fetchCreateCourse} from './AsyncThunks';

interface ICourseState {
    data: any;
    statusCourses: 'idle' | 'loading' | 'failed' | 'success';
    statusCreateCourses: 'idle' | 'loading' | 'failed' | 'success';
	errorCourses: string | null;
	errorCreateCourses: string | null;
}

const initialState: ICourseState = {
	data: null,
	statusCourses: 'idle',
	statusCreateCourses: 'idle',
	errorCourses: null,
	errorCreateCourses: null
};

const courseSlice = createSlice({
	reducers: {
		startLoadingFetchCourses: (state) => {
			state.statusCourses = 'loading';
		},
		successFetchCourses: (state, action: PayloadAction<any>) => {
			state.statusCourses = 'success';
			state.data = action.payload;
		},
		failedFetchCourses: (state, action: PayloadAction<any>) => {
			state.statusCourses = 'failed';
			state.errorCourses = action.payload;
		},
		startLoadingCreateCourse: (state) => {
			state.statusCreateCourses = 'loading';
		},
		successCreateCourse: (state) => {
			state.statusCreateCourses = 'success';
		},
		failedCreateCourse: (state, action: PayloadAction<any>) => {
			state.statusCreateCourses = 'failed';
			state.errorCreateCourses = action.payload;
		},
		addCourse: (state, action) => {
			state.data = [...state.data, action.payload];
		}
	},
	name: 'courses',
	initialState
});


export const coursesActions = courseSlice.actions;
export default courseSlice.reducer;