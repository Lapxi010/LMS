import React, {FC} from "react";
import styles from "./VideoBlock.module.sass";
import {Button} from "@components/Button/Button";
import {fetchDeleteVideo} from "@store/slices/course/AsyncThunks";
import {useAppDispatch} from "@hooks/HookRedux";

export const VideoBlock: FC<{ srcVideo: string, id: string }> = ({srcVideo, id}) => {
    const dispatch = useAppDispatch();
    const deleteVideo = () => {
        dispatch(fetchDeleteVideo({id: srcVideo, lessondId: id}));
    }

    return (
        <div className={styles.wrapper__video__two}>
            <div className={styles.wrapper__btn}>
                <Button onClick={deleteVideo} className={styles.btn}>Удалить</Button>
            </div>
            <video className={styles.video} controls={true}
                   src={`http://localhost:6789/api/v1/courses/video/${srcVideo}`}/>
        </div>
    )
}