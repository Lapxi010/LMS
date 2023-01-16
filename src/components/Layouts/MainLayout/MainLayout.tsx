import React, {FC, useEffect} from "react";
import styles from "./MainLayout.module.sass";
import {LeftSidebar} from "@components/LeftSidebar/LeftSidebar";
import {Outlet, Navigate} from "react-router-dom";
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";
import {useAppDispatch, useAppSelector} from "@hooks/HookRedux";
import {selectIsAuth, selectStatus} from "@store/slices/auth";
import {fetchRefresh} from "@store/slices/auth/AsyncThunks";
import {useSelector} from "react-redux";

export const MainLayout: FC = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const status = useSelector(selectStatus);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRefresh());
    }, []);

    return (
        <>
            {!isAuth && <Navigate to='/auth'/>}
            <div className={styles.root}>
                <LeftSidebar/>
                <main className={styles.main}>
                    <Outlet/>
                    {status === 'loading' && <Spinner className={styles.spinner}/>}
                </main>
            </div>
        </>
    )
};
