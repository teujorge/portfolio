import { TriangleSimulation } from "./components/TriangleSimulation";

export default function SierpinskiTriangle() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-16 lg:w-3/4">
        {/* title */}
        <h1>Sierpiński Triangle</h1>
        {/* description */}
        <p>
          The Sierpiński Triangle is a fractal described by Polish mathematician
          Wacław Sierpiński in 1915. It is a self-similar structure that occurs
          at different levels of iterations, or magnifications. Starting with an
          equilateral triangle, recursively remove the inner triangle (the
          central third of the original triangle) and all smaller similar
          triangles that appear in this process. The first few steps of this
          process are illustrated below.
        </p>
        <TriangleSimulation />
      </div>
    </main>
  );
}
