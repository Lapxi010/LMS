import React, {FC, useState} from "react";
import {useAppDispatch} from "@hooks/HookRedux";
import axios from "axios";
import {addImage} from "@store/slices/auth";
import styles from "./UploaderImage.module.sass";
import {Button} from "@components/Button/Button";
import {classNames} from "@utils/classNames";

export const UploaderImage: FC<{ id: string }> = ({id}) => {
    const dispatch = useAppDispatch();
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
        const {data} = await axios.post(`http://localhost:6789/api/v1/files/uploadImageUser/${id}`, formData, {
            onUploadProgress: (progressEvent) => {
                setProgress(Math.round(progressEvent.loaded / progressEvent.total * 100))
                if (Math.round(progressEvent.loaded / progressEvent.total * 100) == 100 ){
                    setProgress(0)
                }
            }
        });
        setUploaded(data);
        dispatch(addImage({srcImage: data.fileName}));
    };

    const dropFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        setSelectedFile(e.dataTransfer.files[0])
    }

    const deleteImage = () => {
        setSelectedFile(null);
    }

    return (
        <div className={styles.root}>
            {
                selectedFile ? <div className={styles.information}>
                        <div className={styles.description}>
                            <h3>{selectedFile.name}</h3>
                            <span>{selectedFile.type}</span>
                            <span>{selectedFile.size}</span>
                        </div>
                        <div className={styles.controls}>
                            <Button className={styles.btn} onClick={loadVideo}>Загрузить</Button>
                            <Button className={classNames(styles.btn, styles.btn__red)} onClick={deleteImage}>Удалить</Button>
                        </div>
                        {(progress != 0 && progress != 100) && <div className={styles.progress}>
                            <div style={{width: progress + '%'}} className={styles.progress__line}></div>
                        </div>}
                    </div>
                    : <>
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
                                        onDrop={(e) => {
                                            dropFile(e)
                                        }}
                                ><h3 className={styles.title}>Отпустите файл, чтобы загрузить</h3></div>
                                : <div className={styles.drag}
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
                                ><input type='file' className={styles.input} onChange={handlerInput}/><h3
                                    className={styles.title}>Перетащите файл, чтобы загрузить</h3></div>
                        }
                    </>
            }
        </div>
    )
}