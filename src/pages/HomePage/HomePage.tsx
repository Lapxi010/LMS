import React, {FC, useEffect} from 'react';
import styles from './HomePage.module.sass';
import {useAppSelector} from '@hooks/HookRedux';
import {selectIsAuth} from '@store/slices/auth';
import {Navigate} from 'react-router-dom';
import {useAppDispatch} from '@hooks/HookRedux';
import {fetchAuthMe} from '@store/slices/auth/AsyncThunks';
import {Spinner} from "@components/PreLoaders/Spinner/Spinner";
import {MainLayout} from "@components/Layouts/MainLayout/MainLayout";

export const HomePage: FC = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    if (isAuth === 'idle' || isAuth === 'failed') {
        return <Navigate to='/login'/>;
    }

    return (<>
            <MainLayout>
                <h1>Home</h1>
            </MainLayout>
            {isAuth === 'loading' && <Spinner className={styles.spinner}/>}
        </>
    );
};
