import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
import './vendor/reset.css';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

const root = createRoot(document.querySelector('#root') as HTMLElement);


const darkTheme = localStorage.getItem('darkTheme');
if (darkTheme === 'true' || (darkTheme == null && window.matchMedia?.('(prefers-color-scheme: dark)')?.matches))
	document.body.classList.add('darkTheme');

root.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);
