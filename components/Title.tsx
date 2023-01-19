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

  const moonTranslator = `${-scrollPosition * 3}px`;
  const earthTranslator = `${-scrollPosition * 1.2}px`;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
      `}
    >
      <div
        css={css({
          position: "absolute",
          bottom: "-20px",
          right: "50px",
          width: "min(30vw, 50vh)",
          height: "min(30vw, 50vh)",
          maxWidth: "400px",
          maxHeight: "400px",
          transform: `translateY(${earthTranslator})`,
          transition: "transform .1s ease-out",
        })}
      >
        <Image src={EarthImg} alt={"image-of-earth"} fill />
      </div>

      <div
        css={css({
          position: "absolute",
          bottom: "-50px",
          right: "0px",
          width: "min(8vw, 10vh)",
          height: "min(8vw, 10vh)",
          maxWidth: "80px",
          maxHeight: "80px",
          transform: `translateY(${moonTranslator})`,
          transition: "transform .1s ease-out",
        })}
      >
        <Image src={MoonImg} alt={"image-of-moon"} fill />
      </div>

      <div
        css={css`
          /* background-color: red; */

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
              max-width: 80%;
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
