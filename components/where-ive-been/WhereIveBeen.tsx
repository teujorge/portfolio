/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { LabeledEarth } from "./LabeledEarth";
import { World } from "./World";
import { Toggle } from "../Toggle";
import { useState } from "react";

export const IWasHere = () => {
  const [is3D, setIs3D] = useState(true);

  function changeDimensions(onOff: boolean) {
    setIs3D(onOff);
  }

  return (
    <div className="section">
      <h2>Where I&apos;ve Been</h2>
      <div
        className="reveal"
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            margin: 10px;
          `}
        >
          <Toggle
            leftText="2D"
            rightText="3D"
            state={is3D}
            onClick={changeDimensions}
          />
        </div>

        <div
          css={css`
            overflow: hidden;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            padding: 0px;

            border-radius: var(--border-radius);
            background-color: var(--off-background-color);
            box-shadow: 0px 0px 8px var(--shadow-color);
          `}
        >
          {is3D ? (
            <div
              css={css`
                width: 75vw;
                height: 75vw;
                max-height: 75vh;
              `}
            >
              <LabeledEarth />
            </div>
          ) : (
            <div
              css={css`
                width: 75vw;
                height: auto;
              `}
            >
              <World />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
