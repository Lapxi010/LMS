import React, {FC, useEffect, useRef, useState} from "react";
import styles from "./ChatMainView.module.sass";
import {useAppSelector} from "@hooks/HookRedux";
import {selectUser} from "@store/slices/auth";
import axios from "axios";
import {io} from "socket.io-client";
import {SearchUserBlock} from "@modules/ChatMainViewModule/components/SearchUserBlock/SearchUserBlock";
import {ChatBox} from "@modules/ChatMainViewModule/components/ChatBox/ChatBox";
import {BlockUser} from "@modules/ChatMainViewModule/components/BlockUser/BlockUser";


export const ChatMainView = () => {
    const socket: any = useRef();
    const user = useAppSelector(selectUser)
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = async () => {
            try {
                const {data} = await axios.get(`http://localhost:6789/api/v1/chat/${user?.id}`);
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        getChats();
    }, [user.id]);


    useEffect(() => {
        socket.current = io("ws://localhost:6789");
        socket.current.emit("new-user-add", user.id);
        socket.current.on("get-users", (users) => {
            const getOnlineUsers = async () => {
                try {
                    let {data} = await axios.post(`http://localhost:6789/api/v1/users/getUsers`, {users: users})
                    setOnlineUsers(data)
                } catch (e) {
                    console.log(e)
                }
            }
            getOnlineUsers();
        });
    }, [user]);


    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            setReceivedMessage(data);
        });
    }, []);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat?.users?.find((member) => member.userId !== user.id);
        const online = onlineUsers?.find((user) => user.id === chatMember?.userId);
        return online ? true : false;
    };

    return (
        <div>
            <SearchUserBlock chats={chats} userId={user.id} setCurrentChat={setCurrentChat} setChats={setChats}/>
            <div className={styles.chat}>
                {
                    chats.length === 0
                        ?
                        (
                            <div className={styles.leftSide_empty}>
                                <span>У вас нет чатов</span>
                            </div>
                        )
                        :
                        (
                            <div className={styles.leftSide}>
                                {
                                    chats && chats?.map((chat) =>
                                        <BlockUser key={chat.id} cb={() => {
                                            setCurrentChat(chat)
                                        }}
                                                   currentUser={user.id}
                                                   online={checkOnlineStatus(chat)}
                                                   data={chat}/>
                                    )
                                }
                            </div>
                        )
                }
                <div className={styles.rightSide}>
                    <ChatBox online={checkOnlineStatus} chat={currentChat} currentUser={user.id}
                             setSendMessage={setSendMessage}
                             receivedMessage={receivedMessage}/>
                </div>
            </div>
        </div>
    )
}