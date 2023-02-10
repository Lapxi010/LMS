import React, {FC, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {CreateLessonForm} from '@modules/CreateLessonViewModule/components/CreateLessonForm/CreateLessonForm';
export const CreateLessonView: FC<{id: string}> = ({id}) => {
	const [close, setClose] = useState(false);

	return (
		<>
			{close && <Navigate to={`../../course/${id}`}/>}
			<CreateLessonForm id={id} setClose={setClose}/>
		</>
	);
};