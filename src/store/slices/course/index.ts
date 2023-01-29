import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCourse, fetchCreateLesson} from '@store/slices/course/AsyncThunks';

interface ICourseState {
    data: any;
    status: 'idle' | 'loading' | 'failed' | 'success';
    error: string | null;
}

const initialState: ICourseState = {
	data: null,
	status: 'idle',
	error: null
};

const isError = (action) => {
	return action.type.endsWith('rejected');
};

const courseSlice = createSlice({
	reducers: undefined,
	name: 'course',
	initialState,
	extraReducers: (builder) =>{
		builder
			.addCase(fetchCourse.pending, (state) => {
				state.status = 'loading';
				state.data = null;
			})
			.addCase(fetchCourse.fulfilled, (state, action) => {
				state.status = 'success';
				state.data = action.payload.course;
			})
			.addCase(fetchCreateLesson.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCreateLesson.fulfilled, (state) => {
				state.status = 'success';
			});
	}
});

export const selectStatus = (state) => state.course.status;

export const selectThisCourse = (state) => state.course.data;
export const selectLesson = (state, id) => {
	const lessons = state.course.data.lessons;
	return lessons.filter(v => v.id === id)[0];
};

export default courseSlice.reducer;