"use client";

import BubblesBg from "@/components/BubblesBg";
import { LeftBar } from "@/components/LeftBar";
import { inView } from "@/utils/inView";
import { useEffect } from "react";

export const MOBILE_WIDTH = 1024;
export const windowSize = { width: 0, height: 0 };

export default function App({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function handleResize() {
      windowSize.width = window.innerWidth;
      windowSize.height = window.innerHeight;
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
  }, []);

  return (
    <>
      <BubblesBg className="-z-10" />
      {children}
      <LeftBar />
    </>
  );
}
