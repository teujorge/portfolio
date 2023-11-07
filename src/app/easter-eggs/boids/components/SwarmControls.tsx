export function SwarmControls({
  separationCoef,
  setSeparationCoef,
  alignmentCoef,
  setAlignmentCoef,
  cohesionCoef,
  setCohesionCoef,
}: {
  separationCoef: number;
  setSeparationCoef: (value: number) => void;
  alignmentCoef: number;
  setAlignmentCoef: (value: number) => void;
  cohesionCoef: number;
  setCohesionCoef: (value: number) => void;
}) {
  const inputsClassName = "flex flex-col items-center justify-center";

  return (
    <div className="fixed top-4 flex flex-row items-center justify-center p-2 gap-2 bg-[#00000050] rounded-[var(--border-radius)]">
      <div className={inputsClassName}>
        <label>Separation: {separationCoef}</label>
        <input
          type="range"
          min="50"
          max="150"
          step={10}
          value={separationCoef}
          onChange={(e) => setSeparationCoef(+e.target.value)}
        />
      </div>
      <div className={inputsClassName}>
        <label>Alignment: {alignmentCoef}</label>
        <input
          type="range"
          min="0"
          max="100"
          step={10}
          value={alignmentCoef}
          onChange={(e) => setAlignmentCoef(+e.target.value)}
        />
      </div>
      <div className={inputsClassName}>
        <label>Cohesion: {cohesionCoef}</label>
        <input
          type="range"
          min="0"
          max="1"
          step={0.1}
          value={cohesionCoef}
          onChange={(e) => setCohesionCoef(+e.target.value)}
        />
      </div>
    </div>
  );
}
