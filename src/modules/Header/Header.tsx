import React, {FC} from 'react';
import styles from './Header.module.sass';
import {ThemeSwitcherBtnMain} from '@modules/ThemeSwitcherBtn/ThemeSwitcherBtn';
import {NotificationIcon, UserIcon} from '@modules/Header/HeaderIcons';
import {NavLink} from 'react-router-dom';
import {classNames} from '@utils/classNames';
export const Header: FC<{children: string}> = ({children}) => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>{children}</h1>
			<ul className={styles.list}>
				<li className={styles.list__item}><ThemeSwitcherBtnMain/></li>
				<li className={styles.list__item}>
					<button className={classNames(styles.btn, styles.notification)}>
						<NotificationIcon/>
					</button>
				</li>
				<li className={styles.list__item}>
					<NavLink to='/me' className={styles.btn}>
						<UserIcon/>
					</NavLink>
				</li>
			</ul>
		</header>
	);
};
