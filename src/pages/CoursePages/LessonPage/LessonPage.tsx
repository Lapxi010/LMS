import React, {FC} from 'react';
import {Header} from '@modules/Header/Header';
import {useParams} from 'react-router-dom';
import {LessonMainViewTeacher} from '@modules/LessonMainViewModule';
import {useAppSelector} from "@hooks/HookRedux";
import {selectRole} from "@store/slices/auth";
import {LessonMainViewChildren} from "@modules/LessonMainViewModule/LessonMainView/LessonMainViewChildren";

export const LessonPage: FC = () => {
	const {id} = useParams();
	const role = useAppSelector(selectRole)

	return (
		<>
			<Header>Урок</Header>
			{role === 'teacher' ? <LessonMainViewTeacher id={id}/> : <LessonMainViewChildren id={id}/>}
		</>
	);
};