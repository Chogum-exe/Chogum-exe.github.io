
function Controller (EventTarget) {
    this.element = EventTarget;
    this.keydown = []; //Store boolean
    this.element.addEventListener("keydown", this.handle_keydown);
    this.element.addEventListener("keyup", this.handle_keyup);
}
Controller.prototype = {
    constructor: Controller,
    handle_keydown: function (e) {
        this.keydown[e.code] = true;
    },
    handle_keyup: function (e) {
        this.keydown[e.code] = false;
    }
}

export default Controller;