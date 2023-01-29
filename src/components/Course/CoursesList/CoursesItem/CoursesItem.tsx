import React, {FC} from 'react';
import styles from './CoursesItem.module.sass';
import {useNavigate} from 'react-router-dom';

interface ICoursesItem {
    id: string,
    title: string,
    titleImg: string,
    shortDesc: string
}

export const CoursesItem: FC<ICoursesItem> = ({id, title, titleImg, shortDesc}) => {
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper} onClick={()=>{navigate(`../course/${id}`);}}>
			<div className={styles.course}>
				<h2 className={styles.course__title}>{title}</h2>
				<img className={styles.course__img} src={titleImg ? `http://localhost:6789/uploads/${titleImg}` : '#'} alt="logo_img"/>
				<h3 className={styles.course__title_short}>Короткое описание</h3>
				<p className={styles.course__description}>{shortDesc}</p>
			</div>
		</div>
	);
};