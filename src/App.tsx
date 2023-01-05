import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { About } from '@pages/About/About';
import { Registration } from '@pages/Registration/Registration';
import './App.module.sass';

export const App: FC = () => {
	return (
		<>
			<Routes>
				<Route path="/Home" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route index element={<Registration/>}/>
			</Routes>
		</>
	);
};
