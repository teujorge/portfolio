import Image, { StaticImageData } from "next/image";
import ImgEarth from "../public/images/solar-system/3_earth.png";
import ImgJupiter from "../public/images/solar-system/5_jupiter.png";
import ImgMars from "../public/images/solar-system/4_mars.png";
import ImgMercury from "../public/images/solar-system/1_mercury.png";
import ImgNeptune from "../public/images/solar-system/8_neptune.png";
import ImgSaturn from "../public/images/solar-system/6_saturn.png";
import ImgUranus from "../public/images/solar-system/7_uranus.png";
import ImgVenus from "../public/images/solar-system/2_venus.png";
import { css, keyframes } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const SolarSystem = ({ scrollPosition }: { scrollPosition: number }) => {
  const SOLAR_SYSTEM = {
    mercury: {
      img: ImgMercury,
      r: 2440,
      d: 0.39,
      v: 47.87,
      theta: 123,
      key: "ss-planet-mercury",
    },
    venus: {
      img: ImgVenus,
      r: 6052,
      d: 0.72,
      v: 35.02,
      theta: 12,
      key: "ss-planet-venus",
    },
    earth: {
      img: ImgEarth,
      r: 6371,
      d: 1,
      v: 29.78,
      theta: 321,
      key: "ss-planet-earth",
    },
    mars: {
      img: ImgMars,
      r: 3390,
      d: 1.52,
      v: 24.077,
      theta: 60,
      key: "ss-planet-mars",
    },
    jupiter: {
      img: ImgJupiter,
      r: 69911,
      d: 5.2,
      v: 13.07,
      theta: 180,
      key: "ss-planet-jupiter",
    },
    saturn: {
      img: ImgSaturn,
      r: 58232,
      d: 9.54,
      v: 9.69,
      theta: 360,
      key: "ss-planet-saturn",
    },
    uranus: {
      img: ImgUranus,
      r: 25362,
      d: 19.2,
      v: 6.81,
      theta: 0,
      key: "ss-planet-uranus",
    },
    neptune: {
      img: ImgNeptune,
      r: 24622,
      d: 30.06,
      v: 5.43,
      theta: 270,
      key: "ss-planet-neptune",
    },
  };

  const solarSystemTransformed: {
    img: StaticImageData;
    r: number;
    d: number;
    v: number;
    theta: number;
    animation: string;
    key: string;
  }[] = [];

  for (const [key, value] of Object.entries(SOLAR_SYSTEM)) {
    const radius =
      (SOLAR_SYSTEM.earth.r + (value.r - SOLAR_SYSTEM.earth.r) / 5) / 200;
    const distance =
      (SOLAR_SYSTEM.earth.d + (value.d - SOLAR_SYSTEM.earth.d) / 10) * 100;
    const velocity = value.v;

    solarSystemTransformed.push({
      img: value.img,
      r: radius,
      d: distance,
      v: velocity,
      theta: value.theta,
      animation: keyframes`
      0% {
        transform: rotate(${value.theta}deg);
      }
      100% {
        transform: rotate(${value.theta + 360}deg);
      }
      `,
      key: value.key,
    });
  }

  return (
    <div className="solarSystem">
      {/* area to display w/out blur */}
      <div
        css={css`
          height: 250px;
        `}
      />

      {/* spinning solar system */}
      <div
        css={css`
          z-index: -1;

          position: fixed;
          bottom: 50px;
          right: 50px;

          display: flex;
          justify-content: left;
          align-items: center;

          margin: 0px !important;

          opacity: ${scrollPosition > 500 ? 1 : 0};
          filter: blur(20px);

          transition: opacity 1s ease, filter 1s ease;

          scale: 2;
        `}
      >
        {solarSystemTransformed.map((body) => (
          <div
            key={body.key}
            css={css`
              position: absolute;
              top: 0px;
              left: 0px;
              margin: 0px !important;
              padding-left: ${body.d}px;
              transform-origin: left;
              animation: ${body.animation} ${1000 / (body.v + 1)}s linear
                infinite;
            `}
          >
            <Image src={body.img} alt={body.key} width={body.r} quality={50} />
          </div>
        ))}
      </div>
    </div>
  );
};
