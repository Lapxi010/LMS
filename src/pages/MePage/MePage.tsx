import React, {FC} from 'react';
import styles from './MePage.module.sass';
import {Header} from "@modules/Header/Header";
import {MeMainView} from "@modules/MeMainViewModule";

export const MePage: FC = () => {
	return (
		<div className={styles.root}>
			<Header>Профиль</Header>
			<MeMainView/>
		</div>
	);
};
