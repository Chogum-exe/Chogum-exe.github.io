
;((Particle) => {

    const Canvas = document.getElementById("can");
    Canvas.width = window.innerWidth; Canvas.height = window.innerHeight-5;
    const ctx = Canvas.getContext("2d");
    const WIDTH = Canvas.width;
    const HEIGHT = Canvas.height;
    const FPS = 100;
    let paused = false;
    
    function random(min, max) {
        return Math.floor((Math.random()*(max-min+1))) + min;
    }

    function moveAll(parts, start) {
        for (let i=0; i<parts.length; i++) {
            if (i === start) continue;
            parts[start].force(parts[i].x, parts[i].y, parts[i].c);
        }
        if (start+1 == parts.length) return;
        else moveAll(parts, start+1);
    }
    
    let parts = [];
    for (let i=0; i<10; i++) //Protons
        parts.push(new Particle(random(0, WIDTH), random(0, HEIGHT), 2000, 1));

    for (let i=0; i<20; i++) //Electrons
        parts.push(new Particle(random(0, WIDTH), random(0, HEIGHT), 1, -1));

    //let frame = 0;
    function loop() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i=0; i<parts.length; i++) {
            parts[i].update(WIDTH, HEIGHT);
            parts[i].render(ctx);
        }

        moveAll(parts, 0);

        //console.log(frame++, (new Date()).getMilliseconds());
        //if (!paused) requestAnimationFrame(loop);
    }
    //loop();
    setInterval(loop, 1000/FPS);
})(Particle);
