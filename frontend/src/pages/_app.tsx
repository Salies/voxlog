import React from "react";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Navbar from "../components/navbar";
import localFont from "@next/font/local";

const firanerd = localFont({
  src: "./../assets/FuraMonoRegularNerdFontCompleteMono.otf",
});

type AppProps = {
  Component: React.ComponentType;
  pageProps: any;
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased text-black bg-white dark:bg-neutral-900 dark:text-white">
      <style jsx global>
        {`
          :root {
            --firanerd: ${firanerd.style.fontFamily};
          }
        `}
      </style>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}

export default MyApp;
