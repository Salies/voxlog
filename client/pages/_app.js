import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
function MyApp({ Component, pageProps }) {
  return (
    <section className="bg-white dark:bg-black dark:text-white tracking-tight">
      <Component {...pageProps} />
    </section>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
