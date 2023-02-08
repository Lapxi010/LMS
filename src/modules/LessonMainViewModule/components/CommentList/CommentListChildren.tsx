import React, {FC, useEffect} from 'react';
import styles from './CommentList.module.sass';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectComments, selectStatusComment} from "@store/slices/course";
import {fetchGetComments} from "@store/slices/course/AsyncThunks";
import {CommentItemChildren} from "@modules/LessonMainViewModule/components/CommentItem/CommentItemChildren";
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";

export const CommentListChildren: FC<{ id: string }> = ({id}) => {
    const comments = useAppSelector(selectComments);
    const dispatch = useAppDispatch();
    const commentStatus = useAppSelector(selectStatusComment);

    useEffect(() => {
        dispatch(fetchGetComments(id))
    }, [])

    return (
        <>
            {commentStatus === 'loading' && <Spinner className={styles.spinner}/>}
            {commentStatus != 'loading' &&
                <div className={styles.root}>
                    {
                        comments?.map((comment) => {
                            return <CommentItemChildren key={comment.id} fio={comment.user.fio} date={comment.createdAt}
                                                        rating={comment.rating}
                                                        text={comment.text}/>
                        })
                    }
                </div>
            }
        </>
    )
}