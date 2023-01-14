import React, {FC, useEffect} from "react";
import styles from "./MainLayout.module.sass";
import {LeftSidebar} from "@components/LeftSidebar/LeftSidebar";
import {Outlet, Navigate} from "react-router-dom";
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectIsAuth} from "@store/slices/auth";
import {fetchAuthMe} from "@store/slices/auth/AsyncThunks";

export const MainLayout: FC = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    if (isAuth === 'idle' || isAuth === 'failed') {
        return <Navigate to='/auth'/>;
    }
    return (
        <div className={styles.root}>
            <LeftSidebar/>
            <main className={styles.main}>
                <Outlet/>
                {isAuth === 'loading' && <Spinner className={styles.spinner}/>}
            </main>
        </div>
    )
};
