import React, {FC, useEffect, useRef, useState} from "react";
import styles from './ChatBox.module.sass';
import axios from "axios";
import {classNames} from '@utils/classNames.js'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(ru)

export const ChatBox: FC<{ chat: any, online: any, currentUser: any, setSendMessage: any, receivedMessage: any }> = ({
                                                                                                                         chat,
                                                                                                                         online,
                                                                                                                         setSendMessage,
                                                                                                                         receivedMessage,
                                                                                                                         currentUser
                                                                                                                     }) => {


    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const timeAgo = new TimeAgo('ru-RU')
    const scroll = useRef();

    const handleChange = (newMessage) => {
        setNewMessage(newMessage.target.value)
    }

    // Получение пользователь из чата

    useEffect(() => {
        const userId = chat?.users?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const {data} = await axios.get(`http://localhost:6789/api/v1/users/user/${userId.userId}`);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    // Получение сообщений

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await axios.get(`http://localhost:6789/api/v1/messages/${chat.id}`);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    // Скролл до последнего сообщения
    useEffect(() => {
        // @ts-ignore
        scroll.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    // Отправка сообщений

    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat.id,
        }
        const receiverId: any = chat.users.find((id) => id.userId !== currentUser);
        try {
            const {data} = await axios.post(`http://localhost:6789/api/v1/messages`, message);
            setSendMessage({...data, receiverId: receiverId.userId})
            setMessages([...messages, data]);
            setNewMessage("");
        } catch {
            console.log("error")
        }

    }

    // Получение сообщений от собеседника

    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat.id) {
            setMessages([...messages, receivedMessage]);
        }
    }, [receivedMessage])

    return (
        <>
            {chat ? (
                <div className={styles.root}>
                    <div className={styles.header}>
                        <div className={styles.header__wrapper}>
                            <div className={styles.img}></div>
                            <div className={styles.description}>
                                <p className={styles.header__text}>{userData?.fio}</p>
                                <span className={styles.status}>
                                <div className={online(chat) ? styles.online : styles.offline}></div>
                                    {online(chat) ? 'В сети' : 'Не в сети'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {messages.map((message) => (
                            <div key={message.id} ref={scroll}
                                 className={
                                     message.senderId === currentUser
                                         ? classNames(styles.message, styles.own)
                                         : styles.message
                                 }>
                                <span>{message.text}</span>
                                <span>{timeAgo.format(Date.parse(message.createdAt))}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.sender}>
                        <input
                            type={'text'}
                            value={newMessage}
                            onChange={handleChange}
                            placeholder={'Наберите сообщение'}
                            className={styles.input}
                        />
                        <button className={styles.btn} onClick={handleSend}>Отправить</button>
                    </div>
                </div>
            ) : (
                <span className={styles.wrapperEmpty}>
                    <span className={styles.wrapperEmpty__text}>Выберите чат для общения...</span>
                </span>
            )}
        </>
    );
};