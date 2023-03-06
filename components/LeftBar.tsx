import IconEmail from "../public/svg/envelope";
import IconGithub from "../public/svg/github";
import IconLinkedIn from "../public/svg/linkedin";
import IconResume from "../public/svg/file";
import { css } from "@emotion/react";
import { DescPos, IconButton } from "./IconButton";
/** @jsxImportSource @emotion/react */

export const LeftBar = () => {
  return (
    <div
      css={css`
        z-index: 100;
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
        size={40}
        desc="GitHub"
        descPos={DescPos.right}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={IconLinkedIn}
        size={40}
        desc="LinkedIn"
        descPos={DescPos.right}
      />

      <IconButton
        href={"mailto:mrljorge@outlook.com"}
        src={IconEmail}
        size={40}
        desc="Email"
        descPos={DescPos.right}
      />

      <IconButton
        href={"https://resume.io/r/gtFDsZNxN"}
        src={IconResume}
        size={40}
        desc="Resume"
        descPos={DescPos.right}
      />
    </div>
  );
};
