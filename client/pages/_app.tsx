import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

type AppProps = {
	Component: React.ComponentType;
	pageProps: any;
};
function MyApp({Component, pageProps}: AppProps) {
	return <Component {...pageProps} className='w-screen' />;
}

export default MyApp;
