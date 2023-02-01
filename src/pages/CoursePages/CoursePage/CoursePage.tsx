import React, {FC, useEffect, useState} from 'react';
import styles from './CoursePage.module.sass';
import {Header} from '@modules/Header/Header';
import {useParams,} from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchCourse} from '@store/slices/course/AsyncThunks';
import {CourseMainView} from '@modules/CourseMainViewModule';

export const CoursePage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCourse(id));
	}, [id]);


	return (
		<div className={styles.container}>
			<Header>Курс</Header>
			<CourseMainView/>
		</div>
	);
};
