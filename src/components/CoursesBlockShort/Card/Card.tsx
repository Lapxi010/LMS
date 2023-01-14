import React, {FC} from "react";
import styles from "./Card.module.sass";
//<span className={styles.text}>192/200 Финальная оценка</span>
export const Card: FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.logo}></div>
            <div className={styles.wrapper}>
                <p className={styles.title}>Экономика</p>
                <div className={styles.desc}>
                    <span className={styles.text}>120 Часов просмотрено</span>
                    <div className={styles.progress}>
                        <span>20%</span>
                        <div className={styles.progress__bar}>
                            <div className={styles.progress__bar__active}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.inform}>
                <span className={styles.inform__block}>Завершен</span>
            </div>
        </div>
    );
}
