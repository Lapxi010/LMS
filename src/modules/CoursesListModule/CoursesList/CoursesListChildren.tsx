import React, {FC, useEffect, useState} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourses, selectStatus} from '@store/slices/courses/selectors';
import {fetchCourses} from '@store/slices/courses/AsyncThunks';
import {CoursesItemTeacher} from '@modules/CoursesListModule/components/CoursesItem/CoursesItemTeacher';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {Button} from "@components/Button/Button";
import {CoursesItemChildren} from "@modules/CoursesListModule/components/CoursesItem/CoursesItemChildren";

export const CoursesListChildren: FC = () => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const [input, setInput] = useState<string>('');
    const [stateSearch, setStateSearch] = useState<string>('all');
    const courses = useAppSelector((state) => selectCourses(state, stateSearch));
    useEffect(() => {
        dispatch(fetchCourses);
    }, []);

    const coursesList = courses?.filter((v) => {
        let title = v.title.toLowerCase();
        let cond = input.toLowerCase();
        if (cond.length > title.length) return false;
        if (cond.slice(0, cond.length) === title.slice(0, cond.length)) return true;
    })


    return (
        <>
            {status === 'loading' && <Spinner className={styles.wrapper__spinner}/>}
            {status !== 'loading' &&
                <div className={styles.root}>
                    <div className={styles.controls}>
                        <div className={styles.btns}>
                            <Button className={styles.btn} onClick={() => {
                                setStateSearch('all')
                            }}>Все курсы</Button>
                            <Button className={styles.btn} onClick={() => {
                                setStateSearch('my')
                            }}>Мои курсы</Button>
                        </div>
                        <input onChange={(e) => {
                            setInput(e.target.value)
                        }} value={input} className={styles.input} type="text" placeholder={'Поиск курсов'}/>
                    </div>
                    <div className={styles.wrapper}>
                        {coursesList?.length === 0 ? <div className={styles.wrapper__empty}>Ничего не найдено</div> :
                            coursesList?.map(item =>
                                <CoursesItemChildren
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    titleImg={item.titleImg}
                                    shortDesc={item.shortDesc}
                                    fioTeacher={item.author?.fio}
                                    TitleImg={item.author?.TitleImg}
                                    date={item.createdAt}
                                />)}
                    </div>
                </div>
            }
        </>
    )
        ;
};