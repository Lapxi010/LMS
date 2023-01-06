import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { About } from '@pages/About/About';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { RegistrationPage } from '@pages/RegistrationPage/RegistrationPage';
import './App.module.sass';

export const App: FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<RegistrationPage/>}/>
			</Routes>
		</>
	);
};
