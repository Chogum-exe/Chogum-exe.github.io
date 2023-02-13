const Camera = {
    tx: 0,
    ty: 0,
    tz: 0,
    rx: 0,
    ry: 0,
    rz: 0,
    sp: 10,
    translate: function (x, y, z) {
        return [x+this.tx, y+this.ty, z+this.tz];
    }
}
addEventListener("keydown", (e)=>{
    switch (e.key) {
        case "w":
            Camera.ty += Camera.sp;
            break;
        case "s":
            Camera.ty -= Camera.sp;
            break;
        case "a":
            Camera.tx += Camera.sp;
            break;
        case "d":
            Camera.tx -= Camera.sp;
            break;
        case ".":
            Camera.tz -= Camera.sp;
            break;
        case ",":
            Camera.tz += Camera.sp;
        default:
            break;
    }
});