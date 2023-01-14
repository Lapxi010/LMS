import React, {FC} from "react";
import styles from "./ProgressGraph.module.sass";

export const ProgressGraph: FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <h3 className={styles.title}>Твой прогресс</h3>
                <button className={styles.filter}>
                    Отсортировать
                    <svg className={styles.filter__arrow} width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 5.90831L0.25 1.65831L1.01146 0.896851L4.5 4.38539L7.98854 0.896851L8.75 1.65831L4.5 5.90831Z"
                              fill="var(--main-card-text)"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
