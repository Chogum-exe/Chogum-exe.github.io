"use strict";
import add from "./util.mjs";

(async () => {

    console.log(add(2, 5));
    await fetch("./test.json").then((res) => {
        console.log(res.json());
    })

})();