import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="flex flex-row items-center justify-center">
        <p className="p-1 text-lg font-medium no-underline">404</p>
        <div className="h-6 w-0.5 m-1 rounded bg-[var(--primary-color)]" />
        <h1 className="p-1 text-lg font-normal no-underline">
          This page could not be found.
        </h1>
      </div>

      <div className="h-4" />
      <Link href="/">Return Home</Link>
    </main>
  );
}
