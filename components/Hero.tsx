/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import delay from "@/utils/delay";
import { useEffect, useState } from "react";

export const Hero = () => {
  const HEADERS = ["Engineer", "Front End", "Web Dev"];

  const [isTyping, setIsTyping] = useState(true);
  const [currentHeaderText, setCurrentHeaderText] = useState("");
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

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
  }, [currentHeaderText]);

  async function updateHeader() {
    let headerIndex = currentHeaderIndex;
    let currentHeader = currentHeaderText;
    let typing = isTyping;

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
      await delay(250);
    } else {
      currentHeader = currentHeader.substring(0, currentHeader.length - 1);
      await delay(100);
    }

    setIsTyping(typing);
    setCurrentHeaderText(currentHeader);
    setCurrentHeaderIndex(headerIndex);
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
          font-size: calc(40px + 5vw);
          text-align: center;
          width: 100%;
        }

        p {
          font-size: calc(20px + 3vw);
          margin-top: 10px;
          min-height: 2.5rem;
          text-align: center;
          width: 100%;
        }

        button {
          margin-top: 20px;
          width: fit-content;
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
        View Projects
      </button>
    </div>
  );
};
