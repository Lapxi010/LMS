import React, {FC, ReactElement} from 'react';
import styles from './AuthLayout.module.sass';
import {ThemeSwitcherBtn} from '@components/ThemeSwitcherBtn/ThemeSwitcherBtn';

export const AuthLayout: FC<{children: ReactElement}> = ({children}) => {
	return (
		<div className={styles.root}>
			<ThemeSwitcherBtn className={styles.themeSwitcher}/>
			{children}
			<div className={styles.rightBlock}></div>
			<span className={styles.license}>© 2023-2024 LapxiLMS</span>
		</div>
	);
};