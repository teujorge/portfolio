"use client";

import Image from "next/image";
import worldMap from "public/images/world-map.webp";
import { useEffect, useState } from "react";

export const World = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [mapWidth, setMapWidth] = useState(350);
  const mapHeight = mapWidth * (worldMap.height / worldMap.width);

  useEffect(() => {
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

    function handleResize() {
      const newWidth = calculateMapWidth(window.innerWidth);
      if (newWidth) setMapWidth(newWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mapWidth]);

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

  return (
    <div className="flex flex-col justify-center items-center">
      {/* interactive map */}
      <div
        className="relative"
        style={{
          width: mapWidth,
          height: mapHeight,
        }}
      >
        {/* world map */}
        <Image
          className="z-0 invert dark:invert-0"
          style={{
            transform: `translate(
              ${mapWidth / 2 - CITIES_LIVED[currentCityIndex].position.x}px,
              ${mapHeight / 2 - CITIES_LIVED[currentCityIndex].position.y}px
            )`,
            transition: `transform ${timeToTravel}s ease`,
          }}
          src={worldMap}
          alt="world-map"
          quality={1}
          width={mapWidth}
          height={mapHeight}
          priority
        />

        {/* location marker */}
        <div
          className="z-10 absolute w-3 h-3 rounded-full bg-[var(--primary-color)]"
          style={{
            top: mapHeight / 2 - 5,
            left: mapWidth / 2 - 5,
          }}
        />

        {/* location label */}
        <div
          className="z-10 absolute flex justify-center items-center p-2 rounded-[var(--border-radius)] text-[#101010] bg-[#ffffffdd] dark:invert"
          style={{
            top: `${mapHeight / 2}px`,
            left: `${mapWidth / 2}px`,
          }}
        >
          <p>{CITIES_LIVED[currentCityIndex].name}</p>
        </div>
      </div>

      {/* slider to change time */}
      <input
        className="timeline-slider"
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
      <p className="p-2">
        Where I was in {CITIES_LIVED[currentCityIndex].year}
      </p>
    </div>
  );
};
