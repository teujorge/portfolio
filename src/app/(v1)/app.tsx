"use client";

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
      {children}
      <Header />
    </>
  );
}
