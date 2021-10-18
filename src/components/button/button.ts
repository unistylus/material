function createRipple(event: any) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons = document.querySelectorAll('.button, [class^="button-"], [class*=" button-"]') as unknown as any[];
for (const el of buttons) {
  el.addEventListener("click", createRipple);
}

new MutationObserver((mutationsList, observer) => {
  const isClassMatched = (node: any) => {
    return (node?.classList?.toString() || '').indexOf('button') !== -1;
  };
  // extract elements
  const effectedElements: any = [];
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const node of (mutation.addedNodes as any || [])) {
        const isMatched = isClassMatched(node);
        if (isMatched) {
          effectedElements.push(node);
        }
      }
    }
    else if (mutation.type === 'attributes') {
      const node = mutation.target;
      const isMatched = isClassMatched(node);
      if (isMatched) {
        effectedElements.push(node);
      }
    }
  }
  // filter and apply
  for (const el of effectedElements) {
    el.addEventListener("click", createRipple);
  }
})
.observe(
  document.getElementsByTagName('body')[0],
  { attributes: true, childList: true, subtree: true }
);