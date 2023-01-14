import React, {FC} from 'react';
import styles from './AuthLayout.module.sass';
import { ThemeSwitcherBtnAuth} from '@components/ThemeSwitcherBtn/ThemeSwitcherBtn';
import {Outlet} from "react-router-dom";

export const AuthLayout: FC= () => {
	return (
		<div className={styles.root}>
			<ThemeSwitcherBtnAuth className={styles.themeSwitcher}/>
			<Outlet/>
			<div className={styles.rightBlock}></div>
			<span className={styles.license}>© 2023-2024 LapxiLMS</span>
		</div>
	);
};
