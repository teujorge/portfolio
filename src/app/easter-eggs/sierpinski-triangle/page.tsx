import { TriangleSimulation } from "./components/TriangleSimulation";

export default function SierpinskiTriangle() {
  return (
    <main className="flex flex-col items-center justify-center px-10 md:px-[10vw] lg:px-[15vw]">
      {/* title */}
      <h2>Sierpiński Triangle</h2>
      {/* description */}
      <p>
        The Sierpiński Triangle is a fractal described by Polish mathematician
        Wacław Sierpiński in 1915. It is a self-similar structure that occurs at
        different levels of iterations, or magnifications. Starting with an
        equilateral triangle, recursively remove the inner triangle (the central
        third of the original triangle) and all smaller similar triangles that
        appear in this process. The first few steps of this process are
        illustrated below.
      </p>
      <TriangleSimulation />
    </main>
  );
}
