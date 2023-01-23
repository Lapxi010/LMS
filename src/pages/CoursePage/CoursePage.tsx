import React, {FC, useEffect, useState} from 'react';
import styles from './CoursePage.module.sass';
import {Header} from '@components/Header/Header';
import { useParams } from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';

export const CoursePage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();

	useEffect(()=>{

	},[]);

	return (
		<div className={styles.container}>
			<Header>Курс</Header>
		</div>
	);
};
