/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import EyeFollows from "./EyeFollows";

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

        @media (max-width: 800px) {
          flex-direction: column;
        }
      `}
    >
      {/* headers */}
      <div
        css={css`
          min-height: 40vh;
          display: flex;
          flex-direction: column;
          justify-content: center;

          h1 {
            font-size: calc(20px + 6vw);
            font-weight: black;

            background: linear-gradient(to right, #d87300, #da1b60);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            @media (prefer-color=scheme: dark) {
              background: linear-gradient(to right, #ff8a00, #ec1d69);
            }
          }

          h3 {
            font-size: calc(20px + 3vw);
            font-weight: 400;
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

      {/* eye */}

      <div
        css={css`
          padding: 20px;

          border-radius: var(--border-radius);
          background-color: white;
          box-shadow: 0px 0px 8px var(--shadow-color);

          @media (prefers-color-scheme: dark) {
            background-color: black;
          }
        `}
      >
        <EyeFollows />
      </div>
    </div>
  );
};
