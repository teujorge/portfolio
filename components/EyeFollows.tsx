import { useEffect, useRef } from "react";

const outerEyeSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 192c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
  </svg>
);

const EyeFollows = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasContext = canvasRef.current!.getContext("2d")!;

    // object to hold mouse coords
    const lookAt = { x: 150, y: 75 };

    // details need to make eye look at mouse coords
    const eye = {
      radius: 50,
      iris: 30,
      // limits of movement
      limMin: -0.1,
      limMax: 1.1,
    };

    // add mouse move listener to whole page
    addEventListener("mousemove", (e) => {
      // make mouse coords relative to the canvas  ignoring scroll in this case
      const bounds = canvasRef.current!.getBoundingClientRect();
      lookAt.x = e.pageX - bounds.left; // - scrollX;
      lookAt.y = e.pageY - bounds.top; // - scrollY;

      canvasContext.clearRect(0, 0, 300, 150);
      drawEyes(lookAt);
    });

    drawEyes(lookAt);

    function drawEyes(lookAt: { x: number; y: number }) {
      var { x, y } = lookAt;

      // normalize lookAt range from 0 to 1 across and down canvas
      x /= canvasRef.current!.width;
      y /= canvasRef.current!.height;

      // limit eye movement to -0.1 to 1.1  or what ever you prefer
      x = x < eye.limMin ? eye.limMin : x > eye.limMax ? eye.limMax : x;
      y = y < eye.limMin ? eye.limMin : y > eye.limMax ? eye.limMax : y;

      // move lookAt so that 0.5 is center
      x -= 0.5;
      y -= 0.5;

      // get range of movement of iris
      const range = (eye.radius - eye.iris) * 2;

      // scale the lookAt to the range of movement
      x *= range;
      y *= range;

      // iris
      canvasContext.fillStyle = "blue";
      canvasContext.beginPath();
      canvasContext.arc(75 + x, 75 + y, eye.iris, 0, Math.PI * 2, false);
      canvasContext.fill();

      // pupil
      canvasContext.fillStyle = "black";
      canvasContext.beginPath();
      canvasContext.arc(75 + x, 75 + y, 15, 0, Math.PI * 2, false);
      canvasContext.fill();

      // turn the clip off by restoring canvas state
      canvasContext.restore();
    }
  }, []);

  return (
    <div>
      {outerEyeSvg}
      <canvas ref={canvasRef} id="canvas" width="150" height="150" />
    </div>
  );
};

export default EyeFollows;
