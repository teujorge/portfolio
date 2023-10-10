"use client";

import { Position } from "@/utils/position";
import { SvgFile } from "~/public/svg/file";
import { SvgGithub } from "~/public/svg/github";
import { SvgLinkedIn } from "~/public/svg/linkedin";
import { SvgMessage } from "~/public/svg/message";
import { IconButton } from "./IconButton";

export const LeftBar = () => {
  const iconClassName = "w-6 h-6";

  return (
    <header className="z-50 fixed top-0 left-0 flex flex-col justify-center items-start w-12 h-screen">
      <IconButton
        href={"https://github.com/teujorge"}
        src={<SvgGithub className={iconClassName} />}
        desc="GitHub"
        descPos={Position.right}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={<SvgLinkedIn className={iconClassName} />}
        desc="LinkedIn"
        descPos={Position.right}
      />

      <IconButton
        href={"#contact-me"}
        src={<SvgMessage className={iconClassName} />}
        desc="Message"
        descPos={Position.right}
      />

      <IconButton
        href={"/resume.pdf"}
        src={<SvgFile className={iconClassName} />}
        desc="Resume"
        descPos={Position.right}
      />
    </header>
  );
};
