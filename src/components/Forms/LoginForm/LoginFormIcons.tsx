import React, {FC} from 'react';
import styles from './LoginForm.module.sass';

export const GoogleIcon: FC = () => {
	return (
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
		</svg>);
};

export const CheckIcon: FC<{ checkbox: boolean }> = ({checkbox}) => {
	return (
		<svg className={checkbox ? styles.form__checkbox__block__iconActive : styles.form__checkbox__block__icon} width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1.27777 4.0278L3.91666 6.66667L9.72219 0.86113" stroke="var(--c-text)" strokeLinecap="square"/>
		</svg>
	);
};
