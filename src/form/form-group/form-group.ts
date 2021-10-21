class UnistylusFormGroup {
  private readonly NAME = 'form-group';

  constructor() {}

  register() {
    ((window as any).unistylus)?.registerPart(this.NAME, this.handler.bind(this));
  }

  private handler(el: HTMLElement) {
    // add input required attribute, remove placeholder
    const inputEl = el.querySelector('.form-control');
    if (inputEl) {
      (inputEl as any).required = true;
      inputEl.removeAttribute('placeholder');
    }
    // move label below input
    const labelEl = el.querySelector('.form-label');
    if (labelEl && labelEl.nextElementSibling) {
      labelEl.parentNode?.insertBefore(labelEl.nextElementSibling, labelEl);
    }
    // add highlight
    const highlightEl = document.createElement('span')
    highlightEl.classList.add('form-material-highlight');
    el.appendChild(highlightEl);
    // add bar
    const barEl = document.createElement('span');
    barEl.classList.add('form-material-bar');
    el.appendChild(barEl);
  }
}

// run
new UnistylusFormGroup().register();
