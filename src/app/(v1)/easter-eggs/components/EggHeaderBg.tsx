export function EggHeaderBg({
  isShowing,
  setIsShowing,
}: {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
}) {
  return (
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
  );
}
