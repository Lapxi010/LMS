import React, {Dispatch, FC} from 'react';
import styles from './CreateCourse.module.sass';
import {Spinner} from '@ui/PreLoaders/Spinner/Spinner';

export const CreateCourseLoading: FC<{setView: Dispatch<boolean>}> = ({setView}) => {
	return (
		<div className={styles.root} onClick={() => setView(false)}>
			<div className={styles.wrapper} onClick={e => e.stopPropagation()}>
				<Spinner className={styles.wrapper__spinner}/>
			</div>
		</div>
	);
};