import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";

export const MOBILE_WIDTH = 1000;
export const windowSize = { width: 0, height: 0 };
export const AppContext = createContext({ isMobile: false });

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  // handle mobile v. desktop
  useEffect(() => {
    function handleResize() {
      windowSize.width = window.innerWidth;
      windowSize.height = window.innerHeight;

      const _isMobile = window.innerWidth <= MOBILE_WIDTH;
      if (isMobile !== _isMobile) setIsMobile(_isMobile);
    }
    handleResize(); // set initial state

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <AppContext.Provider value={{ isMobile: isMobile }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
