
let Scale = 1;

class Particle {
    constructor(x, y, m, c) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.c = c;
        this.dx = 0;
        this.dy = 0;
    }
    force (x2, y2, c2) {
        //This method adds to the particles acceleration based on another particle's charge
        let vx, vy, dist, distx, disty, acc;

        dist = Math.sqrt(Math.pow(x2 - this.x, 2) + Math.pow(y2 - this.y, 2));
        distx = x2 - this.x;
        disty = y2 - this.y;
        acc = (-1 * c2 * (this.c / (Math.abs(this.c)+0.01))) / Math.pow(dist, 2) - (1/Math.pow(dist, 3));
        
        vx = distx * acc;
        vy = disty * acc;

        //Add the new acceleration to the current acceleration
        this.dx += (vx / this.m) / Scale;
        this.dy += (vy / this.m) / Scale;
    }
    update(WIDTH, HEIGHT) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x<0) this.dx = Math.abs(this.dx);
        if (this.x>WIDTH) this.dx = -1*Math.abs(this.dx);
        if (this.y<0) this.dy = Math.abs(this.dy);
        if (this.y>HEIGHT) this.dy = -1*Math.abs(this.dy);
    }
    render(ctx) {
        ctx.beginPath();
        let color = this.c > 0 ? "#F00" : "#00F";
        color = this.c == 0 ? "rgba(100, 100, 100, 0.7)" : color;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.arc(this.x, this.y, 3, 0, Math.PI*2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "#FFF";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+10*this.dx, this.y+10*this.dy);
        ctx.stroke();
    }
}
