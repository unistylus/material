var UnistylusManager = /** @class */ (function () {
    function UnistylusManager() {
        this.parts = [];
    }
    UnistylusManager.prototype.registerPart = function (name, handler) {
        // save part
        this.parts.push({ name: name, handler: handler });
        // initial elements
        var query = "." + name + ", [class^=\"" + name + "-\"], [class*=\" " + name + "-\"]";
        var buttons = document.querySelectorAll(query);
        for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
            var el = buttons_1[_i];
            handler(el);
        }
    };
    UnistylusManager.prototype.isValidElement = function (el) {
        var _a;
        return !!((_a = el === null || el === void 0 ? void 0 : el.classList) === null || _a === void 0 ? void 0 : _a.toString()); // elements with classes are valid
    };
    UnistylusManager.prototype.isMatched = function (el, partName) {
        var _a;
        return (((_a = el === null || el === void 0 ? void 0 : el.classList) === null || _a === void 0 ? void 0 : _a.toString()) || '').indexOf(partName) !== -1;
    };
    return UnistylusManager;
}());
// watch for changes
new MutationObserver(function (mutationsList) {
    // read the manager
    var manager = window.unistylus;
    // extract valid elements
    var effectedElements = [];
    for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
        var mutation = mutationsList_1[_i];
        if (mutation.type === 'childList') {
            for (var _a = 0, _b = (mutation.addedNodes || []); _a < _b.length; _a++) {
                var el = _b[_a];
                if (manager.isValidElement(el)) {
                    effectedElements.push(el);
                }
            }
        }
        else if (mutation.type === 'attributes') {
            var el = mutation.target;
            if (manager.isValidElement(el)) {
                effectedElements.push(el);
            }
        }
    }
    // apply effects
    var registeredParts = manager.parts;
    for (var _c = 0, effectedElements_1 = effectedElements; _c < effectedElements_1.length; _c++) {
        var el = effectedElements_1[_c];
        for (var i = 0; i < registeredParts.length; i++) {
            var part = registeredParts[i];
            if (manager.isMatched(el, part.name)) {
                part.handler(el);
            }
        }
    }
})
    .observe(document.getElementsByTagName('body')[0], { attributes: true, childList: true, subtree: true });
// register the manager to the global scope
window.unistylus = new UnistylusManager();
