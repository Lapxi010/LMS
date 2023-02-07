import React, {FC, useState} from 'react';
import styles from './CommentInputForm.module.sass';
import {RatingStars} from "@modules/LessonMainViewModule/components/RatingStars/RatingStars";
import {Button} from "@components/Button/Button";
import {fetchCreateComment} from "@store/slices/course/AsyncThunks";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectStatusComment} from "@store/slices/course";

export const CommentInputForm: FC<{id: string}> = ({id}) => {
    const dispatch = useAppDispatch();
    const [countStars, setCountStars] = useState(4.5);
    const [comment, setComment] = useState('');
    const statusComment = useAppSelector(selectStatusComment);

    const sendComment = async (e) => {
        e.preventDefault();
        dispatch(fetchCreateComment({
            id, data: {
                text: comment,
                rating: countStars.toString()
            }
        }))

        setComment('');
    }

    return (
        <div className={styles.root}>
            <form className={styles.form} onSubmit={sendComment}>
                <div className={styles.form__input}>
                    <textarea value={comment} onChange={(e) => {setComment(e.target.value)}} className={styles.input} placeholder="Ваш комментарий"/>
                </div>
                <div className={styles.form__additionally}>
                    <div className={styles.wrapper}>
                        <RatingStars cb={e => setCountStars(e)} big isWorking count={countStars}/>
                    </div>
                    <Button disabled={statusComment == 'loading' || comment.length < 3} type={'submit'} className={styles.form__additionally__button}>Отправить</Button>
                </div>
            </form>
        </div>
    )
}