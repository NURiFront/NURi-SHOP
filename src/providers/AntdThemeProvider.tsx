import { FC, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

interface AntdThemeProviderProps {
	children: ReactNode;
}

export const AntdThemeProvider: FC<AntdThemeProviderProps> = ({ children }) => {
	const antdThemeConfig = {
		algorithm: theme.darkAlgorithm,
		token: {
			colorPrimary: '#9336fd',
			// borderRadius: 2,
			colorBgContainer: '#2a2a2a'
		}
	};

	return (
		<>
			<ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
		</>
	);
};
