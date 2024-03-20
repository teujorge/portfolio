"use client";

import BubblesBg from "@/components/BubblesBg";
import { inView } from "@/utils/inView";
import { Header } from "@/components/Header";
import { ReactNode, useEffect } from "react";

export const MOBILE_WIDTH = 1024;

export default function App({ children }: { children: ReactNode }) {
  useEffect(() => {
    function handleScroll() {
      inView({
        elements: document.querySelectorAll(".reveal"),
        elementVisibleThreshold: 75,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
        },
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <BubblesBg
        className="-z-10 !opacity-40 !dark:opacity-100"
        quantity={10}
        minSize={40}
        maxSize={80}
        minSpeed={10}
        maxSpeed={100}
      />
      {children}
      <Header />
    </>
  );
}
