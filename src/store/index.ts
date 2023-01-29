import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {AuthReducer} from './slices/auth';
import coursesReducer from './slices/courses';
import courseReducer from './slices/course';

export const store = configureStore({
	reducer: combineReducers({
		auth: AuthReducer,
		courses: coursesReducer,
		course: courseReducer
	})
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;

