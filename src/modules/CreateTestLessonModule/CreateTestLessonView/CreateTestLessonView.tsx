import React, {FC} from "react";
import styles from "./CreateTestLessonView.module.sass";
export const CreateTestLessonView: FC<{id: string}> = ({id}) => {
    return (
        <div className={styles.root}>
            <h3>Добавить вопрос</h3>
            <form className={styles.form}>
               <div className={styles.block}>
                   <label>Вопрос</label>
                   <input type="text"/>
               </div>
                <div className={styles.block}>
                    <label>Ответ</label>
                    <input type="text"/>
                </div>
            </form>
        </div>
    )
}