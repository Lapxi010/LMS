import React, {FC, useEffect} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourseForTeacher, selectStatus} from '@store/slices/courses/selectors';
import {fetchCourses} from '@store/slices/courses/AsyncThunks';
import {CoursesItemTeacher} from '@modules/CoursesListModule/components/CoursesItem/CoursesItemTeacher';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
export const CoursesListTeacher: FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const courses = useAppSelector(selectCourseForTeacher);

    useEffect(() => {
        dispatch(fetchCourses);
    }, []);

    return (
        <>
            {status === 'loading' && <Spinner className={styles.wrapper__spinner}/>}
            {status !== 'loading' &&
                <div className={styles.root}>
                    <div className={styles.wrapper}>
                        {courses?.length === 0 ? <div className={styles.wrapper__empty}>Ничего не найдено</div> :
                            courses?.map(item =>
                                <CoursesItemTeacher
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    titleImg={item.titleImg}
                                    shortDesc={item.shortDesc}
                                />)}
                    </div>
                </div>
            }
        </>
    )
        ;
};