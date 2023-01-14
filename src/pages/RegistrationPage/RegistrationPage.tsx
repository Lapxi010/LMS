import React, {FC, useEffect} from 'react';
import styles from './RegistrationPage.module.sass';
import {RegistrationForm} from '@components/Forms/RegistrationForm/RegistrationForm';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectIsAuth} from "@store/slices/auth";
import {fetchAuthMe} from "@store/slices/auth/AsyncThunks";
import {Navigate} from "react-router-dom";

export const RegistrationPage: FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	useEffect(  () => {
		dispatch(fetchAuthMe());
	}, [])

	if (isAuth === 'success') {
		return <Navigate to="/"/>
	}
	return (
		<>
			<RegistrationForm/>
		</>
	);
};
