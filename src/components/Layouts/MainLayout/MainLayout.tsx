import React, {FC, ReactElement} from "react";
import styles from "./MainLayout.module.sass";
import {LeftSidebar} from "@components/LeftSidebar/LeftSidebar";

export const MainLayout: FC<{children: ReactElement}> = ({children}) => {
    return (
        <div className={styles.root}>
            <LeftSidebar/>
            {children}
        </div>
    )
};
