import Link from "next/link";

export default function EasterEggs() {
  return (
    <main className="min-h-screen">
      <h1>Easter Eggs!</h1>
      <div className="h-6" />
      <div className="flex flex-wrap">
        <Link href="/easter-eggs/monty-hall-problem" className="button">
          <button>Monty Hall Problem (Statistics)</button>
        </Link>
        <Link href="/easter-eggs/sierpinski-triangle" className="button">
          <button>Sierpiński Triangle (Fractals)</button>
        </Link>
      </div>
    </main>
  );
}
