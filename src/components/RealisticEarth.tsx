"use client";

import Spline from "@splinetool/react-spline";

export const RealisticEarth = () => {
  return (
    <Spline
      onLoad={() => {
        console.log("earth loaded!");
      }}
      scene="https://prod.spline.design/V-KUcw187DJxnwCD/scene.splinecode"
    />
  );
};
