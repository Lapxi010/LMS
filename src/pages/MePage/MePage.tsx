import React, {FC, useState} from 'react';
import styles from './MePage.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectActivatedUrl, selectUser} from '@store/slices/auth';
import {updateUser} from '@store/slices/auth/AsyncThunks';
import {BlockInput} from '@pages/MePage/BlockInput/BlockInput';
import {Header} from "@modules/Header/Header";

export const MePage: FC = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const [fio, setFio] = useState(user?.fio);
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phone);
	const activated = useAppSelector(selectActivatedUrl);

	const saveChange = () => {
		if (fio !== user?.fio){
			dispatch(updateUser({fio}));
		}
	};

	return (
		<div className={styles.root}>
			<Header>Профиль</Header>
			<div>
				<BlockInput value={fio} setValue={setFio} saveChange={saveChange}/>
				<h3>{user?.role}</h3>
				<BlockInput value={email} setValue={setEmail} saveChange={saveChange}/>
				{activated ? <p>Активирован</p> : <p>Не активирован, проверьте свою почту пожалуйтса</p>}
				<BlockInput value={phone} setValue={setPhone} saveChange={saveChange}/>
			</div>
		</div>
	);
};
