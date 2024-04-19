export function EggHeaderBurger({
  isShowing,
  setIsShowing,
}: {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
}) {
  return (
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
  );
}
