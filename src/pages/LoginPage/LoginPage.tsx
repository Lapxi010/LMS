import React, {FC} from 'react';
import styles from './LoginPage.module.sass';
import {LoginForm} from '@components/Forms/LoginForm/LoginForm';
import {ThemeSwitcherBtn} from '@components/ThemeSwitcherBtn/ThemeSwitcherBtn';

export const LoginPage: FC = () => {
	return (
		<div className={styles.root}>
			<ThemeSwitcherBtn className={styles.themeSwitcher}/>
			<LoginForm/>
			<div className={styles.rightBlock}></div>
			<span className={styles.license}>© 2023-2024 LapxiLMS</span>
		</div>
	);
};
