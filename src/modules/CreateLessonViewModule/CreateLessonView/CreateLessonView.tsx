import React, {FC, useState} from 'react';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchCreateLesson} from '@store/slices/course/AsyncThunks';
import styles from './CreateLessonView.module.sass';
import {Navigate} from 'react-router-dom';
export const CreateLessonView: FC<{id: string}> = ({id}) => {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState('');
	const [description, setDesc] = useState('');
	const [close, setClose] = useState(false);
	const titleChange = (e) => {
		setTitle(e.target.value);
	};

	const descChange = (e) => {
		setDesc(e.target.value);
	};

	const sendData = async () => {
		await dispatch(fetchCreateLesson({id, data:{title, description}}));
		setClose(true);
	};
	return (
		<>
			{close && <Navigate to={`../../course/${id}`}/>}
			<div>
				<form onSubmit={(e)=>{e.preventDefault();}}>
					<div>
						<label>Название</label>
						<input type="text" value={title} onChange={titleChange}/>
					</div>
					<div>
						<label>Описание</label>
						<input type="text" value={description} onChange={descChange}/>
					</div>
					<button onClick={sendData}>Создать урок</button>
				</form>
			</div>
		</>
	);
};