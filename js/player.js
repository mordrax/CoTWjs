/**
 * Created with JetBrains WebStorm.
 * User: mordrax
 * Date: 2/07/13
 * Time: 7:18 PM
 * To change this template use File | Settings | File Templates.
 */

function Player() {
    this.x = 10;
    this.y = 15;
    this.$el = undefined;
    this.el = undefined;
}

Player.prototype.draw = function(context) {
    alert('Player draw not implemented')
};

Player.prototype.moveLeft = function() {
    this.x -= 1;
};

Player.prototype.moveRight = function() {
    this.x += 1;
};

Player.prototype.moveUp = function() {
    this.y -= 1;
};

Player.prototype.moveDown = function() {
    this.y += 1;
};

Player.prototype.update = function() {
    if (Key.isDown(Key.UP)) this.moveUp();
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    if (Key.isDown(Key.DOWN)) this.moveDown();
    if (Key.isDown(Key.RIGHT)) this.moveRight();
};