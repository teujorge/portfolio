function inView({
  elements,
  elementVisibleThreshold = 0,
  forgetfulScroll,
  outOfViewFn,
  inViewFn,
}: {
  elements: NodeListOf<Element>;
  elementVisibleThreshold?: number;
  forgetfulScroll?: boolean;
  outOfViewFn?: (e: Element, i: number) => void;
  inViewFn: (e: Element, i: number) => void;
}) {
  var indexOfElementsInView: number[] = [];
  var windowHeight: number = window.innerHeight;

  for (var i = 0; i < elements.length; i++) {
    var elementRect = elements[i].getBoundingClientRect();

    // element above window upper limit
    if (elementRect.bottom < -elementVisibleThreshold) {
      if (forgetfulScroll && outOfViewFn) {
        if (elements[i] != undefined) {
          outOfViewFn(elements[i], i);
        }
      }
    }
    // element is above window lower limit (in view)
    else if (elementRect.top < windowHeight - elementVisibleThreshold) {
      indexOfElementsInView.push(i);
    }
    // element is below window lower limit
    else {
      if (elements[i] != undefined && outOfViewFn) {
        outOfViewFn(elements[i], i);
      }
    }
  }

  // only work on last item of elements in view
  var actionIndex: number =
    indexOfElementsInView[indexOfElementsInView.length - 1];
  var actionElement: Element = elements[actionIndex];
  if (actionElement != undefined) {
    inViewFn(actionElement, actionIndex);
  }
}

export default inView;
