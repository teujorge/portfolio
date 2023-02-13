import Head from "next/head";
import { About } from "@/components/About";
import { AppContext } from "./_app";
import { Contact } from "@/components/Contact";
import { css } from "@emotion/react";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { inView } from "@/utils/inView";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { SolarSystem } from "@/components/SolarSystem";
import { Title } from "@/components/Title";
import { useContext, useEffect, useMemo } from "react";
/** @jsxImportSource @emotion/react */

export default function Home() {
  const { setScrollPosition } = useContext(AppContext);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const solarSystemElement = document.querySelectorAll(".solarSystem");

    // handle scroll position state and in view animation
    function handleScroll() {
      setScrollPosition(window.scrollY);
      inView({
        elements: revealElements,
        elementVisibleThreshold: 150,
        forgetfulScroll: false,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
        },
      });
      inView({
        elements: solarSystemElement,
        elementVisibleThreshold: 150,
        forgetfulScroll: false,
        aboveViewFn: (e, i) => {
          e.classList.remove("revealSolarSystem");
        },
        inViewFn: (e, i) => {
          e.classList.add("revealSolarSystem");
        },
        belowViewFn: (e, i) => {
          e.classList.remove("revealSolarSystem");
        },
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // // prevent re-render
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
        <Title />
        {memoAbout}
        {memoExperience}
        {memoProjects}
        {memoEducation}
        {/* memoContact */}
        <SolarSystem />
      </main>
    </>
  );
}
