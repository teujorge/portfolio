import Head from "next/head";
import { About } from "@/components/About";
import { css } from "@emotion/react";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { inView } from "@/utils/inView";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { Title } from "@/components/Title";
import { useEffect } from "react";
import { World } from "@/components/World";
import Bubbles from "@/components/Bubbles";
/** @jsxImportSource @emotion/react */

export default function Home() {
  // handle in view animation
  useEffect(() => {
    window.scrollTo({ top: 0 });

    const revealElements = document.querySelectorAll(".reveal");
    const solarSystemElement = document.querySelectorAll(".solarSystem");

    function handleScroll() {
      inView({
        elements: revealElements,
        elementVisibleThreshold: 100,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
        },
      });

      inView({
        elements: solarSystemElement,
        elementVisibleThreshold: 150,
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

  return (
    <>
      <Head>
        <title>Matheus Jorge&apos;s Portfolio</title>
        <meta name="description" content="Portfolio of Matheus Jorge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Bubbles />

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
        <LeftBar />
        <Title />
        <About />
        <Experience />
        <Projects />
        <Education />
        <World />
      </main>
    </>
  );
}
