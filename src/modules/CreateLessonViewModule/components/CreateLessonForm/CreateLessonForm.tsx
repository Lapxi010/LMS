import React, {FC} from "react";
import styles from "./CreateLessonForm.module.sass";
import {Button} from "@components/Button/Button";
import {fetchCreateLesson} from "@store/slices/course/AsyncThunks";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@hooks/HookRedux";
import {classNames} from "@utils/classNames";
export const CreateLessonForm: FC<{id: string, setClose: any}> = ({id, setClose}) => {
    const {
        register,
        formState: {errors, isValid},
        handleSubmit,
        reset
    } = useForm({mode: 'onChange'});
    const dispatch = useAppDispatch();
    const sendData = async (data) => {
        await dispatch(fetchCreateLesson({id, data}));
        setClose(true);
    };

    return (
        <form onSubmit={handleSubmit(sendData)} className={styles.wrapper}>
            <div className={styles.block}>
                <label className={styles.block__label}>Название</label>
                <input
                    {...register('title', {
                        required: 'Поле обязательно для заполнения.',
                        minLength: {
                            value: 3,
                            message: 'Название должно быть минимум 3 символа.'
                        }
                    })}
                    className={classNames(styles.block__input, errors?.title?.message && styles.errorInput)}
                    placeholder={'Введите название курса'}
                    name="title"
                />
                {errors?.title?.message && <span className={styles.errorText}>{errors?.title?.message}</span>}
            </div>
            <div className={styles.block}>
                <label className={styles.block__label}>Описание</label>
                <textarea
                    className={classNames(styles.block__textArea, errors?.description?.message && styles.errorInput)}
                    {...register('description', {
                        required: 'Поле обязательно для заполнения.',
                        minLength: {
                            value: 100,
                            message: 'Описание должно быть минимум 100 символов.'
                        }
                    })}
                    name="description"
                    placeholder={'Введите описание своего курса'}
                />
                {errors?.description?.message && <span className={styles.errorText}>{errors?.description?.message}</span>}
            </div>
            <Button className={styles.btn} type={'submit'} disabled={!isValid}>Создать курс</Button>
        </form>
    )
}