import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainLayout} from '@components/Layouts/MainLayout/MainLayout';
import {LoginPage} from '@pages/LoginPage/LoginPage';
import {RegistrationPage} from '@pages/RegistrationPage/RegistrationPage';
import {UploadFile} from "@components/UploadFile";
import {DashboardPage} from "@pages/DashboardPage/DashboardPage";
import {ChatPage} from "@pages/ChatPage/ChatPage";
import {CoursesPage} from "@pages/CoursesPage/CoursesPage";
import {SettingsPage} from "@pages/SettingsPage/SettingsPage";
import {CoursePage} from "@pages/CoursePage/CoursePage";
import {AuthLayout} from "@components/Layouts/AuthLayout/AuthLayout";
import {MePage} from "@pages/MePage/MePage";
import './App.module.sass';

export const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                        <Route index element={<DashboardPage/>}/>
                        <Route path='courses' element={<CoursesPage/>}/>
                        <Route path='course/:id' element={<CoursePage/>}/>
                        <Route path='chat' element={<ChatPage/>}/>
                        <Route path='settings' element={<SettingsPage/>}/>
                        <Route path='me' element={<MePage/>}/>
                </Route>
                <Route path='/auth' element={<AuthLayout/>}>
                    <Route index element={<LoginPage/>}/>
                    <Route path="register" element={<RegistrationPage/>}/>
                </Route>
                <Route path="/upload" element={<UploadFile/>}/>
            </Routes>
        </>
    );
};
