alert(
    `
    CONTROLS:
    W S moves in up/down direction
    A D moves in left/right direction
    , . moves in in/out direction
    `
);
(() => {

    const Canvas = document.getElementById("can");
    Canvas.width = window.innerWidth; Canvas.height = window.innerHeight-5;
    const ctx = Canvas.getContext("2d");
    const WIDTH = Canvas.width;
    const HEIGHT = Canvas.height;
    let paused = false;
    
    function random(min, max) {
        return Math.floor((Math.random()*(max-min+1))) + min;
    }

    function gravAll(parts, start) {
        for (let i=0; i<parts.length; i++) {
            if (i === start) continue;
            parts[start].gravitate(parts[i].x, parts[i].y, parts[i].z, parts[i].m);
        }
        if (start+1 == parts.length) return;
        else gravAll(parts, start+1);
    }
    
    let parts = [];
    for (let i=0; i<10; i++)
        parts[i] = new Particle(random(0, WIDTH), random(0, HEIGHT), random(200, 600), 2);

    function loop() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i=0; i<parts.length; i++) {
            parts[i].update();
            let pts = Camera.translate(parts[i].x, parts[i].y, parts[i].z);
            parts[i].render(ctx, pts[0], pts[1], pts[2]);
        }

        gravAll(parts, 0);

        if (!paused) requestAnimationFrame(loop);
    }
    loop();
})();
