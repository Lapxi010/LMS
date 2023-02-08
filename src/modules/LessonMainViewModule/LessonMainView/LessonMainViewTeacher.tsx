import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectLesson} from '@store/slices/course';
import axios from 'axios';
import styles from './LessonMainView.module.sass';
import {fetchGetComments} from "@store/slices/course/AsyncThunks";
import {CommentListTeacher} from "@modules/LessonMainViewModule/components/CommentList/CommentListTeacher";
import {Button} from "@components/Button/Button";
import {UploaderVideo} from "@modules/LessonMainViewModule/components/UploaderVideo/UploaderVideo";

export const LessonMainViewTeacher: FC<{ id: string }> = ({id}) => {
    const lesson = useAppSelector((state) => selectLesson(state, id));
    const dispatch = useAppDispatch();

    const formatDate = lesson?.createdAt.slice(8, 10) + '-'
        + lesson?.createdAt.slice(5, 7) + '-' + lesson?.createdAt.slice(0, 4) + '   ' + lesson?.createdAt.slice(11, 13) + ':' + lesson?.createdAt.slice(14, 16)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{lesson.title}</h2>
            </div>
            <div className={styles.wrapper__video}>
                {
                    lesson.srcVideo ?
                        <video className={styles.video} controls={true}
                                             src={`http://localhost:6789/api/v1/courses/video/${lesson.id}`}/>
                        :
                        <div className={styles.uploader}>
                            <UploaderVideo id={lesson?.id}/>
                        </div>
                }
            </div>
            <div className={styles.description}>
                <p>{lesson.description}</p>
                <div className={styles.description__wrapper}>
                    <span>{formatDate}</span>
                </div>
            </div>
            <CommentListTeacher id={lesson?.id}/>
        </div>
    );
};