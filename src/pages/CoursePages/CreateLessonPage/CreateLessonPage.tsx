import React, {FC} from 'react';
import styles from './CreateLessonPage.module.sass';
import {Header} from '@modules/Header/Header';
import {useParams} from 'react-router-dom';
import {CreateLessonView} from '@modules/CreateLessonViewModule';

export const CreateLessonPage: FC = () => {
	const {id} = useParams();


	return (
		<div className={styles.container}>
			<Header>Создание курса</Header>
			<CreateLessonView id={id}/>
		</div>
	);
};