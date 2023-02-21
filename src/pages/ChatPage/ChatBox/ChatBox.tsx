import React, {FC, useEffect, useRef, useState} from "react";
import styles from './ChatBox.module.sass';
import axios from "axios";
import {classNames} from '@utils/classNames.js'
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru'
import Picker from "@emoji-mart/react";

TimeAgo.addDefaultLocale(ru)

const smileIcon = () => {
    return (
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill={'var(--c-text)'} d="M626 523q22.5 0 38.25-15.75T680 469q0-22.5-15.75-38.25T626 415q-22.5 0-38.25 15.75T572 469q0 22.5 15.75 38.25T626 523Zm-292 0q22.5 0 38.25-15.75T388 469q0-22.5-15.75-38.25T334 415q-22.5 0-38.25 15.75T280 469q0 22.5 15.75 38.25T334 523Zm146 272q66 0 121.5-35.5T682 663H278q26 61 81 96.5T480 795Zm0 181q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-400Zm0 340q142.375 0 241.188-98.812Q820 718.375 820 576t-98.812-241.188Q622.375 236 480 236t-241.188 98.812Q140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z"/></svg>
    )
}

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
    const [showEmoji, setShowEmoji] = useState(false)
    const timeAgo = new TimeAgo('ru-RU')
    const scroll = useRef();
    const inputRef: any = useRef();

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

    const onSelect = ({native}) => {
        setNewMessage((text) => text + native)
        setShowEmoji(!showEmoji)
        inputRef.current.focus()
    }

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
                            ref={inputRef}
                            type={'text'}
                            value={newMessage}
                            onChange={handleChange}
                            placeholder={'Наберите сообщение'}
                            className={styles.input}
                        />
                        <div className={styles.container}>
                            <button
                                className={styles.btnEmoji}
                                type='button'
                                onClick={() => setShowEmoji(!showEmoji)}
                            >
                                {smileIcon()}
                            </button>
                            {showEmoji && (
                                <div className={styles.container__emoji}>
                                    <Picker
                                        onEmojiSelect={onSelect}
                                        emojiSize={20}
                                        showPreview={false}
                                        perLine={6}
                                        locale={'ru'}
                                    />
                                </div>
                            )}
                        </div>
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