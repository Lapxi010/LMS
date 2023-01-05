import React, {FC, useState} from 'react';
import styles from './RegistrationForm.module.sass';
import {classNames} from '../../utils/classNames';
import {ThemeSwitcher} from '@components/RegistraionForm/ThemeSwitcher/ThemeSwitcher';
import {Button} from '@components/Button/Button';
import {useForm} from 'react-hook-form';

export const RegistrationForm: FC = () => {
	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset,
	} = useForm({mode: 'onChange'});
	const [checkbox, setCheckbox] = useState(false);

	const onSubmit = (data) => {
		alert(data);
		reset();
	};

	return (
		<div className={styles.root}>
			<ThemeSwitcher className={styles.themeSwitcher}/>
			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={styles.title}>Добро пожаловать</h1>
					<p className={styles.description}>Добро пожаловать! Пожалуйста введите свои данные.</p>
					<div className={styles.form__block}>
						{errors?.email && <p className={styles.error}>{errors?.email?.message as string}</p>}
						<label className={styles.form__block__label}>Email</label>
						<input {
							...register('email', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Неверный формат email',
								},
							})} placeholder="Введите свой email" className={classNames(styles.form__block__input, errors?.email ? styles.error__input : '')}/>
					</div>
					<div className={styles.form__block}>
						<label className={styles.form__block__label}>Пароль</label>
						<input {
							...register('password', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 6,
									message: 'Минимальная длина пароля 6 символов',
								}
							})} placeholder="Введите свой пароль" type="text" className={classNames(styles.form__block__input, errors?.password ? styles.error__input : '')}/>
						{errors?.password && <p className={styles.error}>{errors?.password?.message as string}</p>}
					</div>
					<div className={styles.form__checkbox}>
						<div className={styles.form__checkbox__block}>
							<div className={styles.form__checkbox__block__square} onClick={() => {
								setCheckbox((e) => !e);
							}}>
								<svg className={checkbox ? styles.form__checkbox__block__iconActive : styles.form__checkbox__block__icon} width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.27777 4.0278L3.91666 6.66667L9.72219 0.86113" stroke="var(--c-text)" strokeLinecap="square"/>
								</svg>
							</div>
							<p className={styles.form__checkbox__description} onClick={() => {
								setCheckbox((e) => !e);
							}}>Запомнить на 30 дней</p>
						</div>
						<a href="#" className={styles.form__checkbox__link}>Забыл пароль</a>
					</div>
					<Button
						className={styles.btn}
						disabled={!isValid || !checkbox}
						type="submit"
					>Войти</Button>
					<Button className={classNames(styles.btn, styles.btn_google)}>Войти с помощью
						<svg className={styles.btn_google__icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_8_212)">
								<path
									d="M17.788 5.05978C16.2192 3.75469 14.2478 3.01884 12.1997 2.97382C10.1515 2.9288 8.14913 3.5773 6.52342 4.81217C4.89771 6.04704 3.74596
									7.79437 3.25849 9.76542C2.77102 11.7365 2.97701 13.8133 3.84242 15.6527C4.70782 17.4921 6.18085 18.9839 8.0181 19.8818C9.85534 20.7796 11.9468
									21.0297 13.947 20.5907C15.9471 20.1517 17.7362 19.0499 19.0186 17.4673C20.301 15.8847 21 13.9161 21 11.8868H13"
									stroke="var(--c-text)"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_8_212">
									<rect width="24" height="23.7736" fill="white"/>
								</clipPath>
							</defs>
						</svg>
					</Button>
					<p className={styles.changer}>Нет акаунта? <a href="#" className={styles.form__checkbox__link}>Зарегистрироваться</a></p>
				</form>
			</div>
			<span className={styles.license}>© 2023-2024 LapxiLMS</span>
		</div>
	);
};
