import debounce from "debounce";
import { FlowDemo } from "./FlowDemo";
import { useEffect } from "react";
import { css } from "@emotion/react";

const Flow = () => {
  useEffect(() => {
    let config = {
      nInstances: 2000,
      useCube: false,
      scale: 1,
    };

    const container = document.getElementById("flow-demo");
    let less = document.getElementById("less")!;
    let more = document.getElementById("more")!;
    let evenLess = document.getElementById("even-less")!;
    let evenMore = document.getElementById("even-more")!;
    let countElement = document.getElementById("count")!;

    const myApp = new FlowDemo(container, config);
    myApp.init();

    let restart = debounce(myApp.restart, 400);

    countElement.innerText = `${config.nInstances * 2}`;

    const addInstances = (count: any) => {
      config.nInstances += count;
      config.nInstances = Math.max(500, config.nInstances);
      countElement.innerText = `${config.nInstances * 2}`;
      let scale = 1 - Math.min(1, (config.nInstances - 500) / 50000) * 0.8;
      config.scale = scale;
      restart();
    };

    const handleLess = () => {
      addInstances(-500);
    };

    const handleEvenLess = () => {
      addInstances(-2000);
    };

    const handleMore = () => {
      addInstances(500);
    };

    const handleEvenMore = () => {
      addInstances(2000);
    };

    less.addEventListener("click", handleLess);
    more.addEventListener("click", handleMore);
    evenLess.addEventListener("click", handleEvenLess);
    evenMore.addEventListener("click", handleEvenMore);
  }, []);

  return (
    <>
      <div
        css={css`
          width: 500px !important;
          height: 500px !important;
        `}
        id="flow-demo"
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

      <div
        css={css`
          position: fixed;
          right: 0px;
          bottom: 0px;
        `}
      >
        <button id="less">less</button>
        <button id="more">more</button>

        <button id="even-less">even-less</button>
        <button id="even-more">even-more</button>

        <button id="count">count</button>
      </div>
    </>
  );
};

export default Flow;
