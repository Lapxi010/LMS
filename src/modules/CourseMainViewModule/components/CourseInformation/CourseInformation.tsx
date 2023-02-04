import React, {FC} from 'react';
import styles from './CourseInformation.module.sass';

export const CourseInformation: FC<{ title: string, description: string, dataCreate: string }> = ({
                                                                                                      title,
                                                                                                      description,
                                                                                                      dataCreate
                                                                                                  }) => {
    const date = dataCreate.slice(8, 10) + '-' + dataCreate.slice(5, 7) + '-' + dataCreate.slice(0, 4)

    return (
        <div className={styles.root}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.wrapper__text}>
                <p>{description}</p>
            </div>
            <p className={styles.date}>{date}</p>
        </div>
    )
}