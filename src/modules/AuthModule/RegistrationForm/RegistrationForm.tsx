import React, {FC, useState} from 'react';
import styles from './RegistrationForm.module.sass';
import {useForm} from 'react-hook-form';
import {CommonBlockLAI} from '../components/CommonBlockLAI/CommonBlockLAI';
import {Button} from '@components/Button/Button';
import {Link} from 'react-router-dom';
import Female from './Female.svg';
import Male from './Male.svg';
import {classNames} from '@utils/classNames';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchRegister} from '@store/slices/auth/AsyncThunks';

export const RegistrationForm: FC = () => {
	const {
		register,
		formState: {errors, isValid},
		handleSubmit,
		reset,
		getValues
	} = useForm({mode: 'onChange'});
	const [step, setStep] = useState<'first' | 'second'>('first');
	const [sex, setSex] = useState<'male' | 'female'>(null);
	const [activity, setActivity] = useState<'children' | 'teacher'>(null);
	const dispatch = useAppDispatch();

	const onSubmit = async (data) => {
		await dispatch(fetchRegister({role: activity,sex, ...data}));
		setSex(null);
		setActivity(null);
		reset();
	};

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<h1 className={styles.title}>Добро пожаловать</h1>
					<p className={styles.description}>Добро пожаловать! Пожалуйста введите свои данные.</p>
					<div style={{display: step === 'first' ? 'block' : 'none'}}>
						<CommonBlockLAI
							register={{
								...register('fio', {
									required: 'Поле обязательно для заполнения',
									pattern: {
										value: /^[a-zа-яё]+\s+[a-zа-яё]+\s+[a-zа-яё]/i,
										message: 'Неверный формат ФИО',
									}
								})
							}}
							placeholder={'Введите своё ФИО'}
							errorsMessage={errors?.fio?.message as string}
							label={'ФИО'}
						/>
						<CommonBlockLAI
							register={{
								...register('email', {
									required: 'Поле обязательно для заполнения',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Неверный формат email',
									}
								})
							}}
							placeholder={'Введите свой email'}
							errorsMessage={errors?.email?.message as string}
							label={'Email'}
						/>
						<CommonBlockLAI
							register={{
								...register('password', {
									required: 'Поле обязательно для заполнения',
									minLength: {
										value: 6,
										message: 'Минимальная длина пароля 6 символов',
									}
								})
							}}
							placeholder={'Введите свой пароль'}
							errorsMessage={errors?.password?.message as string}
							label={'Пароль'}
						/>
						<CommonBlockLAI
							register={{
								...register('passwordRepeat', {
									required: 'Поле обязательно для заполнения',
									validate: {
										matchesPreviousPassword: (value) => {
											const {password} = getValues();
											return password === value || 'Пароли не совпадают';
										}
									}
								})
							}}
							placeholder={'Повторите свой пароль'}
							errorsMessage={errors?.passwordRepeat?.message as string}
							label={'Повторите пароль'}
						/>
						<Button
							className={styles.btn}
							onClick={() => {
								setStep('second');
							}}
							type="button"
						>Дальше</Button>
					</div>
					<div style={{display: step === 'second' ? 'block' : 'none'}}>
						<CommonBlockLAI
							register={{
								...register('phone', {
									required: 'Поле обязательно для заполнения',
									pattern: {
										value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
										message: 'Неверный формат телефона',
									}
								})
							}}
							placeholder={'Введите свой телефон'}
							errorsMessage={errors?.phone?.message as string}
							label={'Телефон'}
						/>
						<div className={styles.form__blockSex}>
							<p>Выберите свой пол</p>
							<div className={styles.form__blockSex__blocks}>
								<Button type={'button'} className={classNames(styles.form__blockSex__blocks__btn, sex === 'female' ? styles.form__blockSex__blocks__btnActive : '')}
									onClick={() => {
										setSex('female');
									}}>
									<img src={Female} alt="Female"/>
								</Button>
								<Button type={'button'} className={classNames(styles.form__blockSex__blocks__btn, sex === 'male' ? styles.form__blockSex__blocks__btnActive : '')} onClick={() => {
									setSex('male');
								}}>
									<img src={Male} alt="Male"/>
								</Button>
							</div>
						</div>
						<div className={styles.form__blockSex}>
							<p>Выберите кто вы</p>
							<div style={{justifyContent: 'space-around'}} className={styles.form__blockSex__blocks}>
								<span onClick={() => {
									setActivity('teacher');
								}} className={classNames(styles.form__blockSex__blocks__text, activity === 'teacher' ? styles.form__blockSex__blocks__textActive : '')}>Учитель</span>
								<span onClick={() => {
									setActivity('children');
								}} className={classNames(styles.form__blockSex__blocks__text, activity === 'children' ? styles.form__blockSex__blocks__textActive : '')}>Ученик</span>
							</div>
						</div>
						<Button
							className={classNames(styles.btn, styles.btn__back)}
							type="button"
							onClick={() => {
								setStep('first');
							}}
						>Назад</Button>
						<Button
							className={styles.btn}
							disabled={!isValid || !activity || !sex}
							type="submit"
						>Зарегистрироваться</Button>
					</div>
					<p className={styles.changer}>Нет акаунта? <Link to={'/auth'} className={styles.form__link}>Войти</Link></p>
				</form>
			</div>
		</div>
	);
};
