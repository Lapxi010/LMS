import React, {FC, useEffect} from 'react';
import styles from './LoginPage.module.sass';
import {LoginForm} from '@components/Forms/LoginForm/LoginForm';
import {AuthLayout} from '@components/Layouts/AuthLayout/AuthLayout';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import { selectIsAuth} from "@store/slices/auth";
import {fetchAuthMe} from "@store/slices/auth/AsyncThunks";
import {Navigate} from "react-router-dom";

export const LoginPage: FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	useEffect(() => {
		 dispatch(fetchAuthMe());
	}, [])

	if (isAuth === 'success') {
		return <Navigate to="/"/>
	}

	return (
		<AuthLayout>
			<LoginForm/>
		</AuthLayout>
	);
};
