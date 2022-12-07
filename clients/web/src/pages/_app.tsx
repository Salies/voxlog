import React from "react";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../components/navbar";
type AppProps = {
  Component: React.ComponentType;
  pageProps: any;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased text-black bg-white dark:bg-neutral-900 dark:text-white">
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}

export default MyApp;
