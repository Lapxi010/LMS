import React, {FC} from 'react';
import styles from './ListLessons.module.sass';
import {NavLink, useNavigate} from "react-router-dom";

export const ListLessons: FC<{ lessons: any }> = ({lessons}) => {
    const navigate = useNavigate();
    const formatDate = (date: string) => {
        return date.slice(8, 10) + '-'
            + date.slice(5, 7) + '-' + date.slice(0, 4) + '   ' + date.slice(11, 13) + ':' + date.slice(14, 16)
    }

    return (
        <div className={styles.root}>
            {lessons.map((v, index) =>
                <div className={styles.block} key={v.id} onClick={() => {
                    navigate(`../../lesson/${v.id}`)
                }}>
                    <h4 className={styles.title}>{index + 1}. {v.title}</h4>
                    <span>{formatDate(v.createdAt)}</span>
                </div>)
            }
        </div>
    )
}