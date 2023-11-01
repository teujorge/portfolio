import Link from "next/link";
import { easterEggRoutes } from "./routes";

export default function EasterEggs() {
  return (
    <main className="min-h-screen">
      <h1>Easter Eggs!</h1>
      <div className="h-6" />
      <div className="flex flex-wrap">
        {Object.entries(easterEggRoutes).map(([key, route]) => (
          <Link href={route.href} key={key}>
            <button className="button">{route.title}</button>
          </Link>
        ))}
      </div>
    </main>
  );
}
