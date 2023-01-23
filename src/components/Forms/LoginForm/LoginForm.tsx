import React, {FC, useState} from 'react';
import styles from './LoginForm.module.sass';
import {classNames} from '@utils/classNames';
import {Button} from '@components/Button/Button';
import {useForm} from 'react-hook-form';
import {CommonBlockLAI} from '@components/Forms/CommonBlockLAI/CommonBlockLAI';
import {CheckIcon} from '@components/Forms/LoginForm/LoginFormIcons';
import {GoogleIcon} from '@components/Forms/LoginForm/LoginFormIcons';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {Link, Navigate} from 'react-router-dom';
import {selectIsAuth} from '@store/slices/auth';
import {fetchLogin} from '@store/slices/auth/AsyncThunks';

export const LoginForm: FC = () => {
	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset
	} = useForm({mode: 'onChange'});
	const [checkbox, setCheckbox] = useState(false);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);

	if (isAuth === 'success') {
		return <Navigate to='/'/>;
	}

	const onSubmit = async (data) => {
		await dispatch(fetchLogin(data));
		reset();
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={styles.title}>Добро пожаловать</h1>
					<p className={styles.description}>Добро пожаловать! Пожалуйста введите свои данные.</p>
					<CommonBlockLAI
						register={{...register('email', {
							required: 'Поле обязательно для заполнения',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Неверный формат email',
							}})}}
						placeholder={'Введите свой email'}
						errorsMessage={errors?.email?.message as string}
						label={'Email'}
					/>
					<CommonBlockLAI
						register={{...register('password', {
							required: 'Поле обязательно для заполнения',
							minLength: {
								value: 6,
								message: 'Минимальная длина пароля 6 символов',
							}})}}
						placeholder={'Введите свой пароль'}
						errorsMessage={errors?.password?.message as string}
						label={'Пароль'}
					/>
					<div className={styles.form__checkbox}>
						<div className={styles.form__checkbox__block}>
							<div className={styles.form__checkbox__block__square} onClick={() => {
								setCheckbox((e) => !e);
							}}>
								<CheckIcon checkbox={checkbox}/>
							</div>
							<p className={styles.form__checkbox__description} onClick={() => {
								setCheckbox((e) => !e);
							}}>Запомнить на 30 дней</p>
						</div>
						<a href="src/components/Forms#" className={styles.form__checkbox__link}>Забыл пароль</a>
					</div>
					<Button
						className={styles.btn}
						disabled={!isValid || !checkbox}
						type="submit"
					>Войти</Button>
					<Button type="button" className={classNames(styles.btn, styles.btn_google)}>Войти с помощью
						<GoogleIcon/>
					</Button>
					<p className={styles.changer}>Нет акаунта? <Link to={'/auth/register'} className={styles.form__checkbox__link}>Зарегистрироваться</Link></p>
				</form>
			</div>
		</div>
	);
};
