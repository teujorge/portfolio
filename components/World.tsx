/** @jsxImportSource @emotion/react */
import Image from "next/image";
import worldMap from "public/images/flags/world-map.png";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

export const World = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [mapWidth, setMapWidth] = useState(350);
  const mapHeight = (mapWidth * 3) / 5;

  function calculateMapWidth(screenWidth: number) {
    if (screenWidth < 500) return 350;
    else if (screenWidth < 750) return 400;
    else if (screenWidth < 1000) return 650;
    else if (screenWidth < 1250) return 900;

    return 1000;
  }

  useEffect(() => {
    setMapWidth(calculateMapWidth(window.innerWidth));

    function handleResize() {
      setMapWidth(calculateMapWidth(window.innerWidth));
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
      position: { x: 0.155 * mapWidth, y: 0.545 * mapHeight },
    },
    {
      name: "salvador",
      year: 1998,
      position: { x: 0.365 * mapWidth, y: 0.725 * mapHeight },
    },
    {
      name: "bogota",
      year: 1999,
      position: { x: 0.27 * mapWidth, y: 0.66 * mapHeight },
    },
    {
      name: "quito",
      year: 2001,
      position: { x: 0.2625 * mapWidth, y: 0.6825 * mapHeight },
    },
    {
      name: "abu dhabi",
      year: 2008,
      position: { x: 0.613 * mapWidth, y: 0.58 * mapHeight },
    },
    {
      name: "mexico city",
      year: 2015,
      position: { x: 0.2 * mapWidth, y: 0.59 * mapHeight },
    },
    {
      name: "boston",
      year: 2016,
      position: { x: 0.2825 * mapWidth, y: 0.483 * mapHeight },
    },
    {
      name: "burlington",
      year: 2017,
      position: { x: 0.28 * mapWidth, y: 0.48 * mapHeight },
    },
    {
      name: "clearwater",
      year: 2020,
      position: { x: 0.247 * mapWidth, y: 0.562 * mapHeight },
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

  return (
    <div
      className="reveal"
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: visible;
        border-radius: 50px;
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
      />

      {/* location label */}
      <div
        css={css`
          margin: 0px !important;
          padding: 6px;

          z-index: 10;
          position: absolute;
          top: ${8 + mapHeight / 2}px;
          left: ${8 + mapWidth / 2}px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 8px;
          color: #101010;
          background-color: #ffffffdd;

          @media (prefers-color-scheme: dark) {
            filter: invert(1);
          }
        `}
      >
        <p>{CITIES_LIVED[currentCityIndex].name}</p>
      </div>

      {/* location dot marker */}
      <div
        css={css`
          margin: 0px !important;

          z-index: 10;
          position: absolute;
          top: ${5 + mapHeight / 2}px;
          left: ${5 + mapWidth / 2}px;

          width: 10px;
          height: 10px;

          border-radius: 50%;
          background-color: #04aa6d;

          @media (prefers-color-scheme: dark) {
            filter: invert(1);
          }
        `}
      />

      {/* slider to change time */}
      <input
        css={css`
          z-index: 10;
          -webkit-appearance: none; /* Override default CSS styles */
          appearance: none;
          width: 100%;
          height: 18px;
          border-radius: 50px;
          background-color: #d3d3d3;
          outline: none; /* Remove outline */
          opacity: 0.65; /* Set transparency (for mouse-over effects on hover) */
          -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
          transition: all 0.2s ease;

          /* Mouse-over effects */
          :hover,
          :active {
            opacity: 1; /* Fully shown on mouse-over */
          }

          ::-webkit-slider-thumb {
            -webkit-appearance: none; /* Override default look */
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #04aa6d;
            cursor: pointer;
            transition: width 0.2s ease, height 0.2s ease;
          }
          ::-webkit-slider-thumb:hover,
          ::-webkit-slider-thumb:active {
            width: 26px;
            height: 26px;
          }

          @media (prefers-color-scheme: dark) {
            filter: invert(1);
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
        {CITIES_LIVED[currentCityIndex].year}
      </p>
    </div>
  );
};
