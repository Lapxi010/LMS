import React, {FC} from 'react';
import styles from './Spinner.module.sass';

export const Spinner: FC<{className: string}> = ({className}) => {
	return (
		<div className={className}>
			<svg className={styles.root} width="127" height="117" viewBox="0 0 127 117" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_8_2021)">
					<path d="M105.833 53.625C104.539 45.0461 100.219 37.0971 93.5388 31.0025C86.8585 24.908 78.1883 21.006 68.864 19.8976C59.5396 18.7892 50.0783 20.5359 41.9375 24.8686C33.7967 29.2013 27.428 35.8797 23.8125 43.875M21.1666 24.375V43.875H42.3333" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M21.1666 63.375C22.4608 71.9539 26.7807 79.9029 33.4611 85.9975C40.1414 92.092 48.8116 95.994 58.136 97.1024C67.4603 98.2108 76.9216 96.4642 85.0624 92.1314C93.2033 87.7987 99.5719 81.1203 103.187 73.125M105.833 92.625V73.125H84.6666" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				</g>
				<defs>
					<clipPath id="clip0_8_2021">
						<rect width="127" height="117" fill="var(--c-bg-reg)"/>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};
