import Spline from "@splinetool/react-spline";

export const LabeledEarth = ({ onLoad }: { onLoad?: (e: any) => void }) => {
  return (
    <Spline
      onLoad={onLoad}
      scene="https://prod.spline.design/iObAZqQpvcJObaJt/scene.splinecode"
    />
  );
};
