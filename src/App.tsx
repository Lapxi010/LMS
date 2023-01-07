import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@pages/HomePage/HomePage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { RegistrationPage } from '@pages/RegistrationPage/RegistrationPage';
import './App.module.sass';

export const App: FC = () => {

	return (
		<>
			<Routes>
				<Route index element={<HomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegistrationPage/>}/>
			</Routes>
		</>
	);
};
