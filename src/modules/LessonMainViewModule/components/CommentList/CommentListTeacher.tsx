import React, {FC, useEffect} from 'react';
import styles from './CommentList.module.sass';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectComments, selectStatusComment} from "@store/slices/course";
import {fetchDeleteComment, fetchGetComments} from "@store/slices/course/AsyncThunks";
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";
import {CommentItemTeacher} from "@modules/LessonMainViewModule/components/CommentItem/CommentItemTeacher";

export const CommentListTeacher: FC<{ id: string }> = ({id}) => {
    const comments = useAppSelector(selectComments);
    const dispatch = useAppDispatch();
    const commentStatus = useAppSelector(selectStatusComment);

    useEffect(() => {
        dispatch(fetchGetComments(id))
    }, [])

    const deleteComment = async (id: string) => {
        dispatch(fetchDeleteComment(id))
    }

    return (
        <>
            {commentStatus === 'loading' && <Spinner className={styles.spinner}/>}
            {commentStatus != 'loading' &&
                <div className={styles.root}>
                    {
                        comments?.map((comment) => {
                            return <CommentItemTeacher key={comment?.id} fio={comment?.user?.fio} date={comment?.createdAt}
                                                        rating={comment?.rating}
                                                        text={comment?.text}
                                                        cb={() => {deleteComment(comment?.id)}}
                            />
                        })
                    }
                </div>
            }
        </>
    )
}