import React, {FC, useEffect, useState} from 'react';
import styles from './CoursesList.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectCourses, selectStatus} from '@store/slices/courses/selectors';
import {fetchCourses} from '@store/slices/courses/AsyncThunks';
import {CoursesItem} from '@modules/CoursesListModule/components/CoursesItem/CoursesItem';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {Button} from "@components/Button/Button";

export const CoursesList: FC = () => {
    const courses = useAppSelector(selectCourses);
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        dispatch(fetchCourses);
    }, []);

    return (
        <>
        {status === 'loading' && <Spinner className={styles.wrapper__spinner}/>}
        {status !== 'loading' &&
            <div className={styles.root}>
                <div className={styles.controls}>
                    <div className={styles.btns}>
                        <Button className={styles.btn}>Все курсы</Button>
                        <Button className={styles.btn}>Мои курсы</Button>
                    </div>
                    <input onChange={(e) => {
                        setInput(e.target.value)
                    }} value={input} className={styles.input} type="text" placeholder={'Поиск курсов'}/>
                </div>
                <div className={styles.wrapper}>
                    {courses?.filter((v) => {
                        let title = v.title.toLowerCase();
                        let cond = input.toLowerCase();
                        if (cond.length > title.length) return false;
                        if (cond.slice(0, cond.length) === title.slice(0, cond.length)) return true;
                    }).map(item =>
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