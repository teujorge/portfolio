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
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        min-height: 100vh;

        h1 {
          font-size: calc(30px + 4vw);
          font-weight: black;
          /* color: var(--primary-color); */
          text-align: left;
          width: 100%;
        }

        p {
          font-size: calc(40px + 4vw);
          margin-top: 10px;
          margin-bottom: 30px;
          min-height: 2.5rem;
          text-align: left;
          width: 100%;
        }

        button {
          margin-top: 20px;
          width: fit-content;
        }

        @media (max-width: 1000px) {
          h1 {
            text-align: center;
          }

          p {
            text-align: center;
          }
        }
      `}
    >
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

      <h1>Matheus Jorge</h1>

      <div
        css={css`
          margin: 80px;

          width: 80%;
          height: 5px;

          border-radius: 50%;
          background-color: var(--primary-color);
        `}
      />

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
  );
};
