"use client";

import { MOBILE_WIDTH } from "@/app/app";
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
    // get element
    const expandableElement = document.getElementById(expandableTargetId);
    if (expandableElement === null) {
      throw new Error(
        `Expandable element with id "${expandableTargetId}" not found`
      );
    }

    // if on mobile, don't expand/collapse
    if (window.innerWidth < MOBILE_WIDTH) {
      if (isExpanded) collapse(expandableElement);
      return;
    }

    // kill any ongoing animations
    gsap.killTweensOf(expandableElement);

    // expand or collapse
    if (isExpanded) collapse(expandableElement);
    else expand(expandableElement);
  }, [isExpanded, expandableTargetId]);

  function expand(expandableElement: HTMLElement) {
    gsap.to(expandableElement, {
      height: 0,
      opacity: 0,
      duration: 0.15,
      ease: "ease",
    });
  }

  function collapse(expandableElement: HTMLElement) {
    gsap.to(expandableElement, {
      height: "auto",
      opacity: 1,
      duration: 0.25,
      ease: "ease",
    });
  }

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
