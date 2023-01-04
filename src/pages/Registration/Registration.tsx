import React, {FC} from 'react';
import styles from './Registration.module.sass';
import {RegistrationForm} from '@components/RegistraionForm/RegistrationForm';

export const Registration: FC = () => {
	return (
		<div className={styles.root}>
			<RegistrationForm/>
			<div className={styles.rightBlock}></div>
		</div>
	);
};
