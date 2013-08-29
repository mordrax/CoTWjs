///<reference path="references.ts"/>
var Point = (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    Point.prototype.Equals = function (otherPoint) {
        return (this.X === otherPoint.X && this.Y === otherPoint.Y);
    };
    return Point;
})();
//# sourceMappingURL=point.js.map
