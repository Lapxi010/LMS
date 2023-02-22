import React, {FC, useState} from 'react';
import styles from './MePage.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {selectActivatedUrl, selectUser} from '@store/slices/auth';
import {updateUser} from '@store/slices/auth/AsyncThunks';
import {BlockInput} from '@pages/MePage/BlockInput/BlockInput';
import {Header} from "@modules/Header/Header";
import {Button} from "@components/Button/Button";
import {UploaderImage} from "./UploaderImage/UploaderImage";
import {fetchDeleteTitleImage} from "@store/slices/auth/AsyncThunks";

export const MePage: FC = () => {
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const [fio, setFio] = useState(user?.fio);
	const [email, setEmail] = useState(user?.email);
	const [phone, setPhone] = useState(user?.phone);
	const activated = useAppSelector(selectActivatedUrl);

	const deleteVideo = () => {
		dispatch(fetchDeleteTitleImage({id: user.id, titleImg: user?.TitleImg}));
	}

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
			<div>
				{
					user?.TitleImg != null
						? <div className={styles.wrapper_image}>
							<div className={styles.wrapper__btn}>
								<Button onClick={deleteVideo} className={styles.btn}>Удалить</Button>
							</div>
							<img
								className={styles.img}
								src={`http://localhost:6789/uploads/${user?.TitleImg}`}
								alt="titleImg"/>
						</div>
						:
						<UploaderImage id={user?.id}/>
				}
			</div>
		</div>
	);
};
