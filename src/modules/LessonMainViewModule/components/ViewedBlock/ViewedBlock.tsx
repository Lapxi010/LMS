import {Button} from "@components/Button/Button";
import styles from "./ViewedBlock.module.sass";
import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectMemberForCourse, selectViewForLesson} from "@store/slices/course";
import {fetchVisitedLesson} from "@store/slices/course/AsyncThunks";

export const ViewedBlock: FC<{ lesson: any, id: string }> = ({lesson, id}) => {
    const dispatch = useAppDispatch();
    const member = useAppSelector((state) => selectMemberForCourse(state, lesson?.courseId));
    const viewed = useAppSelector((state) => selectViewForLesson(state, lesson?.courseId, id));

    const visitedLesson = async () => {
        dispatch(fetchVisitedLesson({
            lessonId: lesson?.id,
            memberId: member?.id,
        }))
    }

    return (
        <>
            {!viewed && <Button className={styles.btn} onClick={visitedLesson}>посетить</Button>}
        </>
    )
}