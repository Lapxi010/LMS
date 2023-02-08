import React, {FC, useState} from "react";
import styles from './UploaderVideo.module.sass';
import axios from "axios";

export const UploaderVideo: FC<{id:string}> = ({id}) => {
    const [drag, setDrag] = React.useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState();
    const [progress, setProgress] = useState(0);
    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(e.target.files[0]);
    }

    const loadVideo = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadVideo/${id}`, formData, {
            onUploadProgress: (progressEvent) => {
                setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
            }
        });
        setUploaded(data);
    };

    const dropFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        setSelectedFile(e.dataTransfer.files[0])
    }

    return (
        <div className={styles.root}>
            {
                drag ? <div className={styles.drag}
                    onDragStart={(e) => {
                        e.preventDefault();
                        setDrag(true)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setDrag(false)
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true)
                    }}
                    onDrop={(e) => {dropFile(e)}}
                >Отпустите файл, чтобы загрузить</div> : <div  className={styles.drag}
                    onDragStart={(e) => {
                        e.preventDefault();
                        setDrag(true)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setDrag(false)
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDrag(true)
                    }}
                ><input type='file' className={styles.input} onChange={handlerInput}/>Перетащите файл, чтобы загрузить</div>
            }
            <div className={styles.progress}><div style={{width: `${progress}%`}} className={styles.progress__line}></div></div>
            <button onClick={loadVideo}>Загрузить</button>
        </div>
    )
}