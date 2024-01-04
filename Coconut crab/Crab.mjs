import vec2d from "./vec2d.mjs";

function Crab (x, y) {
    this.position = new vec2d(x, y);
    this.velocity = new vec2d(0, 0);
    this.speed = 10;
}
Crab.prototype = {
    constructor: Crab,
    update: function (keys) {
        this.velocity = this.velocity.scale(0.9);

        let acceleration_x = 4;
        let acceleration_y = 4;

        if (keys["w"]) this.velocity.y -= acceleration_y;
        if (keys["s"]) this.velocity.y += acceleration_y;
        if (keys["a"]) this.velocity.x -= acceleration_x;
        if (keys["d"]) this.velocity.x += acceleration_x;

        let magnitude = this.velocity.getMagnitude();
        if (magnitude > this.speed)
            this.velocity = this.velocity.toUnitVec().scale(magnitude);

    },
    draw: function (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, 30, 30);
    }
}

export default Crab;