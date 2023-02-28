/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Title = () => {
  return (
    <div
      className="section"
      css={css`
        height: 100vh;
      `}
    >
      {/* headers */}
      <div
        css={css`
          h1 {
            font-size: calc(20px + 5vw);
          }

          h3 {
            font-size: calc(20px + 3vw);
          }

          p {
            font-size: 18px;
          }
        `}
      >
        <p>Hi, my name is</p>
        <h1>Matheus Jorge.</h1>
        <h3>I engineer things!</h3>
      </div>

      {/* text */}
      <div
        css={css`
          margin: 30px;

          p {
            font-size: 18px;
            margin: 10px;
          }

          @media (max-width: 800px) {
            margin-left: 10px;
            margin-right: 10px;

            p {
              font-size: 17px;
            }
          }
        `}
      >
        <p>
          Whether I&apos;m designing and building fun games or working on
          complex web apps, I&apos;m constantly pushing myself to develop my
          software skills and take on new challenges. I believe that software
          engineering is more than just a job — it&apos;s a passion. And
          I&apos;m excited to share that passion with you through my portfolio.
          Explore my projects and experience, and let&apos;s engineer great
          things together!
        </p>
      </div>
    </div>
  );
};
