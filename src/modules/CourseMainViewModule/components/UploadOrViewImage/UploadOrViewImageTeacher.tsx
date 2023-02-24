import React, {FC} from "react";
import {UploaderImage} from "@modules/CourseMainViewModule/components/UploaderImage/UploaderImage";
import {fetchDeleteImage} from "@store/slices/course/AsyncThunks";
import {useAppDispatch} from "@hooks/HookRedux";
import styles from "./UploadOrViewImage.module.sass";
import {Button} from "@components/Button/Button";
import Api from '@api/index';
export const UploadOrViewImageTeacher: FC<{ id: string, src: string }> = ({id, src}) => {
    const dispatch = useAppDispatch();
    const deleteVideo = () => {
        dispatch(fetchDeleteImage({id: id, titleImg: src}));
    }

    return (
        <div>

            {
                src != null
                    ? <div className={styles.wrapper}>
                        <div className={styles.wrapper__btn}>
                            <Button onClick={deleteVideo} className={styles.btn}>Удалить</Button>
                        </div>
                        <img
                            width={'300px'}
                            height={'300px'}
                            src={`${Api.defaults.baseURL}uploads/${src}`}
                            alt="titleImg"/>
                    </div>
                    :
                    <UploaderImage id={id}/>
            }
        </div>
    )
}
