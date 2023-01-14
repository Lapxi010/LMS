import React, {FC} from 'react';
import styles from './CoursesPage.module.sass';
import {Header} from "@components/Header/Header";

export const CoursesPage: FC = () => {
    return (
        <div className={styles.container}>
            <Header>Курсы</Header>
            <h1>Courses</h1>
        </div>
    );
};
