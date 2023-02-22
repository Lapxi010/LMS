import React, {FC, useEffect, useState} from 'react';
import styles from './BlockUser.module.sass';
import axios from "axios";
export const BlockUser: FC<{currentUser: any, online: any, data: any, cb: any}> = ({currentUser, data, online, cb}) => {
    const [userData, setUserData] = useState(null)

    useEffect(()=> {

        const userId = data?.users?.find((id) => id.userId !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:6789/api/v1/users/user/${userId.userId}`);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    }, [])

    return (
        <div className={styles.root} onClick={cb}>
            {
                userData?.TitleImg != null
                    ?
                <img className={styles.logo} src={`http://localhost:6789/uploads/${userData?.TitleImg}`} alt="title"/>
                    :
                <div className={styles.img}></div>
            }
            <div className={styles.description}>
                <span className={styles.name}>{userData?.fio}</span>
                <span className={styles.status}>
                    <div className={online ? styles.online : styles.offline}></div>
                    {online ? 'В сети' : 'Не в сети'}</span>
            </div>
        </div>
    )
}