import React, {FC} from 'react';
import styles from './LoginPage.module.sass';
import {LoginForm} from '@components/Forms/LoginForm/LoginForm';
import {AuthLayout} from '@components/Layouts/AuthLayout/AuthLayout';

export const LoginPage: FC = () => {
	return (
		<AuthLayout>
			<LoginForm/>
		</AuthLayout>
	);
};
