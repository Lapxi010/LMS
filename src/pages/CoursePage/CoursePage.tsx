import React, {FC, useEffect, useState} from 'react';
import styles from './CoursePage.module.sass';
import {Header} from '@components/Header/Header';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {fetchCourse} from "@store/slices/course/AsyncThunks";
import {selectThisCourse} from "@store/slices/course";

export const CoursePage: FC = () => {
	const {id} = useParams();
	const course = useAppSelector(selectThisCourse)
	const dispatch = useAppDispatch();

	useEffect(()=>{
		dispatch(fetchCourse(id))
	},[id]);

	return (
		<div className={styles.container}>
			<Header>Курс</Header>
			{course &&  <div>
				<h1>{course.title}</h1>
			</div>}
		</div>
	);
};
