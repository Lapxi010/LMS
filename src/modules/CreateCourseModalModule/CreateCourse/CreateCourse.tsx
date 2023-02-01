import React, {Dispatch, FC} from 'react';
import styles from './CreateCourse.module.sass';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {fetchCreateCourse} from '@store/slices/courses/AsyncThunks';
import {useForm} from 'react-hook-form';
import {Button} from '@components/Button/Button';
import {classNames} from '@utils/classNames';
import {selectStatusCreateCourse} from '@store/slices/courses';
import {useNavigate} from 'react-router-dom';

export const CreateCourse: FC<{setView: Dispatch<boolean>}> = ({setView}) => {
	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset
	} = useForm({mode: 'onChange'});
	const dispatch = useAppDispatch();
	const statusCreate = useAppSelector(selectStatusCreateCourse);
	const navigate = useNavigate();

	const sendData = async (data) => {
		setView(false);
		await dispatch(fetchCreateCourse(data));
	};


	return (
		<div className={styles.root} onClick={() => setView(false)}>
			<form onSubmit={handleSubmit(sendData)} className={styles.wrapper} onClick={e => e.stopPropagation()}>
				<button onClick={() => setView(false)} className={styles.closeBtn}>
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2 22L22 2" className={styles.closeBtn__path} strokeWidth="3" />
						<path d="M22 22L2 2" className={styles.closeBtn__path} strokeWidth="3" />
					</svg>
				</button>
				<h2 className={styles.title}>Создание курса</h2>
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
				<div className={styles.block}>
					<label className={styles.block__label}>Короткое описание</label>
					<textarea
						className={classNames(styles.block__textArea, errors?.shortDesc?.message && styles.errorInput)}
						{...register('shortDesc', {
							required: 'Поле обязательно для заполнения.',
							minLength: {
								value: 50,
								message: 'Короткое описание должно быть минимум 50 символов.'
							},
							maxLength: {
								value: 100,
								message: 'Короткое описание не должно быть больше 100 символов.'
							}
						})}
						name="shortDesc"
						placeholder={'Введите описание своего курса'}
					/>
					{errors?.shortDesc?.message && <span className={styles.errorText}>{errors?.shortDesc?.message}</span>}
				</div>
				<Button className={styles.btn} type={'submit'} disabled={!isValid}>Создать курс</Button>
			</form>
		</div>
	);
};