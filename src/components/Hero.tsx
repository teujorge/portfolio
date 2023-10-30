"use client";

import delay from "@/utils/delay";
import { useEffect, useState } from "react";

const HEADERS = ["Engineer", "Front End", "Web Dev"];

export const Hero = () => {
  const [isTyping, setIsTyping] = useState(true);
  const [currentHeaderText, setCurrentHeaderText] = useState("");
  const [currentHeaderIndex, setCurrentHeaderIndex] = useState(0);

  useEffect(() => {
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
        await delay(Math.random() * 200 + 100);
      } else {
        currentHeader = currentHeader.substring(0, currentHeader.length - 1);
        await delay(60);
      }

      setIsTyping(typing);
      setCurrentHeaderText(currentHeader);
      setCurrentHeaderIndex(headerIndex);
    }

    updateHeader();
  }, [currentHeaderIndex, currentHeaderText, isTyping]);

  return (
    <div className="section flex flex-col justify-center items-center w-full min-h-screen">
      <h1>Matheus Jorge</h1>

      <p className="text-center w-full text-6xl font-thin mt-8">
        {currentHeaderText}
        <span className="w-5 h-1 inline-block rounded-[var(--border-radius)] bg-[var(--primary-color)] transform translate-y-[2px] animate-pulse" />
      </p>

      <div className="mt-20 w-[80%] h-1 rounded-[var(--border-radius)] bg-[var(--primary-color)]" />

      <button
        onClick={() =>
          document
            .getElementById("projects-section")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="mt-5"
      >
        View Projects
      </button>
    </div>
  );
};
