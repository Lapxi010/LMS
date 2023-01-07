import React, {FC, useEffect} from 'react';
import {useAppSelector} from '@hooks/HookRedux';
import {selectIsAuth} from '@store/slices/auth';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';
import {authMe} from '@store/slices/auth';

export const HomePage: FC = () => {
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authMe);
	}, []);

	if (isAuth === 'idle') {
		return <Navigate to='/login'/>;
	}


	return (
		<h1>Home</h1>
	);
};
