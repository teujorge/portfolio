import { easterEggRoutes } from "../routes";
import { HeaderLink } from "./HeaderLink";

export function EggHeaderMenu({ isShowing }: { isShowing: boolean }) {
  return (
    <div
      className={`z-40 fixed top-3 left-3 w-2/3 md:w-1/2 lg:w-1/3 max-h-[100svh] rounded-3xl bg-slate-200 dark:bg-slate-800 origin-top-left transition-all ease-in-out duration-300 shadow-lg
          ${isShowing ? "translate-x-0" : "-translate-x-[150%]"}
        `}
    >
      <header className="flex flex-col items-start justify-center w-full p-8">
        <HeaderLink className="text-lg font-bold" href="/" label="Portfolio" />
        <HeaderLink
          className="text-lg font-bold"
          href="/easter-eggs"
          label="Easter Eggs"
        />
        {Object.entries(easterEggRoutes).map(([key, route]) => (
          <HeaderLink
            key={key}
            className="pl-6 text-base font-light"
            href={route.href}
            label={route.title}
          />
        ))}
      </header>
    </div>
  );
}
