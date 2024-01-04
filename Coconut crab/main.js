import Game from "./Game.mjs";
import GameLoop from "./GameLoop.mjs";
import Controller from "./Controller.mjs";

"use strict";
(() => {

    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game();
    const control = new Controller(canvas);

    const loop = new GameLoop(1000/30, () => {
        game.update(control.keydown);

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        game.render(ctx);
    });
    loop.start();

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

})();