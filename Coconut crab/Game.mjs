import Crab from "./Crab.mjs";

function Game () {
    this.player = new Crab(0, 0);
}
Game.prototype = {
    constructor: Game,
    update: function (keys) {
        this.player.update(keys);
    },
    render: function (ctx) {
        this.player.draw(ctx);
    }
}

export default Game;