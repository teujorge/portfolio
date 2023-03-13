/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import BallGrid from "@/components/three/BallGrid";
import BallOrbit from "@/components/three/BallOrbit";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Wave from "@/components/three/Wave";
import Flow from "@/components/three/flow/Flow";
import EarthInteractive from "@/components/3DEarth/EarthInteractive";

enum Demo {
  orbit = "Mouse Orbit",
  grid = "Chaos Grid",
  wave = "Ball Wave",
  flow = "Form Flow",
  earth = "3D Earth",
}

type DemoContextType = {
  mousePosition: number;
  setMousePosition: Dispatch<SetStateAction<number>>;

  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
};

export const DemoContext = createContext<DemoContextType>({
  mousePosition: 0,
  setMousePosition: () => {},

  scrollPosition: 0,
  setScrollPosition: () => {},
});

export default function Demonstration() {
  const [whichDemo, setWhichDemo] = useState<Demo>(Demo.flow);
  const [mousePosition, setMousePosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrollPosition(scrollY);
    }

    function onMouseMove(event: MouseEvent) {
      const pos = (event.clientX / window.innerWidth) * 2 - 1;
      setMousePosition(pos);
    }

    window.addEventListener("scroll", onScroll, false);
    window.addEventListener("mousemove", onMouseMove, false);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  function demoToDisplay(): JSX.Element {
    switch (whichDemo) {
      case Demo.orbit:
        return <BallOrbit numBalls={6} />;

      case Demo.grid:
        return <BallGrid />;

      case Demo.wave:
        return <Wave />;

      case Demo.flow:
        return <Flow />;

      case Demo.earth:
        return <EarthInteractive />;
    }
  }

  return (
    <DemoContext.Provider
      value={{
        mousePosition: mousePosition,
        setMousePosition: setMousePosition,

        scrollPosition: scrollPosition,
        setScrollPosition: setScrollPosition,
      }}
    >
      <div
        css={css`
          z-index: 100;
          width: 100vw;
          height: 100vh;
        `}
      >
        <div
          css={css`
            position: fixed;

            h2 {
              cursor: pointer;
              margin: 6px;
              padding: 6px;
              text-align: left;
              font-size: 20px;
              text-decoration: none;
            }
          `}
        >
          <Link href="/">back</Link>
          <h1>Demos:</h1>
          <h2
            css={css`
              font-weight: ${whichDemo === Demo.orbit ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.orbit)}
          >
            {Demo.orbit}
          </h2>

          <h2
            css={css`
              font-weight: ${whichDemo === Demo.grid ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.grid)}
          >
            {Demo.grid}
          </h2>

          <h2
            css={css`
              font-weight: ${whichDemo === Demo.wave ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.wave)}
          >
            {Demo.wave}
          </h2>

          <h2
            css={css`
              font-weight: ${whichDemo === Demo.flow ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.flow)}
          >
            {Demo.flow}
          </h2>

          <h2
            css={css`
              font-weight: ${whichDemo === Demo.earth ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.earth)}
          >
            {Demo.earth}
          </h2>
        </div>

        {demoToDisplay()}
      </div>
    </DemoContext.Provider>
  );
}
