import React, {Dispatch, FC, useState} from 'react';
import styles from './CreateCourse.module.sass';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchCreateCourse} from '@store/slices/course/AsyncThunks';
import {useForm} from 'react-hook-form';
import {Button} from '@components/Button/Button';

export const CreateCourse: FC<{setView: Dispatch<boolean>}> = ({setView}) => {
	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset
	} = useForm({mode: 'onChange'});
	const dispatch = useAppDispatch();

	const sendData = (data) => {
		dispatch(fetchCreateCourse(data));
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
						className={styles.block__input}
						placeholder={'Введите название курса'}
						name="title"
					/>
				</div>
				<div className={styles.block}>
					<label className={styles.block__label}>Описание</label>
					<textarea
						className={styles.block__textArea}
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
				</div>
				<div className={styles.block}>
					<label className={styles.block__label}>Короткое описание</label>
					<textarea
						className={styles.block__textArea}
						{...register('shortDesc', {
							required: 'Поле обязательно для заполнения.',
							minLength: {
								value: 50,
								message: 'Короткое описание должно быть минимум 100 символов.'
							},
							maxLength: {
								value: 100,
								message: 'Короткое описание не должно быть больше 100 символов.'
							}
						})}
						name="shortDesc"
						placeholder={'Введите описание своего курса'}
					/>
				</div>
				<Button className={styles.btn} type={'submit'} disabled={!isValid}>Создать курс</Button>
			</form>
		</div>
	);
};