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
    year: string;
    position: { x: number; y: number };
  }[] = [
    {
      name: "san diego",
      year: "1997",
      position: { x: 0.155 * mapWidth, y: 0.545 * mapHeight },
    },
    {
      name: "salvador",
      year: "1998",
      position: { x: 0.365 * mapWidth, y: 0.725 * mapHeight },
    },
    {
      name: "bogota",
      year: "1999",
      position: { x: 0.27 * mapWidth, y: 0.66 * mapHeight },
    },
    {
      name: "quito",
      year: "2001",
      position: { x: 0.2625 * mapWidth, y: 0.6825 * mapHeight },
    },
    {
      name: "abu dhabi",
      year: "2008",
      position: { x: 0.613 * mapWidth, y: 0.58 * mapHeight },
    },
    {
      name: "burlington",
      year: "2017",
      position: { x: 0.28 * mapWidth, y: 0.48 * mapHeight },
    },
  ];

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

        @media (prefers-color-scheme: dark) {
          filter: invert(1);
        }
      `}
    >
      {/* world map */}
      <Image
        css={css`
          transform: translate(
            ${mapWidth / 2 - CITIES_LIVED[currentCityIndex].position.x}px,
            ${mapHeight / 2 - CITIES_LIVED[currentCityIndex].position.y}px
          );
          transition: transform 0.3s ease;
          filter: invert(0);

          @media (prefers-color-scheme: dark) {
            filter: invert(1);
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

          z-index: 10;
          position: absolute;
          top: ${CITIES_LIVED[currentCityIndex].position.y}px;
          left: ${CITIES_LIVED[currentCityIndex].position.x}px;

          width: 10px;
          height: 10px;

          border-radius: 50%;
          background-color: cyan;

          transform: translate(
            ${mapWidth / 2 - CITIES_LIVED[currentCityIndex].position.x}px,
            ${mapHeight / 2 - CITIES_LIVED[currentCityIndex].position.y}px
          );
          transition: transform 0.3s ease, top 0.3s ease, left 0.3s ease;
        `}
      />
      <div
        css={css`
          margin: 0px !important;
          padding: 6px;

          z-index: 10;
          position: absolute;
          top: ${CITIES_LIVED[currentCityIndex].position.y + 6}px;
          left: ${CITIES_LIVED[currentCityIndex].position.x + 6}px;

          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 8px;
          color: #f0f0f0;
          background-color: #000000dd;

          transform: translate(
            ${mapWidth / 2 - CITIES_LIVED[currentCityIndex].position.x}px,
            ${mapHeight / 2 - CITIES_LIVED[currentCityIndex].position.y}px
          );
          transition: transform 0.3s ease, top 0.3s ease, left 0.3s ease;
        `}
      >
        <p>
          {CITIES_LIVED[currentCityIndex].name}{" "}
          {CITIES_LIVED[currentCityIndex].year}
        </p>
      </div>

      {/* location dot marker */}
      <button
        css={css`
          z-index: 12;
          cursor: pointer;
          font-size: inherit;
          font-family: inherit;

          margin: 10px;
          padding: 6px;

          border: 2px solid #000;
          border-radius: 8px;

          color: #f0f0f0;
          background-color: #000000dd;
          transition: background-color 0.2s ease;

          :hover {
            color: #fff;
            background-color: #000;
          }
        `}
        onClick={() => {
          if (currentCityIndex >= CITIES_LIVED.length - 1) {
            setCurrentCityIndex(0);
          } else {
            setCurrentCityIndex(currentCityIndex + 1);
          }
        }}
      >
        <p>next</p>
      </button>
    </div>
  );
};
