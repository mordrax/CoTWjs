/**
* Created with JetBrains WebStorm.
* User: mordrax
* Date: 2/07/13
* Time: 7:16 PM
* To change this template use File | Settings | File Templates.
*/
var Key = {
    _pressed: {},
    //    LEFT: 37,
    //    UP: 38,
    //    RIGHT: 39,
    //    DOWN: 40,
    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function (event) {
        this._pressed[event.keyCode] = false;
    }
};
//# sourceMappingURL=input.js.map
