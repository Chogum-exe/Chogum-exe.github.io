import vec2d from "./vec2d.mjs";

function Crab (x, y) {
    this.position = new vec2d(x, y);
    this.velocity = new vec2d(0, 0);
}
Crab.prototype = {
    constructor: Crab,
    update: function () {
        //
    },
    draw: function (ctx) {
        ctx.fillRect(this.position.x, this.position.y, 30, 30);
    }
}

export default Crab;