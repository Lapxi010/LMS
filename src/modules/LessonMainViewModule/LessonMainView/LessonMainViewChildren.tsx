import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {
    selectLesson,
    selectStatus,
} from '@store/slices/course';
import styles from './LessonMainView.module.sass';
import {
    fetchDocDownload,
} from "@store/slices/course/AsyncThunks";
import {CommentInputForm} from "@modules/LessonMainViewModule/components/CommentInputForm/CommentInputForm";
import {CommentListChildren} from "@modules/LessonMainViewModule/components/CommentList/CommentListChildren";
import {ViewedBlock} from "@modules/LessonMainViewModule/components/ViewedBlock/ViewedBlock";
import Api from '@api/index'

export const LessonMainViewChildren: FC<{ id: string }> = ({id}) => {
    const lesson = useAppSelector((state) => selectLesson(state, id));
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();

    const formatDate = lesson?.createdAt.slice(8, 10) + '-'
        + lesson?.createdAt.slice(5, 7) + '-' + lesson?.createdAt.slice(0, 4) + '   ' + lesson?.createdAt.slice(11, 13) + ':' + lesson?.createdAt.slice(14, 16)

    const docDownload = async () => {
        dispatch(fetchDocDownload(lesson?.srcDoc[0].id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{lesson.title}</h2>
                <ViewedBlock id={id} lesson={lesson}/>
            </div>
            {
                lesson.srcVideo &&
                <div className={styles.wrapper__video}>
                    <video className={styles.video} controls={true}
                           src={`${Api.defaults.baseURL}courses/video/${lesson?.srcVideo}`}/>
                </div>
            }
            <div className={styles.description}>
                <p>{lesson.description}</p>
                <div className={styles.description__wrapper}>
                    <span>{formatDate}</span>
                </div>
            </div>
            <CommentInputForm id={id}/>
            <CommentListChildren id={lesson?.id}/>
        </div>
    );
};

{/*{*/}
{/*    lesson.srcDoc && <a href={`http://localhost:6789/uploads/${lesson?.srcDoc[0].src}`} download>Скачать документ</a>*/}
{/*}*/}