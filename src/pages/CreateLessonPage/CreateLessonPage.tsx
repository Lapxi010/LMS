import React, {FC, useEffect} from "react";
import styles from './CreateLessonPage.module.sass'
import {Header} from "@components/Header/Header";
import {useParams} from "react-router-dom";

export const CreateLessonPage: FC = () => {
    const {id} = useParams();

    useEffect(() => {

    }, [id])

    return (
        <div className={styles.container}>
            <Header>Курс</Header>

        </div>
    )
}