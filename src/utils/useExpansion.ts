"use client";

import { gsap } from "gsap";
import { useEffect, useState } from "react";

export function useExpansion(expandableElement: HTMLElement) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // kill any ongoing animations
    gsap.killTweensOf(expandableElement);

    // collapse
    if (isExpanded) {
      gsap.to(expandableElement, {
        height: "auto",
        opacity: 1,
        duration: 0.25,
        ease: "ease",
      });
    }

    // expand
    else {
      gsap.to(expandableElement, {
        height: 0,
        opacity: 0,
        duration: 0.15,
        ease: "ease",
      });
    }
  }, [expandableElement, isExpanded]);

  return function toggleExpansion() {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };
}
