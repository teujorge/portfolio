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

enum Demo {
  orbit = "ball orbit",
  grid = "ball grid",
}

type DemoContextType = {
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
};

export const DemoContext = createContext<DemoContextType>({
  scrollPosition: 0,
  setScrollPosition: () => {},
});

export default function Demonstration() {
  const [whichDemo, setWhichDemo] = useState<Demo>(Demo.grid);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrollPosition(scrollY);
    }
    window.addEventListener("scroll", onScroll, false);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function demoToDisplay(): JSX.Element {
    switch (whichDemo) {
      case Demo.orbit:
        return <BallOrbit numBalls={6} />;

      case Demo.grid:
        return <BallGrid />;
    }
  }

  return (
    <DemoContext.Provider
      value={{
        scrollPosition: scrollPosition,
        setScrollPosition: setScrollPosition,
      }}
    >
      <div
        css={css`
          width: 100vw;
          height: 100vh;
        `}
      >
        <div
          css={css`
            position: fixed;

            h2 {
              cursor: pointer;
            }
          `}
        >
          <h1>Demos:</h1>
          <h2
            css={css`
              font-weight: ${whichDemo === Demo.orbit ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.orbit)}
          >
            Balls Orbit
          </h2>
          <h2
            css={css`
              font-weight: ${whichDemo === Demo.grid ? 900 : 100};
            `}
            onClick={() => setWhichDemo(Demo.grid)}
          >
            Balls Grid
          </h2>
        </div>

        {demoToDisplay()}
      </div>
    </DemoContext.Provider>
  );
}
