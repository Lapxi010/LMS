import React, {FC} from 'react';
import styles from './CommentItem.module.sass';
import {RatingStars} from "@modules/LessonMainViewModule/components/RatingStars/RatingStars";
import {Button} from "@components/Button/Button";

export const CommentItemTeacher: FC<{ fio: string, text: string, rating: string, date: string, cb: any }> = ({
                                                                                                                 fio,
                                                                                                                 text,
                                                                                                                 rating,
                                                                                                                 date,
                                                                                                                 cb
                                                                                                             }) => {
    const formatDate = date.slice(8, 10) + '-'
        + date.slice(5, 7) + '-' + date.slice(0, 4) + '   ' + date.slice(11, 13) + ':' + date.slice(14, 16)

    return (
        <div className={styles.root}>
            <div className={styles.head}>
                <h3>{fio}</h3>
                <RatingStars isWorking={false} count={parseFloat(rating)}/>
            </div>
            <div className={styles.content}>
                <p>{text}</p>
                <div className={styles.wrapper__date}>
                    <span>{formatDate}</span>
                </div>
            </div>
            <Button onClick={cb} className={styles.btn__delete}>Удалить</Button>
        </div>
    )
}