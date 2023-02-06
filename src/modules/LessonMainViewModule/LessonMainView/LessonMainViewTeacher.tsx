import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectComments, selectLesson} from '@store/slices/course';
import axios from 'axios';
import styles from './LessonMainView.module.sass';
import {fetchDeleteComment, fetchGetComments} from "@store/slices/course/AsyncThunks";
export const LessonMainViewTeacher: FC<{id: string}> = ({id}) => {
	const lesson = useAppSelector((state) => selectLesson(state, id));
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploaded, setUploaded] = useState();
	const [selectedFileDoc, setSelectedFileDoc] = useState<File | null>(null);
	const [uploadedDoc, setUploadedDoc] = useState();
	const dispatch = useAppDispatch();
	const comments = useAppSelector(selectComments);

	useEffect(() => {
		dispatch(fetchGetComments(lesson?.id))
	}, [])

	const handleFileInput =  async () => {
		if(!selectedFile) {
			alert('Please select a file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile);
		const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadVideo/${lesson.id}`,formData,{
			onUploadProgress: (progressEvent) => {
				console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		});
		setUploaded(data);
	};

	const handleUploadFileInput =  async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event.target.files[0]);
	};

	const deleteComment = async (id: string) => {
		dispatch(fetchDeleteComment(id))
	}

	const handleFileInputDoc =  async () => {
		if(!selectedFileDoc) {
			alert('Please select a file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFileDoc);
		const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadDoc/${lesson.id}`,formData,{
			onUploadProgress: (progressEvent) => {
				console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
			}
		});
		setUploadedDoc(data);
	};

	const handleUploadFileInputDoc =  async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFileDoc(event.target.files[0]);
	};

	return (
		<div className={styles.container}>
			<h2>{lesson.title}</h2>
			<p>{lesson.description}</p>
			<span>{lesson.createdAt}</span>
			{
				!lesson.srcVideo &&
                <div>
                	<input type="file" onChange={handleUploadFileInput} />
                	<button onClick={handleFileInput}>Upload now!</button>
                </div>
			}
			{
				selectedFile && (
					<ul>
						<li>Name: {selectedFile.name}</li>
						<li>Type: {selectedFile.type}</li>
						<li>Size: {selectedFile.size}</li>
					</ul>
				)
			}
			{
				lesson.srcVideo && <video width={'600px'} height={'300px'} controls={true} src={`http://localhost:6789/api/v1/courses/video/${lesson.id}`}/>
			}
			<div className={styles.wrapper__comments}>
				{
					comments?.map((comment) => {
						return <div key={comment.id} className={styles.comment}>
							<span>{comment.user.fio}</span>
							<span>{comment.text}</span>
							<span>{comment.rating}</span>
							<button onClick={()=>{deleteComment(comment.id)}}>удалить</button>
						</div>
					})
				}
			</div>
				<div>
					<input type="file" onChange={handleUploadFileInputDoc} />
					<button onClick={handleFileInputDoc}>Upload now!</button>
				</div>
		</div>
	);
};