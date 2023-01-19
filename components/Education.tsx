import { css } from "@emotion/react";

export const Education = () => {
  const School = ({
    school,
    degree,
    city,
    date,
  }: {
    school: string;
    degree: string;

    city: string;
    date: string;
  }) => {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <h4>
          {degree}, {school}, {city}
        </h4>
        <p>{date ? date : "current"}</p>
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
      />

      <School
        school={"American School Foundation"}
        degree={"High School"}
        city={"Mexico City"}
        date={"2016"}
      />

      <School
        school={"American Community School"}
        degree={"High School"}
        city={"Abu Dhabi"}
        date={"2015"}
      />
    </div>
  );
};
