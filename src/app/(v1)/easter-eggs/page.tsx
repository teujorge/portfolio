import Link from "next/link";
import { easterEggRoutes } from "./routes";

export default function EasterEggs() {
  return (
    <main>
      <h1>Easter Eggs!</h1>
      <div className="h-6" />
      <div className="flex flex-wrap items-center justify-center">
        {Object.entries(easterEggRoutes).map(([key, route]) => (
          <Link href={route.href} key={key} className="m-2">
            <button>{route.title}</button>
          </Link>
        ))}
      </div>
    </main>
  );
}
