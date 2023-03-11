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
import Link from "next/link";
/** @jsxImportSource @emotion/react */

export default function Home() {
  // handle in view animation
  useEffect(() => {
    window.scrollTo({ top: 0 });

    const revealElements = document.querySelectorAll(".reveal");

    function handleScroll() {
      inView({
        elements: revealElements,
        elementVisibleThreshold: 100,
        inViewFn: (e, i) => {
          e.classList.add("revealShowing");
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
        <title>Matheus&apos;s Portfolio</title>
        <meta
          name="description"
          content={`Explore my experience and background with software engineering. 
          Browse through my projects and accomplishments to learn more about my skills and expertise.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Bubbles />
      <LeftBar />

      <Link
        css={css`
          z-index: 100;
          cursor: hover;
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 8px;
        `}
        href={"demo"}
      >
        easter egg?
      </Link>

      <main>
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
