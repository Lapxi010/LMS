import React, {FC} from 'react';
import styles from './App.module.sass';
import menu from './menu_FILL0_wght400_GRAD0_opsz48.svg';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { About } from '@pages/About/About';

export const App: FC = () => {
	return (
		<>
			<div className={styles.title}>
                Hello world!
				<img src={menu} alt="menu"/>
			</div>
			<Routes>
				<Route index element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
			</Routes>
		</>
	);
};
