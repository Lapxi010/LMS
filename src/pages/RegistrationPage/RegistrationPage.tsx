import React, {FC} from 'react';
import styles from './RegistrationPage.module.sass';
import {RegistrationForm} from '@components/Forms/RegistrationForm/RegistrationForm';
import {AuthLayout} from "@components/Layouts/AuthLayout/AuthLayout";

export const RegistrationPage: FC = () => {
	return (
		<AuthLayout>
			<RegistrationForm/>
		</AuthLayout>
	);
};
