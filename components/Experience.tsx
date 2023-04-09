/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import IconCode from "../public/svg/code";
import IconSystem from "../public/svg/nodes";
import IconTerminal from "../public/svg/terminal";
import { AppContext } from "@/pages/_app";
import { useContext } from "react";

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
  const { isMobile } = useContext(AppContext);

  const date = start
    ? end
      ? `${start} - ${end}`
      : `${start}`
    : end
    ? `${end}`
    : "current";

  return (
    <div
      className="reveal"
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        margin: 30px;
        border-left: 2px solid var(--primary-color);

        @media (max-width: 800px) {
          flex-direction: column;
          margin-left: 0px;
          margin-right: 0px;
          border-left: 0px solid transparent;
        }
      `}
    >
      {/* icon */}
      {!isMobile && (
        <div
          className="reveal"
          css={css`
            display: flex;

            margin-left: 30px;

            width: 40px;
            height: 40px;

            svg {
              width: 40px;
              height: 40px;
              fill: black;
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

      {/* texts */}
      <div
        className="reveal"
        css={css`
          margin-top: 10px;
          margin-bottom: 10px;
          margin-left: 30px;
          margin-right: 30px;

          p {
            margin-top: 4px;
          }

          @media (max-width: 800px) {
            margin-left: 0px;
            margin-right: 0px;
          }
        `}
      >
        <h4>
          {title}
          {employer ? `, ${employer}` : ""}
          {city ? `, ${city}` : ""}
        </h4>
        <p
          css={css`
            font-size: 13px;
          `}
        >
          {date ? date : "current"}
        </p>
        <ul>
          {desc.map((description, index) => (
            <div
              key={`description-${title}-${index}`}
              className="reveal"
              css={css`
                margin: 20px;
              `}
            >
              <li>
                <p>{description}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <div className="subsection">
      <h3>Experience</h3>

      <Job
        icon={IconCode}
        title={"Freelance Software Engineer"}
        desc={[
          `Increased profitability for 
          Zid store owners by developing a web-based 
          dashboard that streamlined inventory management 
          resulting in a dramatic increase in efficiency when editing products.`,

          `Improved user experience and functionality 
          for multiple clients by utilizing strong 
          problem-solving skills and meticulous attention 
          to detail to deliver high-quality software 
          solutions on time and within budget.`,

          `Led the development and deployment of Co Pilot, 
          a web-based platform that connects individuals 
          with freelance professionals.`,
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
          `Successfully coded and tested software changes 
          and enhancements based on design specifications, 
          reducing testing time per unit by 5%.`,

          `Collaborated closely with internal clients to 
          identify their needs and priorities, and then 
          designed customized solutions that met their 
          unique requirements.`,

          `Streamlined the manufacturing process by 
          maintaining and updating factory equipment, 
          resulting in a 10% reduction in equipment 
          downtime, resulting in an increase to product 
          output.`,
        ]}
      />

      <Job
        icon={IconSystem}
        title={"Systems Engineer Intern"}
        employer={"BendixKing"}
        city={"Albuquerque"}
        end={"2019"}
        desc={[
          `Developed and executed comprehensive integration 
          test plans for iterative software builds, resulting 
          in a 15% reduction in software defects.`,

          `Programmed autonomous processes to efficiently 
          test systems, improving testing rigor and 
          increasing testing efficiency by 20%.`,
        ]}
      />
    </div>
  );
};
