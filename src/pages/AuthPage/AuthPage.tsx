import React, {FC, useEffect} from 'react';
import styles from './AuthPage.module.sass';
import {ThemeSwitcherBtnAuth} from '@modules/ThemeSwitcherBtn/ThemeSwitcherBtn';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectIsAuth} from '@store/slices/auth';
import {fetchRefresh} from '@store/slices/auth/AsyncThunks';

export const AuthPage: FC = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRefresh());
	}, []);

	return (
		<>
			{isAuth && <Navigate to='/'/>}
			<div className={styles.root}>
				<ThemeSwitcherBtnAuth className={styles.themeSwitcher}/>
				<Outlet/>
				<div className={styles.rightBlock}></div>
				<span className={styles.license}>© 2023-2024 LapxiLMS</span>
			</div>
		</>
	);
};
