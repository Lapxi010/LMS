import React, {FC} from 'react';
import styles from './SettingsPage.module.sass';
import {Header} from '@components/Header/Header';

export const SettingsPage: FC = () => {
	return (
		<div className={styles.settings}>
			<Header>Настройки</Header>
			<h1>Settings</h1>
		</div>
	);
};
