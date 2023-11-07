import { SwarmSimulation } from "./components/SwarmSimulation";

export default function BoidsPage() {
  return (
    <main className="max-w-[100vw] max-h-screen">
      <h2 className="absolute top-1/2 left-1/2 -translate-x-full -translate-y-1/2">
        Boids
      </h2>
      <SwarmSimulation />
    </main>
  );
}
