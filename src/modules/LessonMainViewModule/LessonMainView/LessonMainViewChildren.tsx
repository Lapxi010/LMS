import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectComments, selectLesson, selectStatus} from '@store/slices/course';
import axios from 'axios';
import styles from './LessonMainView.module.sass';
import {fetchCreateComment, fetchDocDownload, fetchGetComments} from "@store/slices/course/AsyncThunks";
import {Button} from "@components/Button/Button";
import {RatingStars} from "@modules/LessonMainViewModule/components/RatingStars/RatingStars";

export const LessonMainViewChildren: FC<{ id: string }> = ({id}) => {
    const lesson = useAppSelector((state) => selectLesson(state, id));
    const [comment, setComment] = useState('');
    const comments = useAppSelector(selectComments);
    const status = useAppSelector(selectStatus);
    const [countStars, setCountStars] = useState(4.5);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGetComments(lesson?.id))
    }, [])

    const sendComment = async () => {
        dispatch(fetchCreateComment({
            id, data: {
                text: comment,
                rating: countStars.toString()
            }
        }))
    }

    const docDownload = async () => {
        dispatch(fetchDocDownload(lesson?.srcDoc[0].id))
    }

    return (
        <div className={styles.container}>
            <h2>{lesson.title}</h2>
            <p>{lesson.description}</p>
            <span>{lesson.createdAt}</span>
            {
                lesson.srcVideo && <video width={'600px'} height={'300px'} controls={true}
                                          src={`http://localhost:6789/api/v1/courses/video/${lesson.id}`}/>
            }
            <input placeholder={'Введите свой комментарий'} value={comment} onChange={(e) => {
                setComment(e.target.value)
            }}/>
            {
                lesson.srcDoc && <a href={`http://localhost:6789/uploads/${lesson?.srcDoc[0].src}`} download>Скачать документ</a>
            }
            <RatingStars count={countStars} cb={e => setCountStars(e)} isWorking big />
            <Button onClick={sendComment}>Отправить</Button>
            <div className={styles.wrapper__comments}>
                {
                    comments?.map((comment) => {
                        return <div key={comment.id} className={styles.comment}>
                            <span>{comment.user.fio}</span>
                            <span>{comment.text}</span>
                            <span>{comment.rating}</span>
                        </div>
                    })
                }
            </div>
        </div>
    );
};