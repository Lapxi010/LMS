import React, {FC, useState} from 'react';
import styles from './CourseMainView.module.sass';
import {Spinner} from '@components/PreLoaders/Spinner/Spinner';
import {NavLink, useNavigate} from 'react-router-dom';
import {Button} from '@components/Button/Button';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectStatus, selectThisCourse} from '@store/slices/course';
import {CourseInformation} from "@modules/CourseMainViewModule/components/CourseInformation/CourseInformation";
import {UploadOrViewImageChildren} from "@modules/CourseMainViewModule/components/UploadOrViewImage/UploadOrViewImageChildren";
import {selectEnterCourse, selectRole} from "@store/slices/auth";
import {enterCourse} from "@store/slices/auth/AsyncThunks";
import {
    UploadOrViewImageTeacher
} from "@modules/CourseMainViewModule/components/UploadOrViewImage/UploadOrViewImageTeacher";

export const CourseMainViewTeacher: FC = () => {
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
                                <CourseInformation title={course.title} description={course.description}
                                                   dataCreate={course.createdAt}/>
                                <UploadOrViewImageTeacher id={course.id} src={course.titleImg}/>
                            </>
                        }
                        {
                            course &&
                            <div>
                                    {course.lessons.map(v => <div key={v.id}>
                                        <NavLink to={`../../lesson/${v.id}`}>
                                            {v.title}
                                        </NavLink>
                                    </div>)
                                    }
                            </div>
                        }
                        <Button onClick={() => navigate(`../../createLesson/${course.id}`)}>Добавить урок</Button>
                    </>
            }
        </>
    );
};