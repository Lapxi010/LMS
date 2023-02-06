import React, {FC} from 'react';
import styles from './LeftSidebar.module.sass';
import Logo from './Logo.svg';
import {HomeIcon, HatIcon, ChatIcon, SettingsIcon, LogoutIcon} from './LeftSidebarIcons';
import {classNames} from '@utils/classNames';
import {NavLink} from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchLogout} from '@store/slices/auth/AsyncThunks';

export const LeftSidebar: FC = () => {
	const dispatch = useAppDispatch();
	const logout = async () => {
		await dispatch(fetchLogout());
	};
	// @ts-ignore
	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.logo}><img className={styles.logo__img} src={Logo} alt="logo"/></div>
				<ul className={styles.menu}>
					<li className={styles.menu__item}>
						<NavLink
							className={({isActive}) => isActive ? classNames(styles.menu__link, styles.menu__link_active) : styles.menu__link}
							to={'/'}
						>
							<HomeIcon/>
						</NavLink>
					</li>
					<li className={styles.menu__item}>
						<NavLink
							className={({isActive}) => isActive ? classNames(styles.menu__link, styles.menu__link_active) : styles.menu__link}
							to={'/courses'}
						>
							<HatIcon/>
						</NavLink>
					</li>
					<li className={styles.menu__item}>
						<NavLink
							className={({isActive}) => isActive ? classNames(styles.menu__link, styles.menu__link_active) : styles.menu__link}
							to={'/chat'}
						>
							<ChatIcon/>
						</NavLink>
					</li>
					<li className={styles.menu__item}>
						<NavLink
							className={({isActive}) => isActive ? classNames(styles.menu__link, styles.menu__link_active) : styles.menu__link}
							to={'/settings'}
						>
							<SettingsIcon/>
						</NavLink>
					</li>
				</ul>
				<button className={styles.btn__logout} onClick={logout}><LogoutIcon/></button>
			</div>
		</div>
	);
};
