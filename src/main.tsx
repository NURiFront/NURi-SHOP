import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { AntdThemeProvider } from './providers/AntdThemeProvider.tsx';
import { ReduxProvider } from './providers/ReduxProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ProtectRoute } from './providers/ProtectRoute.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AntdThemeProvider>
			<ReduxProvider>
				<BrowserRouter>
					<ProtectRoute>
						<App />
					</ProtectRoute>
				</BrowserRouter>
			</ReduxProvider>
		</AntdThemeProvider>
	</React.StrictMode>
);
