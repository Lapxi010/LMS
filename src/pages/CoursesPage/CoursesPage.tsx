import React, {FC, useState} from 'react';
import styles from './CoursesPage.module.sass';
import {Header} from '@components/Header/Header';
import {CreateCourse} from '@components/Course/CreateCourse/CreateCourse';
import {CoursesList} from '@components/Course/CoursesList/CoursesList';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectRole} from '@store/slices/auth';
import {Button} from '@components/Button/Button';

export const CoursesPage: FC = () => {
	const role = useAppSelector(selectRole);
	const [view, setView] = useState<boolean>(false);

	return (
		<div className={styles.wrapper}>
			{view && <CreateCourse setView={setView}/>}
			<Header>Курсы</Header>
			<div className={styles.container}>
				<CoursesList/>
				{
					role === 'teacher'
                    &&
                    <Button
                    	onClick={() => {
                    		setView(e => !e);
                    	}}
                    	type={'button'}
                    	className={styles.btn}
                    >Создать курс</Button>
				}
			</div>
		</div>
	);
};
