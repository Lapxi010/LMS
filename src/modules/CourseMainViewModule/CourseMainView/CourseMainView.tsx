import React, {FC, useState} from 'react';
import styles from './CourseMainView.module.sass';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button} from '@components/Button/Button';
import axios from 'axios';
import {useAppSelector} from '@hooks/HookRedux';
import {selectThisCourse} from '@store/slices/course';

export const CourseMainView: FC = () => {
	const navigate = useNavigate();
	const course = useAppSelector(selectThisCourse);
	const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
	const [uploaded, setUploaded] = React.useState();
	const handleFileInput = async () => {
		if (!selectedFile) {
			alert('Please select a file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile);
		const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadImage/${course.id}`, formData, {
			onUploadProgress: (progressEvent) => {
				console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		});
		setUploaded(data);
	};
	const handleUploadFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files[0]);
	};


	return (
		<>
			{
				status === 'loading'
					?
					<Spinner className={styles.wrapper__spinner}/>
					:
					<>
						{course &&
                            <div>
                            	<h1>{course.title}</h1>
                            	<div>
                            		<p>{course.description}</p>
                            	</div>
                            	<p>{course.createdAt}</p>
                            </div>
						}
						{course && <img
							width={'300px'}
							height={'300px'}
							src={course.titleImg ? `http://localhost:6789/uploads/${course.titleImg}` : '#'}
							alt="titleImg"/>}
						{
							!course?.titleImg && <div>
								<input type="file" onChange={handleUploadFileInput}/>
								<button onClick={handleFileInput}>Upload now!</button>
							</div>
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