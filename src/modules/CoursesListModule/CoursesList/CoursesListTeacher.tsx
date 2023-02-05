import React, {FC, useEffect, useState} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourseForTeacher, selectCourses, selectStatus} from '@store/slices/courses/selectors';
import {fetchCourses} from '@store/slices/courses/AsyncThunks';
import {CoursesItem} from '@modules/CoursesListModule/components/CoursesItem/CoursesItem';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
export const CoursesListTeacher: FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const [input, setInput] = useState<string>('');
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
                                <CoursesItem
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