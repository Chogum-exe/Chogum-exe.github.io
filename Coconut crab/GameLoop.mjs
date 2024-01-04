
function GameLoop (frame_time, callback) {
    this.frame_time = frame_time; // Hz of (tick rate / time for each frame)
    this.callback = callback; // The method to repeat every (tick/frame)
    this.accumulated_time = 0; // If the computer refresh < frame_time then while loop runs several times otherwise if faster is skips running the callback
    this.last_stamp = -1; // Time_stamp of the last game tick
    this.frame_req = null; // Tag to stop the frame requests
}
GameLoop.prototype = {
    constructor: GameLoop,
    start: function () {
        this.run = this.run.bind(this);
        this.frame_req = requestAnimationFrame(this.run);
    },
    run: function (current_stamp) {

        if (this.last_stamp == -1) this.last_stamp = current_stamp;
        this.accumulated_time += current_stamp - this.last_stamp - this.frame_time;

        while (this.accumulated_time >= this.frame_time) {
            this.callback();
            this.last_stamp = current_stamp;
            this.accumulated_time -= this.frame_time;
        }

        this.frame_req = requestAnimationFrame(this.run);
    },
    stop: function () {
        cancelAnimationFrame(this.frame_req);
    }
}

export default GameLoop;