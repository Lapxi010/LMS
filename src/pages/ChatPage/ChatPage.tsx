import React, {FC} from 'react';
import styles from './ChatPage.module.sass';
import {Header} from '@modules/Header/Header';
import {ChatMainView} from "@modules/ChatMainViewModule";

export const ChatPage: FC = () => {
    return (
        <div className={styles.root}>
            <Header>Чат</Header>
            <ChatMainView/>
        </div>
    );
};