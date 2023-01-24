import Head from "next/head";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { css } from "@emotion/react";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { SolarSystem } from "@/components/SolarSystem";
import { Title } from "@/components/Title";
import { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    function handleScroll() {
      const position = window.scrollY;
      setScrollPosition(position);
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
        <Title scrollPosition={scrollPosition} />
        <About />
        <Experience />
        <Projects />
        <Education />
        {/* <Contact /> */}
        <SolarSystem scrollPosition={scrollPosition} />
      </main>
    </>
  );
}
