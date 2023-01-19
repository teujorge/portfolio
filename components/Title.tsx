/** @jsxImportSource @emotion/react */

import EarthImg from "../public/images/earth.png";
import Image from "next/image";
import MoonImg from "../public/images/moon.png";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export const Title = () => {
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
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
      `}
    >
      {/* earth */}
      <div
        css={css`
          z-index: -1;
          position: absolute;
          bottom: -20px;
          right: 0px;
          margin: 0px !important;
          width: min(30vw, 50vh);
          height: min(30vw, 50vh);
          max-width: 400px;
          max-height: 400px;
          filter: blur(${scrollPosition / 100}px);
          transform: translateY(${-scrollPosition * 1.2}px)
            rotateZ(${-scrollPosition / 10}deg);
          transform-origin: 0px 0px;
          transition: transform 0s linear;
        `}
      >
        <Image src={EarthImg} alt={"image-of-earth"} fill />
      </div>

      <div
        css={css`
          & * {
            margin: 4px;
          }

          & h1 {
            font-size: calc(20px + 5vw);
          }

          & h3 {
            font-size: calc(20px + 3vw);
          }

          & p {
            font-size: 18px;
          }

          @media (max-width: 800px) {
            margin: 10px !important;
          }
        `}
      >
        <p>Hi, my name is</p>
        <h1>Matheus Jorge.</h1>
        <h3>I engineer things!</h3>
        <p
          css={css`
            padding: 30px;
            max-width: 70%;

            @media (max-width: 800px) {
              max-width: 100%;
            }
          `}
        >
          I continuously develop my software skills by building and designing
          fun games exception embedded systems and everything in between.
        </p>
      </div>
    </div>
  );
};
