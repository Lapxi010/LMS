import React, {FC} from "react";
import styles from "./Header.module.sass";

export const UserIcon: FC = () => {
    return (
        <svg className={styles.userIcon} width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 15.4589C13.3687 15.4589 11.625 14.7375 10.2687 13.2947C8.9125 11.8519 8.23437 9.99678 8.23437 7.72947C8.23437 5.46216 8.9125 3.60709 10.2687 2.16425C11.625 0.721418 13.3687 0 15.5 0C17.6312 0 19.375 0.721418 20.7312 2.16425C22.0875 3.60709 22.7656 5.46216 22.7656 7.72947C22.7656 9.99678 22.0875 11.8519 20.7312 13.2947C19.375 14.7375 17.6312 15.4589 15.5 15.4589ZM0 32V27.1562C0 25.8508 0.306771 24.7343 0.920312 23.8068C1.53385 22.8792 2.325 22.175 3.29375 21.694C5.45729 20.6634 7.53203 19.8905 9.51797 19.3752C11.5039 18.8599 13.4979 18.6023 15.5 18.6023C17.5021 18.6023 19.488 18.8685 21.4578 19.401C23.4276 19.9334 25.4943 20.6978 27.6578 21.694C28.6589 22.175 29.4661 22.8792 30.0797 23.8068C30.6932 24.7343 31 25.8508 31 27.1562V32H0ZM2.90625 28.9082H28.0937V27.1562C28.0937 26.6065 27.9404 26.0827 27.6336 25.5845C27.3268 25.0864 26.9474 24.7171 26.4953 24.4766C24.4286 23.4117 22.5396 22.6817 20.8281 22.2866C19.1167 21.8916 17.3406 21.694 15.5 21.694C13.6594 21.694 11.8672 21.8916 10.1234 22.2866C8.37969 22.6817 6.49063 23.4117 4.45625 24.4766C4.00417 24.7171 3.63281 25.0864 3.34219 25.5845C3.05156 26.0827 2.90625 26.6065 2.90625 27.1562V28.9082ZM15.5 12.3672C16.7594 12.3672 17.8008 11.9291 18.6242 11.0531C19.4477 10.1771 19.8594 9.06924 19.8594 7.72947C19.8594 6.3897 19.4477 5.2818 18.6242 4.4058C17.8008 3.52979 16.7594 3.09179 15.5 3.09179C14.2406 3.09179 13.1992 3.52979 12.3758 4.4058C11.5523 5.2818 11.1406 6.3897 11.1406 7.72947C11.1406 9.06924 11.5523 10.1771 12.3758 11.0531C13.1992 11.9291 14.2406 12.3672 15.5 12.3672Z" fill="black"/>
        </svg>

    );
};

export const NotificationIcon: FC = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33325 25.3333V23.3333H8.13325V13.1333C8.13325 11.2667 8.68325 9.60555 9.78325 8.14999C10.8833 6.69443 12.3333 5.77777 14.1333 5.39999V4.43332C14.1333 3.92221 14.3166 3.49999 14.6833 3.16666C15.0499 2.83332 15.4888 2.66666 15.9999 2.66666C16.511 2.66666 16.9499 2.83332 17.3166 3.16666C17.6833 3.49999 17.8666 3.92221 17.8666 4.43332V5.39999C19.6666 5.77777 21.1221 6.69443 22.2333 8.14999C23.3444 9.60555 23.8999 11.2667 23.8999 13.1333V23.3333H26.6666V25.3333H5.33325ZM15.9999 29.3333C15.2888 29.3333 14.6666 29.0722 14.1333 28.55C13.5999 28.0278 13.3333 27.4 13.3333 26.6667H18.6666C18.6666 27.4 18.4055 28.0278 17.8833 28.55C17.361 29.0722 16.7333 29.3333 15.9999 29.3333ZM10.1333 23.3333H21.8999V13.1333C21.8999 11.4889 21.3333 10.0889 20.1999 8.93332C19.0666 7.77777 17.6777 7.19999 16.0333 7.19999C14.3888 7.19999 12.9944 7.77777 11.8499 8.93332C10.7055 10.0889 10.1333 11.4889 10.1333 13.1333V23.3333Z" fill="#F5F1FB"/>
        </svg>
    );
};
