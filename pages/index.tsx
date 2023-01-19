/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { Title } from "@/components/Title";
import Head from "next/head";

export default function Home() {
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
        <Title />
        <About />
        <Experience />
        <Projects />
        <Education />
        {/* <Contact /> */}
      </main>
    </>
  );
}
