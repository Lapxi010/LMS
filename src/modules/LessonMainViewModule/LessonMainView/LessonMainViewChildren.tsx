import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {
    selectLesson,
    selectMemberForCourse,
    selectStatus,
    selectViewForLesson
} from '@store/slices/course';
import styles from './LessonMainView.module.sass';
import {
    fetchDocDownload,
    fetchVisitedLesson
} from "@store/slices/course/AsyncThunks";
import {CommentInputForm} from "@modules/LessonMainViewModule/components/CommentInputForm/CommentInputForm";
import {CommentList} from "@modules/LessonMainViewModule/components/CommentList/CommentList";
import {Button} from "@components/Button/Button";


export const LessonMainViewChildren: FC<{ id: string }> = ({id}) => {
    const lesson = useAppSelector((state) => selectLesson(state, id));
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    const member = useAppSelector((state) => selectMemberForCourse(state, lesson?.courseId));
    const viewed = useAppSelector((state) => selectViewForLesson(state, lesson?.courseId, id));

    const formatDate = lesson?.createdAt.slice(8, 10) + '-'
        + lesson?.createdAt.slice(5, 7) + '-' + lesson?.createdAt.slice(0, 4) + '   ' + lesson?.createdAt.slice(11, 13) + ':' + lesson?.createdAt.slice(14, 16)

    const docDownload = async () => {
        dispatch(fetchDocDownload(lesson?.srcDoc[0].id))
    }

    const visitedLesson = async () => {
        dispatch(fetchVisitedLesson({
            lessonId: lesson?.id,
            memberId: member?.id,
        }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{lesson.title}</h2>
                {!viewed && <Button className={styles.btn} onClick={visitedLesson}>посетить</Button>}
            </div>
            {
                lesson.srcVideo && <video className={styles.video} controls={true}
                                          src={`http://localhost:6789/api/v1/courses/video/${lesson.id}`}/>
            }
            <div className={styles.description}>
                <p>{lesson.description}</p>
                <div className={styles.description__wrapper}>
                    <span>{formatDate}</span>
                </div>
            </div>
            <CommentInputForm id={id}/>
            <CommentList id={lesson?.id}/>
        </div>
    );
};

{/*{*/}
{/*    lesson.srcDoc && <a href={`http://localhost:6789/uploads/${lesson?.srcDoc[0].src}`} download>Скачать документ</a>*/}
{/*}*/}