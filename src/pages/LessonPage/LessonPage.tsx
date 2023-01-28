import React, {FC} from 'react';
import {Header} from "@components/Header/Header";
import {useParams} from "react-router-dom";
import {useAppSelector} from "@hooks/HookRedux";
import {selectLesson} from "@store/slices/course";
import axios from "axios";
import styles from './LessonPage.module.sass';

export const LessonPage: FC = () => {
    const {id} = useParams()
    const lesson = useAppSelector((state) => selectLesson(state, id))
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [uploaded, setUploaded] = React.useState();
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

    return (
        <>
            <Header>Курс</Header>
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
            </div>
        </>
    )
}