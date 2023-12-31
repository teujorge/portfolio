"use client";

import delay from "@/utils/delay";
import { useState } from "react";
import { SvgTwoFingers } from "~/public/svg/two-fingers";
import { Toggle } from "../Toggle";
import { LabeledEarth } from "./LabeledEarth";
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
      <div className="reveal flex flex-col justify-center items-center">
        <div className="m-3">
          <Toggle
            leftText="2D"
            rightText="3D"
            state={is3D}
            onClick={changeDimensions}
          />
        </div>

        <div className="relative overflow-hidden flex flex-col justify-center items-center p-0 w-full rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-[var(--shadow-color)]">
          {/* use finger to move icon */}
          {is3D && (
            <div className="absolute bottom-8 right-10 w-10 h-10 -scale-x-100 -rotate-45 fill-[var(--foreground-color)]">
              <SvgTwoFingers className="w-10 h-10" />
            </div>
          )}

          {is3D ? (
            <div
              className="cursor-grab active:cursor-grabbing w-[80vw] h-[80vw] max-h-[80vh]"
              style={{
                filter: `grayscale(${earthLoaded ? 0 : 1}) blur(${
                  earthLoaded ? 0 : 200
                }px)`,
                transition: "filter 0.5s ease-in",
              }}
            >
              <LabeledEarth
                onLoad={() => delay(50).then(() => setEarthLoaded(true))}
              />
            </div>
          ) : (
            <div className="w-[80vw] h-[80vw]">
              <World />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
