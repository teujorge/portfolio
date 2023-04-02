/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Title = () => {
  return (
    <div
      className="section"
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        min-height: 100vh;

        @media (max-width: 900px) {
          flex-direction: column;
        }
      `}
    >
      {/* headers */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 20px;

          h1 {
            font-size: calc(30px + 4vw);
            font-weight: black;
            color: var(--primary-color);
          }

          h3 {
            font-size: calc(18px + 1vw);
            font-weight: 400;
            opacity: 0.9;
          }

          @media (max-width: 900px) {
            margin: 10px;

            h1,
            h3 {
              text-align: center;
            }
          }
        `}
      >
        <h1>Matheus Jorge</h1>
        <div
          css={css`
            margin: 30px;

            p {
              margin-top: 20px;
            }

            @media (max-width: 800px) {
              margin: 10px;
            }
          `}
        >
          <h3>
            Whether I&apos;m designing and building fun games or working on
            complex web apps, I&apos;m constantly pushing myself to develop my
            software skills and take on new challenges. I believe that software
            engineering is more than just a job — it&apos;s a passion. And
            I&apos;m excited to share that passion with you through my
            portfolio. Explore my projects and experience, and let&apos;s
            engineer great things together!
          </h3>
        </div>
      </div>
    </div>
  );
};
