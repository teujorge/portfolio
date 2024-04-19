"use client";

import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mt-5 hover:underline focus:outline-none"
    >
      Go back
    </button>
  );
}
