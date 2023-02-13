import flagMX from "public/images/flags/mx-flag.png";
import flagUAE from "public/images/flags/uae-flag.png";
import flagUSA from "public/images/flags/usa-flag.png";
import Image, { StaticImageData } from "next/image";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const Education = () => {
  const School = ({
    school,
    degree,
    city,
    date,
    image,
  }: {
    school: string;
    degree: string;
    city: string;
    date: string;
    image: { src: StaticImageData; alt: string };
  }) => {
    return (
      <div
        className="reveal"
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            margin-top: 0px !important;
            margin-bottom: 0px !important;
            margin-left: 10px !important;
            margin-right: 10px !important;
            text-align: center;
          `}
        >
          <h4>
            {degree}, {school}, {city}
          </h4>
          <p>{date ? date : "current"}</p>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={25}
          height={25}
          quality={100}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>education</h2>

      <School
        school={"University of Vermont"}
        degree={"BS Mechanical Engineering"}
        city={"Burlington"}
        date={"2020"}
        image={{ src: flagUSA, alt: "usa-flag" }}
      />

      <School
        school={"American School Foundation"}
        degree={"High School"}
        city={"Mexico City"}
        date={"2016"}
        image={{ src: flagMX, alt: "mx-flag" }}
      />

      <School
        school={"American Community School"}
        degree={"High School"}
        city={"Abu Dhabi"}
        date={"2015"}
        image={{ src: flagUAE, alt: "uae-flag" }}
      />
    </div>
  );
};
