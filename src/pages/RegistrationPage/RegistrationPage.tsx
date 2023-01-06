import React, {FC} from 'react';
import styles from './RegistrationPage.module.sass';
import {ThemeSwitcherBtn} from '@components/ThemeSwitcherBtn/ThemeSwitcherBtn';
import {RegistrationForm} from '@components/Forms/RegistrationForm/RegistrationForm';

export const RegistrationPage: FC = () => {
	return (
		<div className={styles.root}>
			<ThemeSwitcherBtn className={styles.themeSwitcher}/>
			<RegistrationForm/>
			<div className={styles.rightBlock}></div>
			<span className={styles.license}>© 2023-2024 LapxiLMS</span>
		</div>
	);
};
