import React, {FC, useEffect} from 'react';
import styles from './CommentList.module.sass';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectComments, selectStatusComment} from "@store/slices/course";
import {fetchGetComments} from "@store/slices/course/AsyncThunks";
import {CommentItem} from "@modules/LessonMainViewModule/components/CommentItem/CommentItem";
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";

export const CommentList: FC<{ id: string }> = ({id}) => {
    const comments = useAppSelector(selectComments);
    const dispatch = useAppDispatch();
    const commentStatus = useAppSelector(selectStatusComment);

    useEffect(() => {
        dispatch(fetchGetComments(id))
    }, [])

    return (
        <>
            {commentStatus === 'loading' && <Spinner className={styles.spinner}/>}
            <div className={styles.root}>
                {
                    comments?.map((comment) => {
                        return <CommentItem key={comment.id} fio={comment.user.fio} date={comment.createdAt} rating={comment.rating}
                                            text={comment.text}/>
                    })
                }
            </div>
        </>
    )
}