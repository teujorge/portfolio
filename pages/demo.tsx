import Balls from "@/components/Balls";

export default function Demo() {
  return (
    // <div style={{ display: "grid", gridTemplateRows: "1fr" }}>
    //   <div style={{ gridRow: 1 }}>
    //     <Balls />
    //   </div>
    // </div>
    <div style={{ width: "100vw", height: "100vh" }}>
      <Balls numBalls={3} />
    </div>
  );
}
