import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth';

export const store = configureStore({
	reducer: combineReducers({
		auth: authReducer
	})
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;

