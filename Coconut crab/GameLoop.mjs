
function GameLoop (frame_time, callback) {
    this.frame_time = frame_time;
    this.callback = callback;
    this.accumulated_time = 0;
    this.last_stamp = undefined;
    this.frame_req = undefined;
}
GameLoop.prototype = {
    constructor: GameLoop,
    start: function () {
        this.frame_req = requestAnimationFrame(this.run);
    },
    run: function (current_stamp) {

        this.last_stamp = this.last_stamp || current_stamp;
        this.accumulated_time += current_stamp - this.last_stamp - this.frame_time;

        while (this.accumulated_time >= this.frame_time) {
            this.callback();
            this.accumulated_time -= this.frame_time;
        }

        this.last_stamp = current_stamp;
        this.frame_req = requestAnimationFrame(this.run);

    },
    stop: function () {
        cancelAnimationFrame(this.frame_req);
    }
}

export default GameLoop;