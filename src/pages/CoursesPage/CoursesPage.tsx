import React, {FC, useState} from 'react';
import styles from './CoursesPage.module.sass';
import {Header} from "@components/Header/Header";
import {CreateCourse} from "@components/Course/CreateCourse/CreateCourse";
import {CoursesList} from "@components/Course/CoursesList/CoursesList";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectRole} from "@store/slices/auth";

export const CoursesPage: FC = () => {
    const role = useAppSelector(selectRole)

    return (
        <div className={styles.container}>
            <Header>Курсы</Header>
            <CoursesList/>
            {role === 'teacher' && <CreateCourse/>}
        </div>
    );
};
