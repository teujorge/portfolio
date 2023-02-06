import EarthImg from "../public/images/earth.png";
import Image from "next/image";
import { css } from "@emotion/react";
import { useContext } from "react";
import { AppContext } from "@/pages/_app";
/** @jsxImportSource @emotion/react */

export const Title = () => {
  const { scrollPosition } = useContext(AppContext);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 0px !important;
        height: 100vh;
      `}
    >
      {/* earth */}
      <div
        css={css`
          z-index: -1;
          position: absolute;
          bottom: -50px;
          right: 25px;
          margin: 0px !important;
          width: min(30vw, 50vh);
          height: min(30vw, 50vh);
          max-width: 400px !important;
          max-height: 400px !important;
          border-radius: 50%;
          overflow: hidden;
          transform: translateY(${-scrollPosition * 1.2}px)
            rotateZ(${scrollPosition / 10}deg);
          transition: transform 0.05s ease-out;
        `}
      >
        <Image src={EarthImg} alt={"planet-earth"} quality={25} fill priority />
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
          fun games, exception embedded systems and everything in between.
        </p>
      </div>
    </div>
  );
};
