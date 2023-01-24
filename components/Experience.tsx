import IconCode from "../public/svg/code";
import IconDiagram from "../public/svg/diagram";
import IconTerminal from "../public/svg/terminal";
import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

export const Experience = () => {
  const Job = ({
    icon,
    title,
    employer,
    start,
    end,
    city,
    desc,
  }: {
    icon: any;
    title: string;
    employer?: string;
    start?: string;
    end?: string;
    city?: string;
    desc: string[];
  }) => {
    const date = start
      ? end
        ? `${start} - ${end}`
        : `${start}`
      : end
      ? `${end}`
      : "current";

    let description = "";
    desc.forEach((line) => (description += line + " "));

    return (
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-left: 2px solid purple;

          @media (max-width: 800px) {
            flex-direction: column;
            margin: 0px !important;
            border-left: 0px solid transparent !important;
          }

          @media (prefers-color-scheme: dark) {
            border-left: 2px solid cyan;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            margin-right: 0px !important;
            width: 40px;
            height: 40px;

            @media (max-width: 800px) {
              margin: 0px !important;
              margin-top: 20px !important;
            }

            @media (prefers-color-scheme: dark) {
              filter: invert();
            }
          `}
        >
          {icon}
        </div>
        <div
          css={css`
            & p {
              margin-top: 4px;
            }

            @media (max-width: 800px) {
              margin: 10px !important;
            }
          `}
        >
          <h4>
            {title} {employer ? `, ${employer}` : ""} {city ? `, ${city}` : ""}
          </h4>
          <p
            css={css`
              font-size: 13px;
            `}
          >
            {date ? date : "current"}
          </p>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>experience</h2>

      <Job
        icon={IconCode}
        title={"Freelance Software Engineer"}
        desc={[
          "Implemented and updated application modules under the direction of Software Lead.",
          "Successfully completed several freelance projects, with strong customer satisfaction rate.",
          "Efficiently managed and executed personal projects, according to established objectives and timelines.",
        ]}
      />

      <Job
        icon={IconTerminal}
        title={"Test Software Engineer"}
        employer={"Honeywell Aerospace"}
        city={"Clearwater"}
        start={"2020"}
        end={"2022"}
        desc={[
          "Worked as a productive and positive team member to design, code, test, report, and debug software.",
          "Effectively coded software changes and alterations based on specific design specifications.",
          "Supported product manufacturing by maintaining and updating factory equipment.",
        ]}
      />

      <Job
        icon={IconDiagram}
        title={"Systems Engineer Intern"}
        employer={"BendixKing"}
        city={"Albuquerque"}
        end={"2019"}
        desc={[
          "Worked as a passionate and dedicated Intern in the Engineering Department.",
          "Created and performed integration test plans for iterative software builds.",
          "Successfully tested systems using autonomous processes.",
          "Documented and communicated test results.",
        ]}
      />
    </div>
  );
};
