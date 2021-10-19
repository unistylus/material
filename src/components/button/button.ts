class UnistylusButton {
  private readonly NAME = 'button';

  constructor() {}

  register() {
    ((window as any).unistylus)?.registerPart(this.NAME, this.handler.bind(this));
  }

  private handler(el: HTMLElement) {
    el.addEventListener("click", this.action.bind(this));
  }

  private action(event: any) {
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
}

// run
new UnistylusButton().register();
