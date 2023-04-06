/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import IconCity from "../public/svg/city";
import IconMountain from "../public/svg/mountain";
import IconMountainSun from "../public/svg/mountain-sun";
import { AppContext } from "@/pages/_app";
import { useContext } from "react";

const School = ({
  school,
  degree,
  city,
  country,
  date,
  description,
  icon,
}: {
  school: string;
  degree: string;
  city: string;
  country: string;
  date: string;
  description: string;
  icon: JSX.Element;
}) => {
  const { isMobile } = useContext(AppContext);

  return (
    <div
      className="reveal"
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 40px;

        border-right: 2px solid var(--primary-color);

        @media (max-width: 800px) {
          flex-direction: column;
          margin-left: 0px;
          margin-right: 0px;

          border-right: 0px solid transparent;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;

          margin: 40px;
          @media (max-width: 800px) {
            margin: 10px;
          }
        `}
      >
        <h3 className="reveal">
          {degree}, {school}, {city}, {country}
        </h3>
        <p
          className="reveal"
          css={css`
            font-size: 13px;
          `}
        >
          {date ? date : "current"}
        </p>
        <p
          className="reveal"
          css={css`
            margin: 10px;
          `}
        >
          {description}
        </p>
      </div>
      {!isMobile && (
        <div
          className="reveal"
          css={css`
            display: flex;

            margin-right: 40px;

            width: 40px;
            height: 40px;

            svg {
              width: 40px;
              height: 40px;
              fill: black;
            }

            @media (max-width: 800px) {
              margin-right: 0px;
            }

            @media (prefers-color-scheme: dark) {
              svg {
                fill: white;
              }
            }
          `}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export const Education = () => {
  return (
    <div className="section">
      <h2>Education</h2>

      <School
        school={"University of Vermont"}
        degree={"BS Mechanical Engineering"}
        city={"Burlington"}
        country={"USA"}
        date={"2016-2020"}
        description={`
          The University of Vermont is a public research 
          university located in Burlington, Vermont, a 
          beautiful city nestled in the heart of the Green 
          Mountains. As a BS Mechanical Engineering major with 
          a Computer Science Minor, I have been part of a 
          rigorous academic program that emphasized hands-on 
          learning, innovation, and sustainability. Outside of 
          the classroom, I worked in the Universities' 
          Fabrication Laboratory, enjoyed outdoor activities 
          like skiing and hiking, and explored the food and 
          culture scene.
        `}
        icon={IconMountain}
      />

      <School
        school={"American School Foundation"}
        degree={"High School"}
        city={"Mexico City"}
        country={"MX"}
        date={"2015-2016"}
        description={`
          Mexico City is a vibrant metropolis in the heart of 
          Mexico, with a  rich history and culture. Studying 
          in Mexico City for my last year of high school has 
          exposed me to a new range of cultural traditions 
          and amazing foods. I have also had the chance to 
          practice my Spanish language skills and engage with 
          the local community.
        `}
        icon={IconCity}
      />

      <School
        school={"American Community School"}
        degree={"High School"}
        city={"Abu Dhabi"}
        country={"UAE"}
        date={"2008-2015"}
        description={`
          Abu Dhabi is the capital city of the United Arab 
          Emirates and a hub of culture, commerce, and 
          education in the Middle East. Studying in Abu Dhabi 
          for middle and high school has given me a unique 
          perspective on this dynamic region, with opportunities 
          to learn about Arabic language and culture, engage 
          with a diverse student body, and explore amazing 
          landmarks.
        `}
        icon={IconMountainSun}
      />
    </div>
  );
};
