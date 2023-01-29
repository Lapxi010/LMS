import React, {FC, useState} from 'react';
import styles from './LoginForm.module.sass';
import {classNames} from '@utils/classNames';
import {Button} from '@ui/Button/Button';
import {useForm} from 'react-hook-form';
import {CommonBlockLAI} from '../components/CommonBlockLAI/CommonBlockLAI';
import {CheckIcon} from './LoginFormIcons';
import {GoogleIcon} from './LoginFormIcons';
import {useAppDispatch, useAppSelector} from '@hooks/HookRedux';
import {Link} from 'react-router-dom';
import {selectStatus} from '@store/slices/auth';
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
	const status = useAppSelector(selectStatus);

	const onSubmit = async (data) => {
		await dispatch(fetchLogin(data));
		if (status === 'success') {
			reset();
		}
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
						disabled={!isValid || !checkbox || status === 'loading'}
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
