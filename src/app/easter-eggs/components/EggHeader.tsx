"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SvgBack } from "~/public/svg/back";
import { HeaderLink } from "./HeaderLink";
import { easterEggRoutes } from "../routes";

export function EggHeader() {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      {/* opaque bg */}
      <div
        onClick={() => setIsShowing(false)}
        className={`z-40 fixed top-0 left-0 right-0 bottom-0 bg-slate-200 dark:bg-slate-900 transition-opacity ease-in-out duration-300
          ${
            isShowing
              ? "cursor-pointer opacity-50"
              : "pointer-events-none cursor-default opacity-0"
          }
        `}
      />

      {/* menu */}
      <div
        className={`z-40 fixed top-3 left-3 w-2/3 md:w-1/2 lg:w-1/3 max-h-[100svh] rounded-3xl bg-slate-200 dark:bg-slate-800 origin-top-left transition-all ease-in-out duration-300 shadow-lg
        ${isShowing ? "translate-x-0" : "-translate-x-[150%]"}`}
      >
        <header className="flex flex-col items-start justify-center w-full p-8">
          <HeaderLink
            className="text-lg font-bold"
            href="/"
            label="Portfolio"
          />
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

      {/* burger button */}
      <div
        onClick={() => setIsShowing(!isShowing)}
        className="z-50 fixed top-3 left-3 flex flex-col items-center justify-center w-9 h-9 rounded-full px-2 space-y-1 bg-slate-300 dark:bg-slate-900 cursor-pointer transition-transform duration-300"
      >
        <div
          className={`w-full h-0.5 bg-slate-900 dark:bg-slate-200 rounded-full transform transition-all duration-300 
            ${isShowing ? "rotate-45 translate-y-1.5" : ""}
          `}
        />
        <div
          className={`w-full h-0.5 bg-slate-900 dark:bg-slate-200 rounded-full transition-opacity duration-300 
            ${isShowing ? "opacity-0" : "opacity-100"}
          `}
        />
        <div
          className={`w-full h-0.5 bg-slate-900 dark:bg-slate-200 rounded-full transform transition-all duration-300
            ${isShowing ? "-rotate-45 -translate-y-1.5" : ""}
          `}
        />
      </div>

      <div
        onClick={() => router.back()}
        className={`fixed top-14 left-3 flex flex-row items-center justify-start w-9 hover:w-20 h-9 rounded-full px-2 space-y-1 bg-slate-300 dark:bg-slate-900 cursor-pointer transition-all duration-300 overflow-clip
          ${isShowing ? "z-30" : "z-40"}
        `}
      >
        <SvgBack className="w-5 h-5 fill-slate-900 dark:fill-slate-300" />
        <div className="absolute left-9 -translate-y-0.5"> back </div>
      </div>
    </>
  );
}
