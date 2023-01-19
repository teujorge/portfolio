import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { css } from "@emotion/react";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { LeftBar } from "@/components/LeftBar";
import { Projects } from "@/components/Projects";
import { Title } from "@/components/Title";

export default function Home() {
  return (
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
  );
}
