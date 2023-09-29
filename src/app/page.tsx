"use client";

import Bubbles from "@/components/Bubbles";
import Head from "next/head";
import { About } from "@/components/About";
import { AppContext } from "./app";
import { Contact } from "@/components/Contact";
import { inView } from "@/utils/inView";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { Hero } from "@/components/Hero";
import { useContext, useEffect } from "react";

export default function Home() {
  const { isMobile } = useContext(AppContext);

  // handle in view animation
  useEffect(() => {
    window.scrollTo({ top: 0 });

    const revealElements = document.querySelectorAll(".reveal");

    function handleScroll() {
      inView({
        elements: revealElements,
        elementVisibleThreshold: 75,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
        },
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <>
      <Head>
        <title>Matheus&apos;s Portfolio</title>
        <meta
          name="description"
          content={`Explore my experience and background with software engineering. 
          Browse through my projects and accomplishments to learn more about my skills and expertise.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/mjIcon.webp" />
      </Head>

      <Bubbles />
      <LeftBar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  );
}
