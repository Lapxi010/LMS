import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './ChatPage.module.sass';
import {Header} from '@modules/Header/Header';
import { io } from "socket.io-client";
import {useAppSelector} from "@hooks/HookRedux";
import {selectUser} from "@store/slices/auth";
import axios from "axios";
import {ChatBox} from "@pages/ChatPage/ChatBox";

export const ChatPage: FC = () => {
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
				const { data } = await axios.get(`http://localhost:6789/api/v1/chat/${user?.id}`);
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
			setOnlineUsers(users);
		});

	}, [user]);


	useEffect(() => {
		if (sendMessage!==null) {
			socket.current.emit("send-message", sendMessage);
		}
	}, [sendMessage]);


	useEffect(() => {
		socket.current.on("recieve-message", (data) => {
			console.log(data)
				setReceivedMessage(data);
			});
	}, []);

	const checkOnlineStatus = (chat) => {
		const chatMember = chat.users.find((member) => member.id !== user.id);
		const online = onlineUsers.find((user) => user.userId === chatMember);
		return online ? true : false;
	};

	return (
		<div className={styles.root}>
			<Header>Чат</Header>
			<h1>Chat</h1>
			<div className={styles.chat}>
				<div className={styles.leftSide}>
					{
						chats && chats?.map((chat) => (
							<div onClick={()=>{setCurrentChat(chat)}}>
								{chat.id}
							</div>
						))
					}
				</div>
				<div className={styles.rightSide}>
					<ChatBox chat={currentChat} currentUser={user.id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
				</div>
			</div>
		</div>
	);
};
