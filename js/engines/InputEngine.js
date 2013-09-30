/// <reference path="../references.ts"/>
var InputEngine = (function () {
    function InputEngine() {
        var _this = this;
        document.addEventListener("keyup", function (evt) {
            return _this.KeyEvent(evt);
        }, false);
        this.keyboardEvent = new Signal();
    }
    InputEngine.prototype.KeyEvent = function (ev) {
        this.keyboardEvent.dispatch(ev);
    };
    return InputEngine;
})();
//# sourceMappingURL=InputEngine.js.map
