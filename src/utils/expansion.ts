import { gsap } from "gsap";

export function toggleExpansion(expanderRef: React.RefObject<HTMLElement>) {
  const expanderElement = expanderRef.current!;

  if (gsap.getProperty(expanderElement, "height").toString() === "0") {
    expandDescription(expanderElement);
  } else {
    collapseDescription(expanderElement);
  }
}

function expandDescription(expanderElement: HTMLElement) {
  gsap.to(expanderElement, {
    height: "auto",
    opacity: 1,
    duration: 0.3,
    ease: "ease",
  });
}

function collapseDescription(expanderElement: HTMLElement) {
  gsap.to(expanderElement, {
    height: 0,
    opacity: 0,
    duration: 0.3,
    ease: "ease",
  });
}
