/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import Link from "next/link";
import { inView } from "@/utils/inView";
import { useEffect, useState } from "react";

const HeaderLink = ({ name, current }: { name: string; current: string }) => {
  return (
    <a
      css={css`
        font-weight: bold;
        text-decoration: underline;
        text-decoration-color: transparent;

        padding: 10px;
        color: ${name === current
          ? "var(--primary-color)"
          : "var(--foreground-color)"};

        transition: color 0.2 ease, text-decoration-color 0.2s ease;

        :hover {
          text-decoration-color: var(--primary-color);
        }
      `}
      onClick={() =>
        document.getElementById(name)!.scrollIntoView({ behavior: "smooth" })
      }
    >
      {name === current ? `/* ${name} */` : `// ${name}`}
    </a>
  );
};

export const Header = () => {
  const [section, setSection] = useState("home");
  const [atPosZero, setAtPosZero] = useState(true);

  // handle in view animation
  useEffect(() => {
    const navElements = [
      document.getElementById("home")!,
      document.getElementById("about")!,
      document.getElementById("projects")!,
      document.getElementById("experience")!,
      document.getElementById("education")!,
      document.getElementById("contact")!,
    ];

    function handleScroll() {
      inView({
        elements: navElements,
        elementVisibleThreshold: 100,
        inViewFn: (e, i) => {
          console.log(e);
          setSection(e.id);
        },
      });

      if (window.scrollY < 20) {
        setAtPosZero(true);
      } else {
        setAtPosZero(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      css={css`
        z-index: 100;
        position: fixed;
        top: 0px;
        left: 0px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        width: 100vw;
        height: 100px;

        background-color: ${atPosZero
          ? "transparent"
          : "var(--off-background-color)"};
        backdrop-filter: blur(${atPosZero ? 0 : 50}px);
        transition: background-color 0.2s ease, backdrop-filter 0.2s ease;

        a {
          cursor: pointer;
          margin: 10px;
          padding: 10px;
        }
      `}
    >
      <div>
        <HeaderLink name="home" current={section} />
      </div>

      <div>
        <HeaderLink name="about" current={section} />
        <HeaderLink name="projects" current={section} />
        <HeaderLink name="experience" current={section} />
        <HeaderLink name="education" current={section} />
      </div>

      <div>
        <HeaderLink name="contact" current={section} />
      </div>
    </nav>
  );
};
