var UnistylusFormGroup = /** @class */ (function () {
    function UnistylusFormGroup() {
        this.NAME = 'form-group';
    }
    UnistylusFormGroup.prototype.register = function () {
        var _a;
        (_a = (window.unistylus)) === null || _a === void 0 ? void 0 : _a.registerPart(this.NAME, this.handler.bind(this));
    };
    UnistylusFormGroup.prototype.handler = function (el) {
        var _a;
        // add input required attribute, remove placeholder
        var inputEl = el.querySelector('.form-control');
        if (inputEl) {
            inputEl.required = true;
            inputEl.removeAttribute('placeholder');
        }
        // move label below input
        var labelEl = el.querySelector('.form-label');
        if (labelEl && labelEl.nextElementSibling) {
            (_a = labelEl.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(labelEl.nextElementSibling, labelEl);
        }
        // add highlight
        var highlightEl = document.createElement('span');
        highlightEl.classList.add('form-material-highlight');
        el.appendChild(highlightEl);
        // add bar
        var barEl = document.createElement('span');
        barEl.classList.add('form-material-bar');
        el.appendChild(barEl);
    };
    return UnistylusFormGroup;
}());
// run
new UnistylusFormGroup().register();
