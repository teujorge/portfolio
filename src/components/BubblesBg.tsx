"use client";

import dynamic from "next/dynamic";

const Bubbles = dynamic(() => import("bubbles-bg"), { ssr: false });

export default Bubbles;
