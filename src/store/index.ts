import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import courseReducer from './slices/course';

export const store = configureStore({
	reducer: combineReducers({
		auth: authReducer,
		course: courseReducer
	})
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;

