import React, {FC} from 'react';
import styles from './ChatPage.module.sass';
import {Header} from '@modules/Header/Header';

export const ChatPage: FC = () => {
	return (
		<div className={styles.chat}>
			<Header>Чат</Header>
			<h1>Chat</h1>
		</div>
	);
};
