import React, {FC} from 'react';
import styles from './CoursesItem.module.sass';
import {useNavigate} from 'react-router-dom';
import Stub from './Stub.png';
import Api from '@api/index'
interface ICoursesItem {
    id: string,
    title: string,
    titleImg: string,
    shortDesc: string
}

export const CoursesItemTeacher: FC<ICoursesItem> = ({id, title, titleImg, shortDesc}) => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper} onClick={()=>{navigate(`../course/${id}`);}}>
			<div className={styles.course}>
				<h2 className={styles.course__title}>{title}</h2>
				<img className={styles.course__img} src={titleImg != null ? `${Api.defaults.baseURL}uploads/${titleImg}` : Stub} alt="logo_img"/>
				<h3 className={styles.course__title_short}>Короткое описание</h3>
				<p className={styles.course__description}>{shortDesc}</p>
			</div>
		</div>
	);
};