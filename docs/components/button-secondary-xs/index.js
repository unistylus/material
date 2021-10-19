var UnistylusButton = /** @class */ (function () {
    function UnistylusButton() {
        this.NAME = 'button';
    }
    UnistylusButton.prototype.register = function () {
        var _a;
        (_a = (window.unistylus)) === null || _a === void 0 ? void 0 : _a.registerPart(this.NAME, this.handler.bind(this));
    };
    UnistylusButton.prototype.handler = function (el) {
        el.addEventListener("click", this.action.bind(this));
    };
    UnistylusButton.prototype.action = function (event) {
        var button = event.currentTarget;
        var circle = document.createElement("span");
        var diameter = Math.max(button.clientWidth, button.clientHeight);
        var radius = diameter / 2;
        circle.style.width = circle.style.height = diameter + "px";
        circle.style.left = event.clientX - button.offsetLeft - radius + "px";
        circle.style.top = event.clientY - button.offsetTop - radius + "px";
        circle.classList.add("ripple");
        var ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    };
    return UnistylusButton;
}());
// run
new UnistylusButton().register();
