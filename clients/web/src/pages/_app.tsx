import React from "react";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
type AppProps = {
  Component: React.ComponentType;
  pageProps: any;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased text-black lowercase bg-white dark:bg-neutral-900 dark:text-white">
      <AuthProvider userData={pageProps.userData}>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
