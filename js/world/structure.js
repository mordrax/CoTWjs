var Structure = (function () {
    function Structure(name, entry_pos, start_pos, end_pos) {
        this.name = name;
        this.entry_pos = entry_pos;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
    }
    Structure.prototype.Dimension = function () {
        var p = new Point();
        p.X = Math.abs(this.start_pos.X - this.end_pos.X);
        p.Y = Math.abs(this.start_pos.Y - this.end_pos.Y);
        return p;
    };

    Structure.prototype.Enter = function () {
    };

    Structure.prototype.Draw = function () {
        this._el.style["-webkit-transform"] = "translate3d(" + this.start_pos.X * TILE_SIZE + 'px,' + this.start_pos.Y * TILE_SIZE + "px,0px)";
    };
    return Structure;
})();
