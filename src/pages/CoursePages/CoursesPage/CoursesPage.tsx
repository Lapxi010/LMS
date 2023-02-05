import React, {FC, useState} from 'react';
import styles from './CoursesPage.module.sass';
import {Header} from '@modules/Header/Header';
import {CreateCourse} from '@modules/CreateCourseModalModule/CreateCourse/CreateCourse';
import {CoursesListChildren} from '@modules/CoursesListModule/CoursesList/CoursesListChildren';
import {useAppSelector} from '@hooks/HookRedux';
import {selectRole} from '@store/slices/auth';
import {Button} from '@components/Button/Button';
import {selectStatusCreateCourse} from '@store/slices/courses/selectors';
import {CreateCourseLoading} from '@modules/CreateCourseModalModule/CreateCourse/CreateCourseLoading';
import {CoursesListTeacher} from "@modules/CoursesListModule/CoursesList/CoursesListTeacher";

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
				{role === 'children' ? <CoursesListChildren/> : <CoursesListTeacher/>}
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
