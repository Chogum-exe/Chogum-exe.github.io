import Game from "./Game.mjs";
import GameLoop from "./GameLoop.mjs";
import Controller from "./Controller.mjs";

"use strict";
window.onload = () => {


    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game();
    const control = new Controller(document);

    //Resizing window code
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    handleResize();
    window.onresize = handleResize;

    const loop = new GameLoop(1000/60, () => {
        game.update(control.keydown);

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        game.render(ctx);
    });
    loop.start();

};