/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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
      css={css`
        cursor: pointer;
        user-select: none;
        overflow: hidden;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: ${width}px;
        height: ${height}px;

        border-radius: 100px;
        background-color: var(--foreground-color);
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          width: ${width * 1.5}px;
          height: ${height}px;

          transform: translateX(${state ? -width / 4 : width / 4}px);
          transition: transform 0.2s ease;

          p {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            font-size: 10px;
            margin: 2px;

            width: ${width / 3}px;

            color: var(--background-color);
            transition: opacity 0.2s ease;
          }
        `}
        onClick={handleToggle}
      >
        <p
          css={css`
            opacity: ${state ? 0 : 1};
          `}
        >
          {leftText}
        </p>
        <div
          css={css`
            width: ${height - ballPadding}px;
            height: ${height - ballPadding}px;

            border-radius: 50%;

            background-color: var(--primary-color);
            box-shadow: 0px 0px 8px var(--shadow-color);
          `}
        />
        <p
          css={css`
            opacity: ${state ? 1 : 0};
          `}
        >
          {rightText}
        </p>
      </div>
    </div>
  );
};
