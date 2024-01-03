import Crab from "./Crab.mjs";

function Game () {
    this.player = new Crab();
}
Game.prototype = {
    constructor: Game,
    update: function () {

    },
    render: function (ctx) {
        this.player.draw(ctx);
    }
}

export default Game;