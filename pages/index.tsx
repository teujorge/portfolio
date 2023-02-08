import Head from "next/head";
import inView from "@/utils/inView";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { css } from "@emotion/react";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { SolarSystem } from "@/components/SolarSystem";
import { Title } from "@/components/Title";
import { useState, useEffect, useMemo } from "react";
/** @jsxImportSource @emotion/react */

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const solarSystemElement = document.querySelectorAll(".solarSystem");

    // handle scroll in view animation
    function handleScroll() {
      inView({
        elements: revealElements,
        elementVisibleThreshold: 150,
        forgetfulScroll: false,
        inViewFn: (e, i) => {
          if (!e.classList.contains("revealShowing")) {
            e.classList.add("revealShowing");
          }
        },
      });

      inView({
        elements: solarSystemElement,
        elementVisibleThreshold: 150,
        forgetfulScroll: false,
        aboveViewFn: (e, i) => {
          if (e.classList.contains("revealSolarSystem")) {
            e.classList.remove("revealSolarSystem");
          }
        },
        inViewFn: (e, i) => {
          if (!e.classList.contains("revealSolarSystem")) {
            e.classList.add("revealSolarSystem");
          }
        },
        belowViewFn: (e, i) => {
          if (e.classList.contains("revealSolarSystem")) {
            e.classList.remove("revealSolarSystem");
          }
        },
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // handle scroll position state
    function handleScroll() {
      const scrollDiff = Math.abs(scrollPosition - window.scrollY);
      if (scrollDiff > 5) setScrollPosition(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // prevent re-render
  const memoLeftBar = useMemo(LeftBar, []);
  const memoAbout = useMemo(About, []);
  const memoExperience = useMemo(Experience, []);
  const memoProjects = useMemo(Projects, []);
  const memoEducation = useMemo(Education, []);
  const memoContact = useMemo(Contact, []);

  return (
    <>
      <Head>
        <title>Matheus Jorge&apos;s Portfolio</title>
        <meta name="description" content="Portfolio of Matheus Jorge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          & div {
            margin: 40px;
            max-width: var(--max-width);
          }
        `}
      >
        {memoLeftBar}
        <Title scrollPosition={scrollPosition} />
        {memoAbout}
        {memoExperience}
        {memoProjects}
        {memoEducation}
        {/* memoContact */}
        <SolarSystem scrollPosition={scrollPosition} />
      </main>
    </>
  );
}
