import React, {FC} from 'react';
import styles from './ThemeSwitcher.module.sass';
import Sun from './Sun.svg';
import Moon from './Moon.svg';
import {Button} from '@components/Button/Button';

export const ThemeSwitcher: FC<{className: string}> = ({className}) => {
	return (
		<div className={className}>
			<Button
				onClick={() =>
				{
					document.body.classList.toggle('darkTheme');
					localStorage.setItem('darkTheme', String(document.body.classList.contains('darkTheme')));
				}}
				className={styles.root}
			>
				<img src={Sun} alt="Sun" className={styles.sun} />
				<img src={Moon} alt="Moon" className={styles.moon} />
			</Button>
		</div>
	);
};
