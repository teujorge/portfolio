export function TextSlides() {
  const h1Style: React.CSSProperties = {
    position: "absolute",
    top: "20vh",
    fontSize: "16dvw",
    lineHeight: "1",
    letterSpacing: "0em",
    fontWeight: "bolder",
  };

  const red = "rgb(239 68 68";

  return (
    <div className="flex">
      <h1
        className="translate-x-1 translate-y-1 opacity-75"
        style={{ left: "025vw", ...h1Style, color: "cyan" }}
      >
        explore
      </h1>
      <h1
        className="-translate-x-1 -translate-y-1 opacity-75"
        style={{ left: "025vw", ...h1Style, color: "red" }}
      >
        explore
      </h1>
      <h1 style={{ left: "025vw", ...h1Style }}>explore</h1>

      <h1
        className="translate-x-1 translate-y-1 opacity-75"
        style={{ left: "125vw", ...h1Style, color: "cyan" }}
      >
        my world
      </h1>
      <h1
        className="-translate-x-1 -translate-y-1 opacity-75"
        style={{ left: "125vw", ...h1Style, color: "red" }}
      >
        my world
      </h1>
      <h1 style={{ left: "125vw", ...h1Style }}>my world</h1>

      <h1
        className="translate-x-1 translate-y-1 opacity-75"
        style={{ left: "225vw", ...h1Style, color: "cyan" }}
      >
        explore
      </h1>
      <h1
        className="-translate-x-1 -translate-y-1 opacity-75"
        style={{ left: "225vw", ...h1Style, color: "red" }}
      >
        explore
      </h1>
      <h1 style={{ left: "225vw", ...h1Style }}>explore</h1>
    </div>
  );
}
