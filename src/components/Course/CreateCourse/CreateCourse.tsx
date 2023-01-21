import React, {FC, useState} from 'react';
import styles from './CreateCourse.module.sass'
import {useAppDispatch} from "@hooks/HookRedux";
import {fetchCreateCourse} from "@store/slices/course/AsyncThunks";

export const CreateCourse: FC = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [desShort, setDescShort] = useState('')
    const dispatch = useAppDispatch()
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDesc = (e) => {
        setDescription(e.target.value)
    }

    const changeDescShort = (e) => {
        setDescShort(e.target.value)
    }

    const sendData = () => {
        const data = {title, description, shorDesc: desShort}
        dispatch(fetchCreateCourse(data))
    }

    return (
            <div className={styles.root}>
                <div>
                    <label>Название</label>
                    <input value={title} onChange={changeTitle}/>
                </div>
                <div>
                    <label>Описание</label>
                    <textarea value={description} onChange={changeDesc}/>
                </div>
                <div>
                    <label>Короткое описание</label>
                    <textarea value={desShort} onChange={changeDescShort}/>
                </div>
                <button onClick={sendData}>Создать курс</button>
            </div>
    )
}