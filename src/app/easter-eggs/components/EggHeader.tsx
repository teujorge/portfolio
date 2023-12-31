"use client";

import { useState } from "react";
import { EggHeaderBg } from "./EggHeaderBg";
import { EggHeaderMenu } from "./EggHeaderMenu";
import { EggHeaderBack } from "./EggHeaderBack";
import { EggHeaderBurger } from "./EggHeaderBurger";

export function EggHeader() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <EggHeaderBg isShowing={isShowing} setIsShowing={setIsShowing} />
      <EggHeaderMenu isShowing={isShowing} />
      <EggHeaderBurger isShowing={isShowing} setIsShowing={setIsShowing} />
      <EggHeaderBack isShowing={isShowing} />
    </>
  );
}
