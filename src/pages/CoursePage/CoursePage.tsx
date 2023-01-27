import React, {FC, useEffect, useState} from 'react';
import styles from './CoursePage.module.sass';
import {Header} from '@components/Header/Header';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {fetchCourse} from "@store/slices/course/AsyncThunks";
import {selectThisCourse} from "@store/slices/course";
import { Button } from '@components/Button/Button';

export const CoursePage: FC = () => {
	const {id} = useParams();
	const course = useAppSelector(selectThisCourse)
	const dispatch = useAppDispatch();
	const navigate = useNavigate()

	useEffect(()=>{
		dispatch(fetchCourse(id))
	},[id]);

	console.log(course)
	return (
		<div className={styles.container}>
			<Header>Курс</Header>
			{course &&
				<div>
					<h1>{course.title}</h1>
					<div>
						<p>{course.description}</p>
					</div>
					<p>{course.createdAt}</p>
				</div>
			}
			<Button onClick={()=>navigate(`../../createLesson/${course.id}`)}>Добавить урок</Button>
		</div>
	);
};
