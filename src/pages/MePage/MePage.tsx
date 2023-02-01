import React, {FC, useState} from 'react';
import styles from './MePage.module.sass';
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectUser} from "@store/slices/auth";
import {updateUser} from "@store/slices/auth/AsyncThunks";
import {BlockInput} from "@pages/MePage/BlockInput/BlockInput";

export const MePage: FC = () => {
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const [fio, setFio] = useState(user?.fio)
	const [email, setEmail] = useState(user?.email)
	const [phone, setPhone] = useState(user?.phone)

	const saveChange = () => {
		if (fio !== user?.fio){
			dispatch(updateUser({fio}))
		}
	}

	return (
		<div className={styles.root}>
			<div>
				<BlockInput value={fio} setValue={setFio} saveChange={saveChange}/>
				<h3>{user?.role}</h3>
				<BlockInput value={email} setValue={setEmail} saveChange={saveChange}/>
				<BlockInput value={phone} setValue={setPhone} saveChange={saveChange}/>
			</div>
		</div>
	);
};
