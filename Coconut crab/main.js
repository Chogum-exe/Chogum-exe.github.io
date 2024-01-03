import Game from "./Game.mjs";
import GameLoop from "./GameLoop.mjs";

"use strict";
(() => {

    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game();

    const loop = new GameLoop(1000/30, () => {
        game.update();
        game.render(ctx);
    });

})();