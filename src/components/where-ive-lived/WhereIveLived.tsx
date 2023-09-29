/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import TwoFinger from "@/public/svg/two-finger";
import delay from "@/utils/delay";
import { LabeledEarth } from "./LabeledEarth";
import { Toggle } from "../Toggle";
import { useState } from "react";
import { World } from "./World";

export const IWasHere = () => {
  const [is3D, setIs3D] = useState(true);
  const [earthLoaded, setEarthLoaded] = useState(false);

  function changeDimensions(onOff: boolean) {
    setIs3D(onOff);

    if (!onOff) setEarthLoaded(false);
  }

  return (
    <div className="subsection">
      <h3>Where I&apos;ve Lived</h3>
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
            position: relative;
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
          {is3D && (
            <div
              css={css`
                position: absolute;
                bottom: 30px;
                right: 30px;

                width: 40px;
                height: 40px;

                transform: scaleX(-1) rotate(40deg);

                svg {
                  width: 40px;
                  height: 40px;
                  fill: var(--foreground-color);
                }
              `}
            >
              {TwoFinger}
            </div>
          )}

          {is3D ? (
            <div
              css={css`
                cursor: grab;

                width: 75vw;
                height: 75vw;
                max-height: 75vh;

                filter: grayscale(${earthLoaded ? 0 : 1})
                  blur(${earthLoaded ? 0 : 200}px);
                transition: filter 0.5s ease-in;

                :active {
                  cursor: grabbing;
                }
              `}
            >
              <LabeledEarth
                onLoad={() => {
                  delay(50).then(() => setEarthLoaded(true));
                }}
              />
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
