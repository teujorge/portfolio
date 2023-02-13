export function inView({
  elements,
  elementVisibleThreshold = 0,
  forgetfulScroll,
  aboveViewFn,
  inViewFn,
  belowViewFn,
}: {
  elements: NodeListOf<Element>;
  elementVisibleThreshold?: number;
  forgetfulScroll?: boolean;
  aboveViewFn?: (e: Element, i: number) => void;
  inViewFn?: (e: Element, i: number) => void;
  belowViewFn?: (e: Element, i: number) => void;
}) {
  var indexOfElementsInView: number[] = [];
  var windowHeight: number = window.innerHeight;

  if (!aboveViewFn) aboveViewFn = inViewFn;

  for (var i = 0; i < elements.length; i++) {
    var elementRect = elements[i].getBoundingClientRect();

    // element above window upper limit
    if (elementRect.bottom < -elementVisibleThreshold) {
      if (forgetfulScroll) {
        if (elements[i] != undefined) {
          aboveViewFn!(elements[i], i);
        }
      }
    }
    // element is above window lower limit (in view)
    else if (elementRect.top < windowHeight - elementVisibleThreshold) {
      indexOfElementsInView.push(i);
    }
    // element is below window lower limit
    else {
      if (elements[i] != undefined && belowViewFn) {
        belowViewFn(elements[i], i);
      }
    }
  }

  // only work on last item of elements in view
  var actionIndex: number =
    indexOfElementsInView[indexOfElementsInView.length - 1];
  var actionElement: Element = elements[actionIndex];
  if (actionElement != undefined && inViewFn) {
    inViewFn(actionElement, actionIndex);
  }
}
