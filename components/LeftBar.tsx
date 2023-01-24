import IconEmail from "../public/svg/envelope.svg";
import IconGithub from "../public/svg/github.svg";
import IconLinkedIn from "../public/svg/linkedin.svg";
import IconResume from "../public/svg/file.svg";
import { css } from "@emotion/react";
import { IconButton } from "./IconButton";
/** @jsxImportSource @emotion/react */

export const LeftBar = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0px;
        left: 0px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: left;

        margin: 0px !important;

        width: 50px;
        height: 100vh;
      `}
    >
      <IconButton
        href={"https://github.com/teujorge"}
        src={IconGithub}
        alt={"matheus-jorge-github"}
        size={40}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={IconLinkedIn}
        alt={"matheus-jorge-linkedin"}
        size={40}
      />

      <IconButton
        href={"mailto:mrljorge@outlook.com"}
        src={IconEmail}
        alt={"matheus-jorge-email"}
        size={40}
      />

      <IconButton
        href={
          "https://raw.githubusercontent.com/teujorge/teujorge.github.io/master/assets/images/resume_2022.png"
        }
        src={IconResume}
        alt={"matheus-jorge-resume"}
        size={40}
      />
    </div>
  );
};
