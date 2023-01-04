import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';
import './vendor/reset.css';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);
