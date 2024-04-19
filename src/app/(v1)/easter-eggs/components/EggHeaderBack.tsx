import { SvgBack } from "~/public/svg/back";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function EggHeaderBack({ isShowing }: { isShowing: boolean }) {
  const pathname = usePathname();

  return (
    <Link
      href={pathname == "/easter-eggs" ? "/" : "/easter-eggs"}
      className={`fixed top-14 left-3 flex flex-row items-center justify-start w-9 hover:w-20 h-9 rounded-full px-2 space-y-1 bg-slate-300 dark:bg-slate-900 cursor-pointer transition-all duration-300 overflow-clip
        ${isShowing ? "z-30" : "z-40"}
      `}
    >
      <SvgBack className="w-5 h-5 fill-slate-900 dark:fill-slate-300" />
      <div className="absolute left-9 -translate-y-0.5">back</div>
    </Link>
  );
}
