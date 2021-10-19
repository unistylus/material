interface UnistylusPart {
  name: string;
  handler: (el: HTMLElement) => void;
}

class UnistylusManager {
  parts: UnistylusPart[] = [];

  constructor() {}

  registerPart(name: string, handler: (el: HTMLElement) => void) {
    // save part
    this.parts.push({ name, handler });
    // initial elements
    const query = `.${name}, [class^="${name}-"], [class*=" ${name}-"]`;
    const buttons = document.querySelectorAll(query) as unknown as any[];
    for (const el of buttons) {
      handler(el);
    }
  }

  isValidElement(el: HTMLElement) {
    return !!el?.classList?.toString(); // elements with classes are valid
  }

  isMatched(el: HTMLElement, partName: string) {
    return (el?.classList?.toString() || '').indexOf(partName) !== -1;
  }
}

// watch for changes
new MutationObserver(mutationsList => {
  // read the manager
  const manager = (window as any).unistylus as UnistylusManager;
  // extract valid elements
  const effectedElements: any = [];
  for(const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (const el of (mutation.addedNodes as any || [])) {
        if (manager.isValidElement(el)) {
          effectedElements.push(el);
        }
      }
    }
    else if (mutation.type === 'attributes') {
      const el = mutation.target as HTMLElement;
      if (manager.isValidElement(el)) {
        effectedElements.push(el);
      }
    }
  }
  // apply effects
  const registeredParts = manager.parts;
  for (const el of effectedElements) {
    for (let i = 0; i < registeredParts.length; i++) {
      const part = registeredParts[i];
      if (manager.isMatched(el, part.name)) {
        part.handler(el);
      }
    }
  }
})
.observe(
  document.getElementsByTagName('body')[0],
  { attributes: true, childList: true, subtree: true }
);

// register the manager to the global scope
(window as any).unistylus = new UnistylusManager();
