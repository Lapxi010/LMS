import React, {FC, useEffect, useRef, useState} from "react";
import axios from "axios";


export const ChatBox: FC<{ chat: any, currentUser: any, setSendMessage: any, receivedMessage: any }> = ({
                                                                                                       chat,
                                                                                                       setSendMessage,
                                                                                                       receivedMessage,
                                                                                                       currentUser
                                                                                                   }) => {


    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage)=> {
        setNewMessage(newMessage.target.value)
    }

    useEffect(() => {
        const userId = chat?.users?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:6789/api/v1/users/user/${userId}`);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`http://localhost:6789/api/v1/messages/${chat.id}`);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    const handleSend = async(e)=> {
        e.preventDefault()
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId: chat.id,
        }
        const receiverId: any = chat.users.find((id)=>id.userId!==currentUser);

        // send message to socket server
        setSendMessage({...message, receiverId: receiverId.userId})
        // send message to database
        try {
            const { data } = await axios.post(`http://localhost:6789/api/v1/messages`, message);
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch
        {
            console.log("error")
        }
    }

    useEffect(()=> {
        if (receivedMessage !== null && receivedMessage.chatId === chat.id) {
            setMessages([...messages, receivedMessage]);
        }

    },[receivedMessage])


    const scroll = useRef();
    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div>
                                    <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.fio}
                    </span>
                                    </div>
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body" >
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll}
                                         className={
                                             message.senderId === currentUser
                                                 ? "message own"
                                                 : "message"
                                         }
                                    >
                                        <span>{message.text}</span>{" "}
                                        <span>{message.createdAt}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat-sender */}
                        <div className="chat-sender">
                            <div className="send-button button" onClick = {handleSend}>Send</div>
                            <input
                                type={'text'}
                                value={newMessage}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
                )}
            </div>
        </>
    );
};