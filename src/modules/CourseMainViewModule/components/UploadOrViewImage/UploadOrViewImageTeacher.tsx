import React, {FC} from "react";
import {UploaderImage} from "@modules/CourseMainViewModule/components/UploaderImage/UploaderImage";
import {fetchDeleteImage} from "@store/slices/course/AsyncThunks";
import {useAppDispatch} from "@hooks/HookRedux";
import styles from "./UploadOrViewImage.module.sass";
import {Button} from "@components/Button/Button";

export const UploadOrViewImageTeacher: FC<{ id: string, src: string }> = ({id, src}) => {
    const dispatch = useAppDispatch();
    const deleteVideo = () => {
        dispatch(fetchDeleteImage({id: id, titleImg: src}));
    }

    return (
        <div>

            {
                src != null
                    ? <div>
                        <div className={styles.wrapper__btn}>
                            <Button onClick={deleteVideo} className={styles.btn}>Удалить</Button>
                        </div>
                        <img
                            width={'300px'}
                            height={'300px'}
                            src={`http://localhost:6789/uploads/${src}`}
                            alt="titleImg"/>
                    </div>
                    :
                    <UploaderImage id={id}/>
            }
        </div>
    )
}
