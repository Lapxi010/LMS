import React, {FC, useState} from 'react';
import styles from './CoursesPage.module.sass';
import {Header} from '@modules/Header/Header';
import {CreateCourse} from '@components/Course/CreateCourse/CreateCourse';
import {CoursesList} from '@components/Course/CoursesList/CoursesList';
import {useAppSelector} from '@hooks/HookRedux';
import {selectRole} from '@store/slices/auth';
import {Button} from '@ui/Button/Button';
import {selectStatusCreateCourse} from '@store/slices/courses';
import {CreateCourseLoading} from '@components/Course/CreateCourse/CreateCourseLoading';

export const CoursesPage: FC = () => {
	const role = useAppSelector(selectRole);
	const [view, setView] = useState<boolean>(false);
	const statusCreate = useAppSelector(selectStatusCreateCourse);

	return (
		<div className={styles.wrapper}>
			{statusCreate === 'loading' && <CreateCourseLoading setView={setView}/>}
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
