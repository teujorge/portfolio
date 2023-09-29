"use client";

import { createContext, useEffect, useState } from "react";
import { inView } from "@/utils/inView";
import BubblesBg from "@/components/BubblesBg";
import { LeftBar } from "@/components/LeftBar";

export const MOBILE_WIDTH = 1024;
export const windowSize = { width: 0, height: 0 };
export const AppContext = createContext({ isMobile: false });

export default function App({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });

    function handleResize() {
      windowSize.width = window.innerWidth;
      windowSize.height = window.innerHeight;

      const _isMobile = window.innerWidth <= MOBILE_WIDTH;
      if (isMobile !== _isMobile) setIsMobile(_isMobile);
    }
    handleResize(); // set initial state

    function handleScroll() {
      inView({
        elements: document.querySelectorAll(".reveal"),
        elementVisibleThreshold: 75,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
        },
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <AppContext.Provider value={{ isMobile: isMobile }}>
      <BubblesBg className="-z-10" />
      <LeftBar />
      {children}
    </AppContext.Provider>
  );
}
