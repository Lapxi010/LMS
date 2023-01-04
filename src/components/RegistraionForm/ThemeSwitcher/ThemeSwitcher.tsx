import React, {FC} from 'react';
import styles from './ThemeSwitcher.module.sass';
import Sun from './Sun.svg';
import Moon from './Moon.svg';

export const ThemeSwitcher: FC = () => {
	return (
		<button
			onClick={() =>
			{
				document.body.classList.toggle('darkTheme');
				localStorage.setItem('darkTheme', String(document.body.classList.contains('darkTheme')));
			}}
			className={styles.root}
		>
			<img src={Sun} alt="Sun" className={styles.sun} />
			<img src={Moon} alt="Moon" className={styles.moon} />
		</button>
	);
};
