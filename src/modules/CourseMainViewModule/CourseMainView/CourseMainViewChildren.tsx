import React, {FC} from 'react';
import styles from './CourseMainView.module.sass';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {useNavigate} from 'react-router-dom';
import {Button} from '@components/Button/Button';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectStatus, selectThisCourse} from '@store/slices/course';
import {selectEnterCourse} from "@store/slices/auth";
import {enterCourse} from "@store/slices/auth/AsyncThunks";
import {
    CourseInformationChildren
} from "@modules/CourseMainViewModule/components/CourseInformation/CourseInformationChildren";
import {ListLessons} from "@modules/CourseMainViewModule/components/ListLessons/ListLessons";

export const CourseMainViewChildren: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const course = useAppSelector(selectThisCourse);
    const courseEnter = useAppSelector((state) => selectEnterCourse(state, course?.id));

    const enterCourseA = async () => {
        await dispatch(enterCourse({idCourse: course?.id}))
    }

    return (
        <>
            {
                status === 'loading'
                    ?
                    <Spinner className={styles.wrapper__spinner}/>
                    :
                    <>
                        {
                            course &&
                            <>
                                <CourseInformationChildren id={course.id} titleImg={course.titleImg} title={course.title} description={course.description}
                                                          dataCreate={course.createdAt}/>
                            </>
                        }
                        {
                            !courseEnter ?
                                <div className={styles.wrapper}>
                                    <div className={styles.blur}>
                                        <Button className={styles.blur__btn} onClick={enterCourseA}>Вступить</Button>
                                    </div>
                                    {course && <ListLessons lessons={course.lessons}/>}
                                </div>
                                :
                                (
                                    course && <ListLessons lessons={course.lessons}/>
                                )
                        }
                    </>
            }
        </>
    );
};