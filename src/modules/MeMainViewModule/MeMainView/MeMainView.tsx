import React, {FC} from "react";
import styles from "./MeMainView.module.sass";
import {Button} from "@components/Button/Button";
import {UploaderImage} from "../components/UploaderImage/UploaderImage";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectActivatedUrl, selectUser} from "@store/slices/auth";
import {fetchDeleteTitleImage} from "@store/slices/auth/AsyncThunks";

export const MeMainView: FC = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const activated = useAppSelector(selectActivatedUrl);

    const deleteImage = () => {
        dispatch(fetchDeleteTitleImage({id: user?.id, titleImg: user?.TitleImg}));
    }

    return (
        <div className={styles.root}>
            <div className={styles.leftSide}>
                <h2>{user?.fio}</h2>
                <span>{user?.email}</span>
                <span>{user?.phone}</span>
                <span>{user?.sex === 'male' ? 'мужчина' : 'женщина'}</span>
                <span>{user?.role === 'children' ? 'ученик' : 'учитель'}</span>
                {activated ? <p>Акаунт активирован</p> : <p>Акаунт не активирован, проверьте свою почту пожалуйтса</p>}
            </div>
            <div className={styles.rightSide}>
                {
                    user?.TitleImg != null
                        ? <div className={styles.wrapper_image}>
                            <div className={styles.wrapper__btn}>
                                <Button onClick={deleteImage} className={styles.btn}>Удалить</Button>
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
    )
}