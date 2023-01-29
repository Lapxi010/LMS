import React, {FC, useState} from 'react';
import styles from './CreateLessonPage.module.sass';
import {Header} from '@modules/Header/Header';
import {Navigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchCreateLesson} from '@store/slices/course/AsyncThunks';

export const CreateLessonPage: FC = () => {
	const {id} = useParams();
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
		<div className={styles.container}>
			{close && <Navigate to={`../../course/${id}`}/>}
			<Header>Создание курса</Header>
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
		</div>
	);
};