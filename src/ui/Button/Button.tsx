import React, {FC} from 'react';
import styles from './Button.module.sass';
import {classNames} from '../../utils/classNames';

interface IButton {
	children: React.ReactNode,
	className?: string,
	onClick?: () => void,
	disabled?: boolean,
	type?: 'submit' | 'reset' | 'button'
}
export const Button: FC<IButton>
	= ({children, className, onClick, disabled, type}) => {
		return (
			<button disabled={disabled} type={type} onClick={onClick} className={classNames(styles.root, className)}>{children}</button>
		);
	};
