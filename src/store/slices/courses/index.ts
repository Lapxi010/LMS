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
};

const courseSlice = createSlice({
	reducers: {
		addCourse: (state, action) => {
			state.data = [...state.data, action.payload];
		}
	},
	name: 'courses',
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
			});
	}
});

export const selectStatus = (state) => state.courses.statusCourses;
export const selectStatusCreateCourse = (state) => state.courses.statusCreateCourses;
export const selectCourses = (state) => state.courses.data;

export const coursesActions = courseSlice.actions;
export default courseSlice.reducer;