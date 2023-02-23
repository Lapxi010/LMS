import React, {FC, useEffect, useState} from 'react';
import styles from './BlockUser.module.sass';
import Api from "@api/index";
export const BlockUser: FC<{currentUser: any, online: any, data: any, cb: any}> = ({currentUser, data, online, cb}) => {
    const [userData, setUserData] = useState(null)

    useEffect(()=> {

        const userId = data?.users?.find((id) => id.userId !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await Api.get(`users/user/${userId.userId}`);
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
                <img className={styles.logo} src={`${Api.defaults.baseURL}uploads/${userData?.TitleImg}`} alt="title"/>
                    :
                <div className={styles.img}></div>
            }
            <div className={styles.description}>
                <span className={styles.name}>{userData?.fio}</span>
                <span className={styles.role}>{userData?.role === 'teacher' ? 'учитель' : 'ученик'}</span>
                <span className={styles.status}>
                    <div className={online ? styles.online : styles.offline}></div>
                    {online ? 'В сети' : 'Не в сети'}</span>
            </div>
        </div>
    )
}