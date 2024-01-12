
function Controller (EventTarget) {
    this.element = EventTarget;
    this.keydown = []; //Store boolean for if a key is pressed
    this.element.addEventListener("keydown", this.handle_keydown.bind(this));
    this.element.addEventListener("keyup", this.handle_keyup.bind(this));
}
Controller.prototype = {
    constructor: Controller,
    handle_keydown: function (e) {
        this.keydown[e.key] = true;
    },
    handle_keyup: function (e) {
        this.keydown[e.key] = false;
    }
}

export default Controller;