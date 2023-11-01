"use client";

import delay from "@/utils/delay";
import { useEffect, useState } from "react";

const HEADERS = ["Engineer", "Front End", "Web Dev"];

export const TypeWriter = () => {
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
    <p className="text-center w-full text-4xl sm:text-6xl font-thin mt-8">
      {currentHeaderText}
      <span className="w-5 h-1 inline-block rounded-[var(--border-radius)] bg-[var(--primary-color)] transform translate-y-[2px] animate-pulse" />
    </p>
  );
};
