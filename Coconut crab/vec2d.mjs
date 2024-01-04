
function vec2d (x, y) {
    this.x = x;
    this.y = y;
}
vec2d.prototype = {
    constructor: vec2d,
    getMagnitude: function () {
        return Math.sqrt(this.x**2 + this.y**2);
    },
    toUnitVec: function () {
        let mag = this.getMagnitude();
        return new vec2d(this.x/mag, this.y/mag);
    },
    add: function(vec) {
        if (! vec instanceof vec2d)
            throw new Error("parameter is not a vector 2d");
        return new vec2d(this.x+vec.x, this.y+vec.y);
    },
    sub: function(vec) {
        if (! vec instanceof vec2d)
            throw new Error("parameter is not a vector 2d");
        return new vec2d(this.x-vec.x, this.y-vec.y);
    },
    scale: function(u) {
        if (typeof u != "number")   
            throw new Error("parameter is not a scalar number");
        return new vec2d(this.x*u, this.y*u);
    }
}

export default vec2d;