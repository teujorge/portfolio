"use client";

import { gsap } from "gsap";
import { ReactNode, useEffect, useRef, useState } from "react";

export function Expandable({
  expandableTargetId,
  children,
  className,
}: {
  expandableTargetId: string;
  children: ReactNode;
  className?: string;
}) {
  const triggerContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const expandableElement = document.getElementById(expandableTargetId);
    if (expandableElement === null) {
      throw new Error(
        `Expandable element with id "${expandableTargetId}" not found`
      );
    }

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
  }, [isExpanded, expandableTargetId]);

  function toggleExpansion() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div
      onMouseEnter={toggleExpansion}
      onMouseLeave={toggleExpansion}
      ref={triggerContainerRef}
      className={className}
    >
      {children}
    </div>
  );
}
