import React, {FC} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';
import styles from './CommonBlockLAI.module.sass';
import {classNames} from '@utils/classNames';
interface ICommonBlockLAI {
	register?: UseFormRegisterReturn;
	errorsMessage?: string;
	label: string;
	placeholder: string;
}

export const CommonBlockLAI: FC<ICommonBlockLAI>
	= ({register,errorsMessage, label, placeholder}) => {
		return (
			<div className={styles.block}>
				{errorsMessage && <p className={styles.error}>{errorsMessage}</p>}
				<label className={styles.label}>{label}</label>
				<input {...register} placeholder={placeholder} className={classNames(styles.input, errorsMessage ? styles.error__input : '')}/>
			</div>
		);
	};
