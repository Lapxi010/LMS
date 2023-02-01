import React, {FC} from 'react';
import {Header} from '@modules/Header/Header';
import {useParams} from 'react-router-dom';
import {LessonMainView} from '@modules/LessonMainViewModule';

export const LessonPage: FC = () => {
	const {id} = useParams();

	return (
		<>
			<Header>Курс</Header>
			<LessonMainView id={id}/>
		</>
	);
};