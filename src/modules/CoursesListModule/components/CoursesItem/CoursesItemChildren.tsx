import React, {FC} from 'react';
import styles from './CoursesItem.module.sass';
import {useNavigate} from 'react-router-dom';
import Stub from './Stub.png';
import Api from "@api/index";

interface ICoursesItem {
    id: string,
    title: string,
    titleImg: string,
    shortDesc: string,
    fioTeacher: string,
    date: string,
    TitleImg: string
}

export const CoursesItemChildren: FC<ICoursesItem> = ({id, title, titleImg, shortDesc,fioTeacher,date, TitleImg}) => {
    const navigate = useNavigate();

    const dateRefactor = date.slice(8, 10) + '-'
        + date.slice(5, 7) + '-' + date.slice(0, 4) + '   ' + date.slice(11, 13) + ':' + date.slice(14, 16)

    return (
        <div className={styles.wrapper} onClick={()=>{navigate(`../course/${id}`);}}>
            <div className={styles.course}>
                <h2 className={styles.course__title}>{title}</h2>
                <img className={styles.course__img} src={titleImg != null ? `${Api.defaults.baseURL}uploads/${titleImg}` : Stub} alt="logo_img"/>
                <h3 className={styles.course__title_short}>Короткое описание</h3>
                <p className={styles.course__description}>{shortDesc}</p>
                <div className={styles.course__teacher}>
                    {
                        TitleImg != null
                            ?
                            <img className={styles.logo} src={`${Api.defaults.baseURL}uploads/${TitleImg}`} alt="title"/>
                            :
                            <div className={styles.img}></div>
                    }
                    <h3 className={styles.course__title_short}>{fioTeacher}</h3>
                    <span>{dateRefactor}</span>
                </div>
            </div>
        </div>
    );
};