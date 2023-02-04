import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '@api/index';
import {ICourse, ICourses} from './ICourse';
import {coursesActions} from './index';
import {selectCoursesIsLoaded} from "@store/slices/courses/selectors";


export const fetchCourses = async (dispatch, getState) => {
	try {
		const state = getState();

		if (selectCoursesIsLoaded(state)) return;

		dispatch(coursesActions.startLoadingFetchCourses());
		const response = await Api.get<ICourses>('courses/course');

		if (!(response.status === 200)) {
			throw new Error(`Error: ${response.data.message}`);
		}

		return dispatch(coursesActions.successFetchCourses(response.data.courses));
	}catch (e) {
		return dispatch(coursesActions.failedFetchCourses(e.message));
	}
}

export const fetchCreateCourse = (data) => async(dispatch, getState) => {
	try {
		const response = await Api.post<ICourses>('courses/course', data);
		dispatch(coursesActions.startLoadingCreateCourse());
		if (!(response.status === 200)) {
			throw new Error(`Error: ${response.data.message}`);
		}
		dispatch(coursesActions.addCourse(response.data.course));
		dispatch(coursesActions.successCreateCourse());
		return response.data.message;
	} catch (e) {
		return dispatch(coursesActions.failedCreateCourse(e.message));
	}
}
