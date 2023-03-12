import debounce from "debounce";
import { FlowDemo } from "./FlowDemo";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

const Flow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);

  const lessRef = useRef<HTMLButtonElement>(null);
  const moreRef = useRef<HTMLButtonElement>(null);
  const evenLessRef = useRef<HTMLButtonElement>(null);
  const evenMoreRef = useRef<HTMLButtonElement>(null);

  const [demo, setDemo] = useState<FlowDemo>();
  const [config, setConfig] = useState<any>({
    nInstances: 2000,
    useCube: false,
    scale: 1,
  });

  useEffect(() => {
    if (!demo) setDemo(new FlowDemo(containerRef.current, config));
    counterRef.current!.innerText = `${config.nInstances * 2}`;
  }, []);

  useEffect(() => {
    if (!demo) return;

    demo.init();
    let restart = debounce(demo.restart, 400);

    const addInstances = (count: any) => {
      config.nInstances += count;
      config.nInstances = Math.max(500, config.nInstances);
      counterRef.current!.innerText = `${config.nInstances * 2}`;
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

    lessRef.current!.onclick = handleLess;
    moreRef.current!.onclick = handleMore;
    evenLessRef.current!.onclick = handleEvenLess;
    evenMoreRef.current!.onclick = handleEvenMore;
  }, [demo]);

  return (
    <>
      <div
        css={css`
          width: 500px !important;
          height: 500px !important;
        `}
        id="flow-demo"
        ref={containerRef}
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
        <button id="less" ref={lessRef}>
          less
        </button>
        <button id="more" ref={moreRef}>
          more
        </button>

        <button id="even-less" ref={evenLessRef}>
          even-less
        </button>
        <button id="even-more" ref={evenMoreRef}>
          even-more
        </button>

        <p id="count" ref={counterRef}>
          count
        </p>
      </div>
    </>
  );
};

export default Flow;
