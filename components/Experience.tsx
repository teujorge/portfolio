import IconCode from "../public/svg/code.svg";
import IconDiagram from "../public/svg/diagram.svg";
import IconTerminal from "../public/svg/terminal.svg";
import Image from "next/image";
import { css } from "@emotion/react";

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
    icon: { src: any; alt: string };
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
          }

          @media (prefers-color-scheme: dark) {
            border-left: 2px solid cyan;
          }
        `}
      >
        <div
          css={css`
            margin-right: 0px !important;

            @media (max-width: 800px) {
              margin: 10px !important;
            }

            @media (prefers-color-scheme: dark) {
              filter: invert();
            }
          `}
        >
          <Image src={icon.src} alt={icon.alt} width={40} height={40} />
        </div>
        <div>
          <h4>
            {title} {employer ? `, ${employer}` : ""} {city ? `, ${city}` : ""}
          </h4>
          <p>{date ? date : "current"}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>experience</h2>

      <Job
        icon={{ src: IconCode, alt: "code-icon" }}
        title={"Freelance Software Engineer"}
        desc={[
          "Implemented and updated application modules under the direction of Senior Software Developers.",
          "Successfully completed several freelance projects, with strong customer satisfaction rate.",
          "Efficiently managed and executed personal projects, according to established objectives and timelines.",
        ]}
      />

      <Job
        icon={{ src: IconTerminal, alt: "terminal-icon" }}
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
        icon={{ src: IconDiagram, alt: "diagram-icon" }}
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
