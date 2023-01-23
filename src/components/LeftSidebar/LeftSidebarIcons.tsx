import React, {FC} from 'react';
import styles from './LeftSidebar.module.sass';

export const HomeIcon: FC = () => {
	return (
		<svg className={styles.menu__icon}  width="226" height="209" viewBox="0 0 226 209" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M51.7917 169.812H87.1042V115.385H138.896V169.812H174.208V84.9062L113 42.4531L51.7917 84.9062V169.812ZM37.6667 182.875V78.375L113 26.125L188.333 78.375V182.875H124.771V128.448H101.229V182.875H37.6667Z" fill="#7D7D7D"/>
		</svg>

	);
};

export const HatIcon: FC = () => {
	return (
		<svg className={styles.menu__icon} width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.4677 28.3328L6.10308 23.024V15.0108L1.29163 12.3063L15.4677 4.29306L29.7083 12.3063V22.8905H27.7708V13.4749L24.8323 15.0108V23.024L15.4677 28.3328ZM15.4677 18.0491L25.6395 12.3063L15.4677 6.66365L5.36038 12.3063L15.4677 18.0491ZM15.4677 26.0624L22.8948 21.822V16.2128L15.4677 20.3196L8.04058 16.146V21.822L15.4677 26.0624Z" fill="#7D7D7D"/>
		</svg>
	);
};

export const ChatIcon: FC = () => {
	return (
		<svg className={styles.menu__icon} width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.75004 19.13H17.8573V17.1267H7.75004V19.13ZM7.75004 14.7895H23.25V12.7862H7.75004V14.7895ZM7.75004 10.449H23.25V8.44565H7.75004V10.449ZM2.58337 29.7809V5.07341C2.58337 4.56145 2.77712 4.09958 3.16462 3.68779C3.55212 3.27599 4.00421 3.0701 4.52087 3.0701H26.4792C26.9743 3.0701 27.421 3.27599 27.8193 3.68779C28.2176 4.09958 28.4167 4.56145 28.4167 5.07341V22.4354C28.4167 22.9474 28.2176 23.4093 27.8193 23.8211C27.421 24.2329 26.9743 24.4388 26.4792 24.4388H7.75004L2.58337 29.7809ZM4.52087 24.9396L6.94275 22.4354H26.4792V5.07341H4.52087V24.9396ZM4.52087 5.07341V24.9396V5.07341Z" fill="#7D7D7D"/>
		</svg>
	);
};

