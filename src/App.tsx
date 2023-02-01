import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainLayout} from '@components/Layouts/MainLayout/MainLayout';
import {LoginPage} from '@pages/AuthPage/LoginPage/LoginPage';
import {RegistrationPage} from '@pages/AuthPage/RegistrationPage/RegistrationPage';
import {UploadFile} from '@components/VIdeoPlayer/UploadFile';
import {DashboardPage} from '@pages/DashboardPage/DashboardPage';
import {ChatPage} from '@pages/ChatPage/ChatPage';
import {CoursesPage} from '@pages/CoursePages/CoursesPage/CoursesPage';
import {SettingsPage} from '@pages/SettingsPage/SettingsPage';
import {CoursePage} from '@pages/CoursePages/CoursePage/CoursePage';
import {MePage} from '@pages/MePage/MePage';
import {LessonPage} from '@pages/CoursePages/LessonPage/LessonPage';
import './App.module.sass';
import {CreateLessonPage} from '@pages/CoursePages/CreateLessonPage/CreateLessonPage';
import {AuthPage} from '@pages/AuthPage/AuthPage/AuthPage';

export const App: FC = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout/>}>
					<Route index element={<DashboardPage/>}/>
					<Route path='courses' element={<CoursesPage/>}/>
					<Route path='course/:id' element={<CoursePage/>}/>
					<Route path='createLesson/:id' element={<CreateLessonPage/>}/>
					<Route path='lesson/:id' element={<LessonPage/>}/>
					<Route path='chat' element={<ChatPage/>}/>
					<Route path='settings' element={<SettingsPage/>}/>
					<Route path='me' element={<MePage/>}/>
				</Route>
				<Route path='/auth' element={<AuthPage/>}>
					<Route index element={<LoginPage/>}/>
					<Route path="register" element={<RegistrationPage/>}/>
				</Route>
				<Route path="/upload" element={<UploadFile/>}/>
			</Routes>
		</>
	);
};
