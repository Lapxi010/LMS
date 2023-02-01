import React, {FC} from 'react';
import styles from './DashboardPage.module.sass';
import {SliderNews} from '@modules/SliderNewsModule/SliderNews';
import {CoursesBlockShort} from '@components/CoursesBlockShort/CoursesBlockShort';
import {ProgressGraph} from '@modules/ProgressGraph/ProgressGraph';
import {Header} from '@modules/Header/Header';

export const DashboardPage: FC = () => {
	return (
		<div className={styles.root}>
			<Header>Главная</Header>
			<SliderNews/>
			<div className={styles.wrapper}>
				<CoursesBlockShort/>
				<ProgressGraph/>
			</div>
		</div>
	);
};
