
class Particle {
    constructor(x, y, z, m) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.m = m;
        this.dx = 0;
        this.dy = 0;
        this.dz = 0;
    }
    gravitate(x2, y2, z2, m2) {
        //This method adds to the particles acceleration based on the gravity from another mass
        let vx, vy, vz, dist, distx, disty, distz, acc;

        distx = x2 - this.x;
        disty = y2 - this.y;
        distz = z2 - this.z;
        dist = Math.sqrt(Math.pow(distx, 2) + Math.pow(disty, 2) + Math.pow(distz, 2));
        acc = m2 / Math.pow(dist, 2);
        
        vx = distx * acc;
        vy = disty * acc;
        vz = distz * acc;

        //Add the new acceleration to the current acceleration
        this.dx += vx;
        this.dy += vy;
        this.dz += vz;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
    }
    render(ctx, x, y, z) {
        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        if (z > 0) ctx.arc(x, y, this.m*400/z, 0, Math.PI*2, true);
        ctx.fill();
    }
}
