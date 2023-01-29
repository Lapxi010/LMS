import React, {FC} from 'react';
import styles from './ThemeSwitcherBtn.module.sass';
import Sun from './Sun.svg';
import Moon from './Moon.svg';
import {Button} from '@ui/Button/Button';
import {classNames} from '@utils/classNames';

export const ThemeSwitcherBtnAuth: FC<{className: string}> = ({className}) => {
	return (
		<div className={className}>
			<Button
				onClick={() =>
				{
					document.body.classList.toggle('darkTheme');
					localStorage.setItem('darkTheme', document.body.classList.contains('darkTheme'));
				}}
				className={styles.auth}
			>
				<img src={Sun} alt="Sun" className={styles.sun} />
				<img src={Moon} alt="Moon" className={styles.moon} />
			</Button>
		</div>
	);
};

export const ThemeSwitcherBtnMain: FC = () => {
	return (
		<Button
			onClick={() =>
			{
				document.body.classList.toggle('darkTheme');
				localStorage.setItem('darkTheme', document.body.classList.contains('darkTheme'));
			}}
			className={styles.main}
		>
			<img src={Sun} alt="Sun" className={classNames(styles.sun, styles.sun__main)}  />
			<img src={Moon} alt="Moon" className={classNames(styles.moon, styles.moon__main)} />
		</Button>
	);
};
