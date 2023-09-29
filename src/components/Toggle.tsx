type ToggleProps = {
  leftText?: string;
  rightText?: string;
  state: boolean;
  onClick?: (newDirection: boolean) => void;
};

export const Toggle = ({
  leftText = "on",
  rightText = "off",
  state,
  onClick,
}: ToggleProps) => {
  function handleToggle() {
    if (onClick) onClick(!state);
  }

  const width = 54;
  const height = 26;
  const ballPadding = 8;

  return (
    <div
      className="cursor-pointer select-none overflow-hidden flex justify-center items-center bg-[var(--foreground-color)] rounded-full"
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        className="flex justify-center items-center transition-transform duration-300 ease-in"
        onClick={handleToggle}
        style={{
          width: width * 1.5,
          height: height,
          transform: `translateX(${state ? -width / 4 : width / 4}px)`,
        }}
      >
        <p
          className="flex justify-center items-center mr-1 text-xs text-[var(--background-color)] transition-opacity duration-300 ease-in"
          style={{
            width: width / 3,
            opacity: state ? 0 : 1,
          }}
        >
          {leftText}
        </p>
        <div
          className="rounded-full bg-[var(--primary-color)] shadow-md"
          style={{
            width: `${height - ballPadding}px`,
            height: `${height - ballPadding}px`,
          }}
        />
        <p
          className="flex justify-center items-center ml-1 text-xs text-[var(--background-color)] transition-opacity duration-300 ease-in"
          style={{
            width: width / 3,
            opacity: state ? 1 : 0,
          }}
        >
          {rightText}
        </p>
      </div>
    </div>
  );
};
