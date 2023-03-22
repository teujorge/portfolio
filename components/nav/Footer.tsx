/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import IconEmail from "../../public/svg/envelope";
import IconGithub from "../../public/svg/github";
import IconLinkedIn from "../../public/svg/linkedin";
import IconResume from "../../public/svg/file";
import { DescPos, IconButton } from "./../IconButton";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [resumeLink, setResumeLink] = useState("/resume");

  useEffect(() => {
    setResumeLink(window.location.origin + "/resume.pdf");
  }, []);

  const iconSize = 50;
  const descPos = DescPos.top;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: left;

        width: 100vw;
        height: 100px;
      `}
    >
      <IconButton
        href={"https://github.com/teujorge"}
        src={IconGithub}
        size={iconSize}
        desc="GitHub"
        descPos={descPos}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={IconLinkedIn}
        size={iconSize}
        desc="LinkedIn"
        descPos={descPos}
      />

      <IconButton
        href={() => {
          document
            .getElementById("contact")!
            .scrollIntoView({ behavior: "smooth" });
        }}
        src={IconEmail}
        size={iconSize}
        desc="Email"
        descPos={descPos}
      />

      <IconButton
        href={resumeLink}
        src={IconResume}
        size={iconSize}
        desc="Resume"
        descPos={descPos}
      />
    </div>
  );
};
