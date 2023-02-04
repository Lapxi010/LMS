import React, {FC, useState} from 'react';
import styles from './CourseMainView.module.sass';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button} from '@components/Button/Button';
import axios from 'axios';
import {useAppSelector} from '@hooks/HookRedux';
import {selectStatus, selectThisCourse} from '@store/slices/course';
import {CourseInformation} from "@modules/CourseMainViewModule/components/CourseInformation/CourseInformation";
import {UploadImage} from "@modules/CourseMainViewModule/components/UploadImage/UploadImage";

export const CourseMainView: FC = () => {
	const navigate = useNavigate();
	const status = useAppSelector(selectStatus);
	const course = useAppSelector(selectThisCourse);

	return (
		<>
			{
				status === 'loading'
					?
					<Spinner className={styles.wrapper__spinner}/>
					:
					<>
						{
							course &&
                            <CourseInformation title={course.title} description={course.description} dataCreate={course.createdAt}/>
						}
						{course && course.titleImg != null ? <img
							width={'300px'}
							height={'300px'}
							src={course.titleImg ? `http://localhost:6789/uploads/${course.titleImg}` : '#'}
							alt="titleImg"/>
							:
							<UploadImage id={course.id}/>
						}
						{
							course &&
                            <div>
                            	{course.lessons.map(v => <div key={v.id}>
                            		<NavLink to={`../../lesson/${v.id}`}>
                            			{v.title}
                            		</NavLink>
                            	</div>)}
                            </div>
						}
						<Button onClick={() => navigate(`../../createLesson/${course.id}`)}>Добавить урок</Button>
					</>
			}
		</>
	);
};