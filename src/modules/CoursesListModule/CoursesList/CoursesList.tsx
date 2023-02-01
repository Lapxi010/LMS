import React, {FC, useEffect} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourses, selectStatus} from '@store/slices/courses';
import {fetchCourses} from '@store/slices/courses/AsyncThunks';
import {CoursesItem} from '@modules/CoursesListModule/components/CoursesItem/CoursesItem';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';

export const CoursesList: FC = () => {
	const courses = useAppSelector(selectCourses);
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);

	useEffect(() => {
		dispatch(fetchCourses());
	}, []);

	return (
		<>
			{status === 'loading' && <Spinner className={styles.wrapper__spinner}/>}
			{status !== 'loading' &&
                <div className={styles.root}>
                	{!courses && <h2>У вас нет пока курсов</h2>}
                	{courses?.map(item =>
                		<CoursesItem
                			key={item.id}
                			id={item.id}
                			title={item.title}
                			titleImg={item.titleImg}
                			shortDesc={item.shortDesc}
                		/>)}
                </div>}
		</>
	);
};