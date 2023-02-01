import React, {FC} from 'react';
import styles from './LoginPage.module.sass';
import {LoginForm} from '@modules/AuthModule';
import {useAppSelector} from '@hooks/HookRedux';
import {selectStatus} from '@store/slices/auth';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';

export const LoginPage: FC = () => {
	const status = useAppSelector(selectStatus);

	return (
		<>
			{status !== 'loading' && <LoginForm/>}
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
