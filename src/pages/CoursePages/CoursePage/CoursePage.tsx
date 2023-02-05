import React, {FC, useEffect, useState} from 'react';
import styles from './CoursePage.module.sass';
import {Header} from '@modules/Header/Header';
import {useParams,} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {fetchCourse} from '@store/slices/course/AsyncThunks';
import {CourseMainViewChildren, CourseMainViewTeacher} from '@modules/CourseMainViewModule';
import {selectRole} from "@store/slices/auth";

export const CoursePage: FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const role = useAppSelector(selectRole)

    useEffect(() => {
        dispatch(fetchCourse(id));
    }, [id]);


    return (
        <div className={styles.container}>
            <Header>Курс</Header>
            {role === 'children' ? <CourseMainViewChildren/> : <CourseMainViewTeacher/>}
        </div>
    );
};
