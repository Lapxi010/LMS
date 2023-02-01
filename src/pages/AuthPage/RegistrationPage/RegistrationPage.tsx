import React, {FC} from 'react';
import styles from './RegistrationPage.module.sass';
import {RegistrationForm} from '@modules/AuthModule';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {useAppSelector} from '@hooks/HookRedux';
import {selectStatus} from '@store/slices/auth';
export const RegistrationPage: FC = () => {
	const status = useAppSelector(selectStatus);

	return (
		<>
			{status !== 'loading' && <RegistrationForm/>}
			{
				status ===  'loading' &&
				<div className={styles.root}>
					<div className={styles.wrapper}>
						<Spinner className={styles.wrapper__spinner}/>
					</div>
				</div>
			}
		</>
	);
};
