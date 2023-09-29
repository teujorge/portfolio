/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

import Image from "next/image";
import worldMap from "public/images/world-map.webp";
import { useEffect, useState } from "react";

export const World = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [mapWidth, setMapWidth] = useState(350);
  const mapHeight = mapWidth * (worldMap.height / worldMap.width);

  function calculateMapWidth(screenWidth: number) {
    if (screenWidth < 500) {
      if (mapWidth === 350) return undefined;
      return 350;
    } else if (screenWidth < 750) {
      if (mapWidth === 400) return undefined;
      return 400;
    } else if (screenWidth < 1000) {
      if (mapWidth === 650) return undefined;
      return 650;
    } else if (screenWidth < 1250) {
      if (mapWidth === 900) return undefined;
      return 900;
    }

    return 1000;
  }

  useEffect(() => {
    handleResize();

    function handleResize() {
      const newWidth = calculateMapWidth(window.innerWidth);
      if (newWidth) setMapWidth(newWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CITIES_LIVED: {
    name: string;
    year: number;
    position: { x: number; y: number };
  }[] = [
    {
      name: "san diego",
      year: 1997,
      position: { x: 0.167 * mapWidth, y: 0.564 * mapHeight },
    },
    {
      name: "salvador",
      year: 1999,
      position: { x: 0.375 * mapWidth, y: 0.745 * mapHeight },
    },
    {
      name: "bogota",
      year: 2000,
      position: { x: 0.285 * mapWidth, y: 0.675 * mapHeight },
    },
    {
      name: "quito",
      year: 2004,
      position: { x: 0.27 * mapWidth, y: 0.695 * mapHeight },
    },
    {
      name: "abu dhabi",
      year: 2008,
      position: { x: 0.62 * mapWidth, y: 0.59 * mapHeight },
    },
    {
      name: "mexico city",
      year: 2015,
      position: { x: 0.207 * mapWidth, y: 0.605 * mapHeight },
    },
    {
      name: "boston",
      year: 2016,
      position: { x: 0.287 * mapWidth, y: 0.5125 * mapHeight },
    },
    {
      name: "burlington",
      year: 2017,
      position: { x: 0.28 * mapWidth, y: 0.5 * mapHeight },
    },
    {
      name: "clearwater",
      year: 2020,
      position: { x: 0.257 * mapWidth, y: 0.58 * mapHeight },
    },
    {
      name: "salvador",
      year: 2022,
      position: { x: 0.375 * mapWidth, y: 0.745 * mapHeight },
    },
  ];

  // two points to compare
  const p1 = CITIES_LIVED[currentCityIndex].position;
  const p0 =
    CITIES_LIVED[
      currentCityIndex === 0 ? CITIES_LIVED.length - 1 : currentCityIndex - 1
    ].position;

  // v = d/t
  const mapVelocity = 1000;

  // d = d1 - d0
  const distanceToTravel = Math.sqrt(
    Math.pow(p0.x + p1.x, 2) + Math.pow(p0.y + p0.y, 2)
  );

  // t = d/v
  const timeToTravel = distanceToTravel / mapVelocity;

  const shimmerAnimation = keyframes` 
    0% {
      left: -110%;
    }
    100% {
      left: 110%;
    }
  `;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      {/* interactive map */}
      <div
        css={css`
          position: relative;
          width: ${mapWidth}px;
          height: ${mapHeight}px;
        `}
      >
        {/* world map */}
        <Image
          css={css`
            z-index: 1;
            transform: translate(
              ${mapWidth / 2 - CITIES_LIVED[currentCityIndex].position.x}px,
              ${mapHeight / 2 - CITIES_LIVED[currentCityIndex].position.y}px
            );
            transition: transform ${timeToTravel}s ease;

            filter: invert(1);
            @media (prefers-color-scheme: dark) {
              filter: invert(0);
            }
          `}
          src={worldMap}
          alt="world-map"
          quality={1}
          width={mapWidth}
          height={mapHeight}
          priority
        />

        {/* location dot marker */}
        <div
          css={css`
            z-index: 11;
            position: absolute;
            top: ${mapHeight / 2 - 5}px;
            left: ${mapWidth / 2 - 5}px;

            width: 10px;
            height: 10px;

            border-radius: 50%;
            background-color: var(--primary-color);
          `}
        />

        {/* location dot label */}
        <div
          css={css`
            margin: 0px !important;
            padding: 6px;

            z-index: 10;
            position: absolute;
            top: ${mapHeight / 2}px;
            left: ${mapWidth / 2}px;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: var(--border-radius);
            color: #101010;
            background-color: #ffffffdd;

            @media (prefers-color-scheme: dark) {
              filter: invert(1);
            }
          `}
        >
          <p>{CITIES_LIVED[currentCityIndex].name}</p>
        </div>
      </div>

      {/* slider to change time */}
      <input
        css={css`
          overflow: hidden;
          position: relative;
          cursor: pointer;
          z-index: 10;
          -webkit-appearance: none; /* Override default CSS styles */
          appearance: none;
          padding: 10px;
          width: 80%;
          max-width: 80vw;
          height: 24px;
          border-radius: 50px;
          background-color: #e8e8e8;
          outline: none; /* Remove outline */
          opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
          -webkit-transition: 0.3s; /* 0.2 seconds transition on hover */
          transition: all 0.3s ease;

          /* mouse-over effects */
          :hover,
          :active {
            opacity: 0.9; /* fully shown on mouse-over */
          }

          ::before {
            content: "";
            position: absolute;
            z-index: 10;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            opacity: 0.75;
            background: linear-gradient(
              to right,
              transparent,
              #f7f7f7,
              transparent
            );
            animation: ${shimmerAnimation} 3s infinite;
          }

          ::-webkit-slider-thumb {
            z-index: 20;
            -webkit-appearance: none; /* Override default look */
            appearance: none;

            width: 40px;
            height: 14px;

            opacity: 1;
            border-radius: var(--border-radius);
            background: var(--primary-color);

            transition: all 0.3s ease;
          }
          ::-webkit-slider-thumb:hover,
          ::-webkit-slider-thumb:active {
            transform: scale(1.1);
          }
        `}
        type="range"
        min={0}
        max={CITIES_LIVED.length - 1}
        step={0.01}
        value={currentCityIndex}
        onChange={(event) => {
          const chosenIndex = Math.round(Number(event.target.value));

          if (chosenIndex !== currentCityIndex) {
            setCurrentCityIndex(chosenIndex);
          }
        }}
      />

      {/* time label for input range slider */}
      <p
        css={css`
          padding: 10px;
        `}
      >
        Where I was in {CITIES_LIVED[currentCityIndex].year}
      </p>
    </div>
  );
};
