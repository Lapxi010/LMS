import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectLesson} from '@store/slices/course';
import axios from 'axios';
import styles from './LessonMainView.module.sass';
import {fetchGetComments} from "@store/slices/course/AsyncThunks";
import {CommentListTeacher} from "@modules/LessonMainViewModule/components/CommentList/CommentListTeacher";

export const LessonMainViewTeacher: FC<{ id: string }> = ({id}) => {
    const lesson = useAppSelector((state) => selectLesson(state, id));
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState();
    const [selectedFileDoc, setSelectedFileDoc] = useState<File | null>(null);
    const [uploadedDoc, setUploadedDoc] = useState();
    const dispatch = useAppDispatch();

    const formatDate = lesson?.createdAt.slice(8, 10) + '-'
        + lesson?.createdAt.slice(5, 7) + '-' + lesson?.createdAt.slice(0, 4) + '   ' + lesson?.createdAt.slice(11, 13) + ':' + lesson?.createdAt.slice(14, 16)

    useEffect(() => {
        dispatch(fetchGetComments(lesson?.id))
    }, [])

    const handleFileInput = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadVideo/${lesson.id}`, formData, {
            onUploadProgress: (progressEvent) => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
            }
        });
        setUploaded(data);
    };

    const handleUploadFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files[0]);
    };


    const handleFileInputDoc = async () => {
        if (!selectedFileDoc) {
            alert('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFileDoc);
        const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadDoc/${lesson.id}`, formData, {
            onUploadProgress: (progressEvent) => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%');
            }
        });
        setUploadedDoc(data);
    };

    const handleUploadFileInputDoc = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFileDoc(event.target.files[0]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{lesson.title}</h2>
            </div>
            {
                lesson.srcVideo &&
                <div className={styles.wrapper__video}>
                    <video className={styles.video} controls={true}
                           src={`http://localhost:6789/api/v1/courses/video/${lesson.id}`}/>
                </div>
            }
            <div className={styles.description}>
                <p>{lesson.description}</p>
                <div className={styles.description__wrapper}>
                    <span>{formatDate}</span>
                </div>
            </div>
            {
                !lesson.srcVideo &&
                <div>
                    <input type="file" onChange={handleUploadFileInput}/>
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
            <CommentListTeacher id={lesson?.id}/>
            <div>
                <input type="file" onChange={handleUploadFileInputDoc}/>
                <button onClick={handleFileInputDoc}>Upload now!</button>
            </div>
        </div>
    );
};