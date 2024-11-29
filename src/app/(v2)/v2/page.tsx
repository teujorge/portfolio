"use client";

import { Preload, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Slides } from "./components/Slides";
import { TextSlides } from "./components/TextSlides";

export default function Hero() {
  return (
    <main
      className="m-0 p-0 overscroll-none"
      style={{
        minWidth: "none",
        maxWidth: "none",
        minHeight: "none",
        maxHeight: "none",
      }}
    >
      <Canvas className="three-canvas" gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal
            pages={3}
            distance={1}
            damping={0.05}
          >
            <Scroll>
              <Slides />
            </Scroll>
            <Scroll html>
              <TextSlides />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </main>
  );
}
