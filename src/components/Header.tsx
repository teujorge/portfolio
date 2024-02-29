import { Position } from "@/utils/position";
import { SvgFile } from "~/public/svg/file";
import { SvgGithub } from "~/public/svg/github";
import { SvgLinkedIn } from "~/public/svg/linkedin";
import { IconButton } from "./IconButton";

export const Header = () => {
  const iconClassName = "w-6 h-6";

  return (
    <header className="z-30 md:fixed md:top-0 md:left-0 flex flex-row md:flex-col justify-center items-start w-full md:w-12 md:h-screen my-4">
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
    </header>
  );
};
