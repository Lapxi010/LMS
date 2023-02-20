import React, {FC} from 'react';
import styles from "@pages/CoursePages/CreateLessonPage/CreateLessonPage.module.sass";
import {Header} from "@modules/Header/Header";
import {CreateTestLessonView} from "@modules/CreateTestLessonModule/CreateTestLessonView/CreateTestLessonView";
import {useParams} from "react-router-dom";
export const CreateTestPage = () => {
    const {id} = useParams();

    return (
        <div className={styles.container}>
            <Header>Создание теста</Header>
            <CreateTestLessonView id={id}/>
        </div>
    );
}