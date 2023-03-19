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
            font-size: calc(20px + 4vw);
            font-weight: black;

            background: linear-gradient(to right, #d87300, #da1b60);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            @media (prefer-color=scheme: dark) {
              background: linear-gradient(to right, #ff8a00, #ec1d69);
            }
          }

          h3 {
            font-size: calc(18px + 1vw);
            font-weight: 400;
            opacity: 0.9;
          }

          @media (max-width: 900px) {
            h1,
            h3 {
              text-align: center;
            }
          }
        `}
      >
        <h1>Matheus Jorge.</h1>
        <h3>An engineer who sees the big picture and the small details!</h3>
      </div>

      {/* eye */}
      <EyeFollows />
    </div>
  );
};
