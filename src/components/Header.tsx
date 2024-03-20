import { Position } from "@/utils/position";
import { SvgFile } from "~/public/svg/file";
import { SvgGithub } from "~/public/svg/github";
import { SvgLinkedIn } from "~/public/svg/linkedin";
import { IconButton } from "./IconButton";

export const Header = () => {
  const iconClassName = "w-6 h-6";

  return (
    <header className="z-30 flex flex-row justify-center items-start w-full my-4">
      <IconButton
        href={"https://github.com/teujorge"}
        src={<SvgGithub className={iconClassName} />}
        desc="GitHub"
        descPos={Position.top}
      />

      <IconButton
        href={"https://www.linkedin.com/in/matheus-jorge/"}
        src={<SvgLinkedIn className={iconClassName} />}
        desc="LinkedIn"
        descPos={Position.top}
      />
    </header>
  );
};
