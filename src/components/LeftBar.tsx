"use client";

import IconMessage from "~/public/svg/message";
import IconGithub from "~/public/svg/github";
import IconLinkedIn from "~/public/svg/linkedin";
import IconResume from "~/public/svg/file";
import { IconButton } from "./IconButton";
import { Position } from "@/utils/position";

export const LeftBar = () => {
  return (
    <div className="z-50 fixed top-0 left-0 flex flex-col justify-center items-start w-12 h-screen">
      <IconButton
        href={"https://github.com/teujorge"}
        src={IconGithub}
        size={40}
        desc="GitHub"
        descPos={Position.right}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={IconLinkedIn}
        size={40}
        desc="LinkedIn"
        descPos={Position.right}
      />

      <IconButton
        href={"#contact-me"}
        src={IconMessage}
        size={40}
        desc="Message"
        descPos={Position.right}
      />

      <IconButton
        href={"/resume.pdf"}
        src={IconResume}
        size={40}
        desc="Resume"
        descPos={Position.right}
      />
    </div>
  );
};
