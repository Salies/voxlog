import React from 'react';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Navbar from '../components/navbar';
type AppProps = {
	Component: React.ComponentType;
	pageProps: any;
};
function MyApp({Component, pageProps}: AppProps) {
	return (
		<div className='font-sans antialiased bg-white text-black dark:bg-neutral-900 dark:text-white'>
			<Navbar />
			<Component {...pageProps} />;
		</div>
	);
}

export default MyApp;
