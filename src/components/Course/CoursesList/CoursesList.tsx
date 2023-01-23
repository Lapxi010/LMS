import React, {FC, useEffect} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourses} from '@store/slices/course';
import {fetchCourses} from '@store/slices/course/AsyncThunks';
import {NavLink} from 'react-router-dom';

export const CoursesList: FC = () => {
	const courses = useAppSelector(selectCourses);
	const dispatch = useAppDispatch();

	useEffect(()=>{
		dispatch(fetchCourses());
	}, []);

	return (
		<div className={styles.root}>
			{!courses && <h2>У вас нет пока курсов</h2>}
			{courses?.map(v => <div key={v.id}>
				<NavLink to={`course/${v.id}`}>{v.title}</NavLink>
				<p>{v.description}</p>
				<p>{v.shorDesc}</p>
			</div>)}
		</div>
	);
};