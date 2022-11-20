
const Scale = 100;

class Particle {
    constructor(x, y, m) {
        this.x = x;
        this.y = y;
        this.m = m/Scale;
        this.dx = 0;
        this.dy = 0;
    }
    gravitate(x2, y2, m2) {
        //This method adds to the particles acceleration based on the gravity from another mass
        let vx, vy, dist, distx, disty, acc;

        dist = Math.sqrt(Math.pow(x2 - this.x, 2) + Math.pow(y2 - this.y, 2));
        distx = x2 - this.x;
        disty = y2 - this.y;
        acc = ((this.m * m2) / Math.pow(dist, 2)) / this.m;
        
        vx = distx * acc;
        vy = disty * acc;

        //Add the new acceleration to the current acceleration
        this.dx += vx;
        this.dy += vy;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.arc(this.x, this.y, this.m*Scale, 0, Math.PI*2, true);
        ctx.fill();
        ctx.moveTo(this.x, this.y);
        ctx.lineCap = 'round';
        ctx.lineTo(this.x-this.dx, this.y-this.dy);
        ctx.closePath();
    }
}
