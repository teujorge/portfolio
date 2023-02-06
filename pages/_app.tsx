import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { createContext, useState } from "react";

export const AppContext = createContext<{
  scrollPosition: number;
  setScrollPosition: Function;
}>({
  scrollPosition: 0,
  setScrollPosition: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <AppContext.Provider
      value={{
        scrollPosition: scrollPosition,
        setScrollPosition: setScrollPosition,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
