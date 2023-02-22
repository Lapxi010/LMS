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

export const fetchCreateComment = createAsyncThunk<any, any, any>(
	'fetchCreateComment',
	async  (data, {rejectWithValue}) => {
		try {
			const response = await Api.post(`courses/comment/${data.id}`, data.data);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return response.data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const fetchGetComments = createAsyncThunk<any, any, any>(
	'fetchGetComments',
	async  (id, {rejectWithValue}) => {
		try {
			const response = await Api.get(`courses/getComments/${id}`);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return response.data;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const fetchDeleteComment = createAsyncThunk<any, any, any>(
	'fetchDeleteComment',
	async  (id, {rejectWithValue}) => {
		try {
			const response = await Api.delete(`courses/comment/${id}`);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return id;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const fetchDocDownload = createAsyncThunk<any, any, any>(
	'fetchDocDownload',
	async  (id, {rejectWithValue}) => {
		try {
			const response = await Api.get(`files/docDownload/${id}`);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return id;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);



export const fetchDeleteVideo = createAsyncThunk<any, any, any>(
	'fetchDeleteVideo',
	async  (id, {rejectWithValue}) => {
		try {
			const response = await Api.post(`files/deleteVideo`, id);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return id;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);

export const fetchDeleteImage = createAsyncThunk<any, any, any>(
	'fetchDeleteImage',
	async  (id, {rejectWithValue}) => {
		try {
			const response = await Api.post(`files/deleteImage`, id);

			if (!(response.status === 200)) {
				throw new Error(`Error: ${response.data.message}`);
			}
			return id;
		} catch (e) {
			return rejectWithValue(e.message);
		}
	}
);
