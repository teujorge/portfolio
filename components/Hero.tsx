/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import delay from "@/utils/delay";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [currentHeaderText, setCurrentHeaderText] = useState("");

  const blinkAnimation = keyframes`
    0% {
      background-color: var(--primary-color);
    }
    50% {
      background-color: transparent;
    }
    100% {
      background-color: var(--primary-color);
    }
  `;

  useEffect(() => {
    updateHeader();
  }, []);

  async function updateHeader() {
    const HEADERS = ["Software Engineer", "Front End", "Web Dev"];

    let headerIndex = 0;
    let currentHeader = "";
    let typing = true;

    while (true) {
      if (typing) await delay(250);
      else await delay(100);

      // begin erasing
      if (currentHeader.length >= HEADERS[headerIndex].length) {
        await delay(1000);
        typing = false;
      }

      // next header
      else if (currentHeader.length === 0) {
        await delay(500);
        typing = true;
        headerIndex++;
        if (headerIndex >= HEADERS.length) {
          headerIndex = 0;
        }
      }

      if (typing) {
        currentHeader += HEADERS[headerIndex][currentHeader.length];
      } else {
        currentHeader = currentHeader.substring(0, currentHeader.length - 1);
      }

      setCurrentHeaderText(currentHeader);
    }
  }

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
          align-items: center;
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

          p {
            font-size: 1.7rem;
            margin-top: 10px;
            margin-bottom: 30px;
            min-height: 2.5rem;
          }

          button {
            width: fit-content;
          }

          @media (max-width: 900px) {
            margin: 10px;

            h1,
            h3 {
              text-align: center;
            }

            p {
              font-size: 1.25rem;
            }
          }
        `}
      >
        <h1>Matheus Jorge</h1>

        <p>
          {currentHeaderText}
          <span
            css={css`
              width: 20px;
              height: 4px;
              display: inline-block;
              border-radius: var(--border-radius);
              background-color: var(--primary-color);
              transform: translateY(2px);
              animation: ${blinkAnimation} 1s infinite;
            `}
          />
        </p>

        <button
          onClick={() =>
            document
              .getElementById("projects-section")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View My Projects
        </button>
      </div>
    </div>
  );
};
