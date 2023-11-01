"use client";

import Bubbles from "bubbles-bg";
import { useState } from "react";
import { LabeledInput } from "./components/LabeledInput";
import { SvgBack } from "~/public/svg/back";

type BubblesProps = {
  quantity: number;
  blur: number;
  minSpeed: number;
  maxSpeed: number;
  minSize: number;
  maxSize: number;
  colors?: {
    r: number;
    g: number;
    b: number;
    a: number;
  }[];
  className?: string;
};

const DEFAULT_BUBBLES_PROPS: BubblesProps = {
  quantity: 50,
  blur: 100,
  minSpeed: 50,
  maxSpeed: 100,
  minSize: 25,
  maxSize: 55,
};

export default function BubblesBg() {
  const [bubblesProps, setBubblesProps] = useState<BubblesProps>(
    DEFAULT_BUBBLES_PROPS
  );
  const [showInterface, setShowInterface] = useState<boolean>(true);
  const [isChoosingColors, setIsChoosingColors] = useState<boolean>(false);

  function onChangeQuantity(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(e.target.value);
    setBubblesProps((prevProps) => {
      if (isNaN(value)) {
        return { ...prevProps, quantity: 0 };
      }
      if (value > prevProps.quantity) {
        if (value > 10000) {
          alert("too many bubbles... sorry 🫤");
          return prevProps;
        } else if (value > 1000) {
          alert("that's a lot of bubbles...");
        }
      }
      return { ...prevProps, quantity: value };
    });
  }

  function onChangeBlur(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(e.target.value);
    setBubblesProps((prevProps) => {
      return isNaN(value)
        ? { ...prevProps, blur: 0 }
        : { ...prevProps, blur: value };
    });
  }

  function onChangeMinSpeed(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseFloat(e.target.value);
    setBubblesProps((prevProps) => {
      return isNaN(value)
        ? { ...prevProps, minSpeed: 0 }
        : { ...prevProps, minSpeed: value };
    });
  }

  function onChangeMaxSpeed(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseFloat(e.target.value);
    setBubblesProps((prevProps) => {
      return isNaN(value)
        ? { ...prevProps, maxSpeed: 0 }
        : { ...prevProps, maxSpeed: value };
    });
  }

  function onChangeMinSize(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(e.target.value);
    setBubblesProps((prevProps) => {
      return isNaN(value)
        ? { ...prevProps, minSize: 0 }
        : { ...prevProps, minSize: value };
    });
  }

  function onChangeMaxSize(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(e.target.value);
    setBubblesProps((prevProps) => {
      return isNaN(value)
        ? { ...prevProps, maxSize: 0 }
        : { ...prevProps, maxSize: value };
    });
  }

  function onChangeColors(
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ): void {
    const value = e.target.value;
    setBubblesProps((prevProps) => {
      if (value === "") return prevProps;
      if (value === "#000000") return prevProps;

      // add a color
      if (index === undefined) {
        const newColor = hexToRgba(value);

        // check if the color already exists in the array
        if (
          prevProps.colors?.some(
            (color) =>
              color.r === newColor.r &&
              color.g === newColor.g &&
              color.b === newColor.b
          )
        ) {
          return prevProps;
        }

        return {
          ...prevProps,
          colors: [...(prevProps.colors ?? []), newColor],
        };
      }

      // change specific color
      const colors = prevProps.colors ?? [];
      colors[index] = hexToRgba(value);

      return {
        ...prevProps,
        colors: colors,
      };
    });
  }

  function rgbaToHex(r: number, g: number, b: number): string {
    const hex = (value: number): string => {
      const hex = value.toString(16);

      return hex.length === 1 ? `0${hex}` : hex;
    };

    const hexValue = `#${hex(r)}${hex(g)}${hex(b)}`;

    return hexValue;
  }

  function hexToRgba(hex: string): {
    r: number;
    g: number;
    b: number;
    a: number;
  } {
    const value = hex.replace("#", "");
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);

    const rgbaValue = {
      r: isNaN(r) ? 255 : r,
      g: isNaN(g) ? 255 : g,
      b: isNaN(b) ? 255 : b,
      a: 255,
    };

    return rgbaValue;
  }

  return (
    <main className="relative w-screen h-screen bg-[var(--background-color)]">
      {/* bubbles background show */}
      <Bubbles {...bubblesProps} />

      {/* command interface */}
      <div
        className={`absolute top-6 right-2 flex flex-col items-center justify-start max-h-[75%] p-2 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md transition-transform overflow-y-scroll
          ${showInterface ? "translate-y-0" : "-translate-y-[150%]"}
        `}
      >
        <LabeledInput
          label="quantity"
          value={bubblesProps.quantity.toString()}
          onChange={onChangeQuantity}
        />

        <LabeledInput
          label="blur"
          value={bubblesProps.blur.toString()}
          onChange={onChangeBlur}
        />

        <LabeledInput
          label="min speed"
          value={bubblesProps.minSpeed.toString()}
          onChange={onChangeMinSpeed}
        />

        <LabeledInput
          label="max speed"
          value={bubblesProps.maxSpeed.toString()}
          onChange={onChangeMaxSpeed}
        />

        <LabeledInput
          label="min size"
          value={bubblesProps.minSize.toString()}
          onChange={onChangeMinSize}
        />

        <LabeledInput
          label="max size"
          value={bubblesProps.maxSize.toString()}
          onChange={onChangeMaxSize}
        />

        <button
          className="w-3/4 mb-1 py-0"
          onClick={() => setIsChoosingColors(true)}
        >
          colors
        </button>

        <button
          className="w-3/4 mt-1 py-0"
          onClick={() => setBubblesProps(DEFAULT_BUBBLES_PROPS)}
        >
          reset
        </button>
      </div>

      {/* toggle command interface */}
      <div
        className={`absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-[var(--primary-color)] cursor-pointer transition-transform
          ${showInterface ? "rotate-90" : "-rotate-90"}
        `}
        onClick={() => setShowInterface(!showInterface)}
      >
        <SvgBack />
      </div>

      {/* color modal */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-[#00000090] backdrop-blur-lg transition-transform cursor-pointer
          ${isChoosingColors ? "translate-y-0" : "translate-y-full"}
        `}
        onClick={() => setIsChoosingColors(false)}
      >
        <div
          className="flex flex-wrap items-center justify-center w-fit max-w-[50vw] h-fit max-h-[50vh] p-2 rounded-[var(--border-radius)] bg-[var(--off-background-color)] shadow-md overflow-y-scroll cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {bubblesProps.colors?.map((color, index) => (
            <div key={`color-picker-${index}`} className="flex flex-row">
              <LabeledInput
                type="color"
                label={`color ${index + 1}`}
                value={rgbaToHex(color.r, color.g, color.b)}
                onChange={(e) => onChangeColors(e, index)}
              />
              <div
                onClick={() => {
                  setBubblesProps((prevProps) => {
                    return {
                      ...prevProps,
                      colors: prevProps.colors?.filter((_, i) => i !== index),
                    };
                  });
                }}
                className="w-4 h-4 -ml-1.5 mr-1.5 rounded-full cursor-pointer"
              >
                X
              </div>
            </div>
          ))}
          <LabeledInput
            key="color-picker--1"
            type="color"
            label="add color"
            value=""
            onChange={(e) => onChangeColors(e)}
          />
        </div>
      </div>
    </main>
  );
}
