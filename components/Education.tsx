import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

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
    </div>
  );
};

export const Education = () => {
  return (
    <div>
      <h2>education</h2>

      <School
        school={"University of Vermont"}
        degree={"BS Mechanical Engineering"}
        city={"Burlington"}
        date={"2016-2020"}
      />

      <School
        school={"American School Foundation"}
        degree={"High School"}
        city={"Mexico City"}
        date={"2015-2016"}
      />

      <School
        school={"American Community School"}
        degree={"High School"}
        city={"Abu Dhabi"}
        date={"2008-2015"}
      />
    </div>
  );
};
