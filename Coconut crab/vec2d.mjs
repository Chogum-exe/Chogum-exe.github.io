
function vec2d (x, y) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(x**2, y**2);
}
vec2d.prototype = {
    constructor: vec2d,
    toUnitVec: function () {
        return new vec2d(this.x/this.magnitude, this.y/this.magnitude);
    },
    add: function(vec) {
        return new vec2d(this.x+vec.x, this.y+vec.y);
    },
    sub: function(vec) {
        return new vec2d(this.x-vec.x, this.y-vec.y);
    },
    scale: function(u) {
        return new vec2d(this.x*u, this.y*u);
    }
}

export default vec2d;