import vec2d from "./vec2d.mjs";

function Player (x, y) {
    this.position = new vec2d(x, y);
    this.velocity = new vec2d(0, 0);
    this.speed_cap = 10;
}
Player.prototype = {
    constructor: Player,
    update: function (keys) {
        this.velocity = this.velocity.scale(0.7);

        let acceleration_x = 4;
        let acceleration_y = 4;

        if (keys["w"]) this.velocity.y -= acceleration_y;
        if (keys["s"]) this.velocity.y += acceleration_y;
        if (keys["a"]) this.velocity.x -= acceleration_x;
        if (keys["d"]) this.velocity.x += acceleration_x;

        let magnitude = this.velocity.getMagnitude();
        if (magnitude > this.speed_cap)
            this.velocity = this.velocity.toUnitVec().scale(this.speed_cap);

        this.position = this.position.add(this.velocity);        
    },
    draw: function (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, 30, 30);
    }
}

export default Player;