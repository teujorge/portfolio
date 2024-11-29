import { cn } from "@/utils/common";
// "use client";

// import { MOBILE_WIDTH } from "@/app/app";
// import { gsap } from "gsap";
// import { ReactNode, useEffect, useRef, useState } from "react";

// export function Expandable({
//   expandableTargetId,
//   children,
//   className,
// }: {
//   expandableTargetId: string;
//   children: ReactNode;
//   className?: string;
// }) {
//   const triggerContainerRef = useRef<HTMLDivElement>(null);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     // get element
//     const expandableElement = document.getElementById(expandableTargetId);
//     if (expandableElement === null) {
//       throw new Error(
//         `Expandable element with id "${expandableTargetId}" not found`
//       );
//     }

//     // kill any ongoing animations
//     gsap.killTweensOf(expandableElement);

//     // expand or collapse
//     if (isExpanded) expand(expandableElement);
//     else collapse(expandableElement);
//   }, [isExpanded, expandableTargetId]);

//   function expand(expandableElement: HTMLElement) {
//     gsap.to(expandableElement, {
//       height: "auto",
//       opacity: 1,
//       duration: 0.25,
//       ease: "ease",
//     });
//   }

//   function collapse(expandableElement: HTMLElement) {
//     gsap.to(expandableElement, {
//       height: 0,
//       opacity: 0,
//       duration: 0.15,
//       ease: "ease",
//     });
//   }

//   function toggleExpansion() {
//     // mobile
//     if (window.innerWidth <= MOBILE_WIDTH) {
//       if (isExpanded) setIsExpanded(false);
//     }
//     // desktop
//     else {
//       setIsExpanded(!isExpanded);
//     }
//   }

//   return (
//     <div
//       onMouseEnter={toggleExpansion}
//       onMouseLeave={toggleExpansion}
//       ref={triggerContainerRef}
//       className={className}
//     >
//       {children}
//     </div>
//   );
// }

// TEMPORARILY DISABLE EXPANDABLE...
export function Expandable({
  expandableTargetId,
  children,
  className,
  animateFromLeft,
}: {
  expandableTargetId: string;
  children: React.ReactNode;
  className?: string;
  animateFromLeft: boolean;
}) {
  return (
    <div className={cn(className, "group")}>
      <div
        className={cn(
          "absolute inset-0 bg-[var(--primary-color)] opacity-5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300  ease-in-out",
          animateFromLeft ? "origin-left" : "origin-right"
        )}
      />
      {children}
    </div>
  );
}
