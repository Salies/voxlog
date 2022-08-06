import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

function MyApp({Component, pageProps}: any) {
	return <Component {...pageProps} className='w-screen' />;
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};

export default MyApp;