export const SettingsIcon: FC = () => {
	return (
		<svg className={styles.menu__icon}  width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.5292 29.8935L11.8834 25.6865C11.4743 25.5307 11.0438 25.3193 10.5917 25.0522C10.1396 24.7851 9.74136 24.5068 9.39692 24.2174L5.5865 26.0204L2.58337 20.5447L6.07087 17.907C6.02782 17.7067 6.00091 17.4785 5.99014 17.2226C5.97938 16.9666 5.974 16.7384 5.974 16.5381C5.974 16.3378 5.97938 16.1096 5.99014 15.8536C6.00091 15.5976 6.02782 15.3695 6.07087 15.1692L2.58337 12.5315L5.5865 7.05575L9.39692 8.85873C9.74136 8.56936 10.1396 8.29112 10.5917 8.02401C11.0438 7.75691 11.4743 7.55657 11.8834 7.42302L12.5292 3.18268H18.4709L19.1167 7.38963C19.5257 7.54545 19.9617 7.75134 20.4245 8.00732C20.8874 8.2633 21.2803 8.5471 21.6032 8.85873L25.4136 7.05575L28.4167 12.5315L24.9292 15.1024C24.9723 15.325 24.9992 15.5643 25.0099 15.8202C25.0207 16.0762 25.0261 16.3155 25.0261 16.5381C25.0261 16.7607 25.0207 16.9944 25.0099 17.2392C24.9992 17.4841 24.9723 17.7178 24.9292 17.9404L28.4167 20.5447L25.4136 26.0204L21.6032 24.2174C21.2587 24.5068 20.8658 24.7906 20.4245 25.0689C19.9832 25.3471 19.5473 25.553 19.1167 25.6865L18.4709 29.8935H12.5292ZM15.5 20.8786C16.6625 20.8786 17.6528 20.4557 18.4709 19.6098C19.2889 18.764 19.698 17.7401 19.698 16.5381C19.698 15.3361 19.2889 14.3122 18.4709 13.4663C17.6528 12.6205 16.6625 12.1976 15.5 12.1976C14.3375 12.1976 13.3473 12.6205 12.5292 13.4663C11.7112 14.3122 11.3021 15.3361 11.3021 16.5381C11.3021 17.7401 11.7112 18.764 12.5292 19.6098C13.3473 20.4557 14.3375 20.8786 15.5 20.8786ZM15.5 18.8753C14.8757 18.8753 14.3429 18.6471 13.9016 18.1908C13.4603 17.7345 13.2396 17.1836 13.2396 16.5381C13.2396 15.8926 13.4603 15.3417 13.9016 14.8854C14.3429 14.429 14.8757 14.2009 15.5 14.2009C16.1243 14.2009 16.6572 14.429 17.0985 14.8854C17.5398 15.3417 17.7605 15.8926 17.7605 16.5381C17.7605 17.1836 17.5398 17.7345 17.0985 18.1908C16.6572 18.6471 16.1243 18.8753 15.5 18.8753ZM14.0792 27.8902H16.9209L17.373 24.1507C18.0834 23.9726 18.7561 23.6944 19.3912 23.316C20.0263 22.9376 20.6021 22.4812 21.1188 21.947L24.5417 23.4829L25.8334 21.0789L22.798 18.7751C22.8841 18.3967 22.954 18.0239 23.0079 17.6566C23.0617 17.2893 23.0886 16.9165 23.0886 16.5381C23.0886 16.1597 23.0671 15.7868 23.024 15.4196C22.9809 15.0523 22.9056 14.6795 22.798 14.3011L25.8334 11.9972L24.5417 9.59327L21.1188 11.1291C20.6237 10.5504 20.0639 10.0663 19.4396 9.67675C18.8153 9.28721 18.1264 9.0368 17.373 8.9255L16.9209 5.18599H14.0792L13.6271 8.9255C12.8952 9.08132 12.2117 9.34843 11.5766 9.72683C10.9415 10.1052 10.3764 10.5727 9.88129 11.1291L6.45837 9.59327L5.16671 11.9972L8.20212 14.3011C8.11601 14.6795 8.04605 15.0523 7.99223 15.4196C7.93841 15.7868 7.9115 16.1597 7.9115 16.5381C7.9115 16.9165 7.93841 17.2893 7.99223 17.6566C8.04605 18.0239 8.11601 18.3967 8.20212 18.7751L5.16671 21.0789L6.45837 23.4829L9.88129 21.947C10.398 22.4812 10.9738 22.9376 11.6089 23.316C12.244 23.6944 12.9167 23.9726 13.6271 24.1507L14.0792 27.8902Z" fill="#7D7D7D"/>
		</svg>
	);
};

export const LogoutIcon = () => {
	return (
		<svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clipPath="url(#clip0_40_38)">
				<path d="M18.0833 11.5535V8.88245C18.0833 8.17403 17.8112 7.49463 17.3267 6.99371C16.8422 6.49278 16.1851 6.21136 15.5 6.21136H6.45833C5.77319 6.21136 5.11611 6.49278 4.63164 6.99371C4.14717 7.49463 3.875 8.17403 3.875 8.88245V24.9089C3.875 25.6174 4.14717 26.2968 4.63164 26.7977C5.11611 27.2986 5.77319 27.58 6.45833 27.58H15.5C16.1851 27.58 16.8422 27.2986 17.3267 26.7977C17.8112 26.2968 18.0833 25.6174 18.0833 24.9089V22.2379" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M9.04163 16.8957H27.125L23.25 12.8891M23.25 20.9023L27.125 16.8957" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</g>
			<defs>
				<clipPath id="clip0_40_38">
					<rect width="31" height="32.053" fill="white" transform="translate(0 0.869202)"/>
				</clipPath>
			</defs>
		</svg>
	);
};
