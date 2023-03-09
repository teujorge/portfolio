import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

const School = ({
  school,
  degree,
  city,
  country,
  date,
  description,
}: {
  school: string;
  degree: string;
  city: string;
  country: string;
  date: string;
  description: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 40px;

        @media (max-width: 800px) {
          margin-left: 10px;
          margin-right: 10px;
        }
      `}
    >
      <div
        className="reveal"
        css={css`
          margin: 10px;
          text-align: center;

          p {
            font-style: italic;
          }
        `}
      >
        <h3>
          {degree}, {school}, {city}, {country}
        </h3>
        <p className="reveal">{date ? date : "current"}</p>
      </div>
      <p className="reveal">{description}</p>
    </div>
  );
};

export const Education = () => {
  return (
    <div className="section">
      <h2>education</h2>

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
          like skiing and hiking, and explored the local food 
          and culture scene.
        `}
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
          exposed me to a new range of cultural traditions, 
          from the Aztec ruins at Teotihuacan to the colorful 
          neighborhoods of Coyoacán and Roma. I have also had 
          the chance to practice your Spanish language skills 
          and engage with the local community.
        `}
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
      />
    </div>
  );
};
