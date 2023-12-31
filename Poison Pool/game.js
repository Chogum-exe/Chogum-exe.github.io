var dif = "";
const setDifficulty = d => dif = d;
((D, M) => {
    let p = true,
        pl = {},
        go = false,
        sc = 0,
        cw = 0,
        hp = 5,
        f = 0,
        lvl = undefined;
    const c = D.getElementById("gc"),
        bo = D.getElementById("bo"),
        pr = D.getElementById("pr"),
        aud = { hit: D.getElementById("hs"), pow: D.getElementById("bu") },
        d = c.getContext("2d"),
        E = { w: false, a: false, s: false, d: false },
        l = e => {
            let s = e.type == "keydown" ? true : false;
            switch (e.keyCode) {
                case 87: E.w = s; break;
                case 38: E.w = s; break;
                case 65: E.a = s; break;
                case 37: E.a = s; break;
                case 83: E.s = s; break;
                case 40: E.s = s; break;
                case 68: E.d = s; break;
                case 39: E.d = s; break;
                case 32: if (s) p = !p; break;
                default: p = false;
            }
        },
        w = [() => {
            for (let i = 0; i < 14; i++) {
                let loc = M.rand(0, c.width * c.height);
                let x = loc % c.width;
                let y = (loc - x) / c.width;
                bub[bub.length] = new B(x, y, M.rand(25, 35), 3 * lvl);
            }
            for (let i = 0; i < 1 && f % 60 == 0; i++) {
                mis[mis.length] = new mI(M.rand(0, c.width), M.rand(-1, 1) ? 0 : c.height, 7, 5 * lvl);
            }
        }, () => {
            mis.splice(0, mis.length);
            for (let i = 0; i < 5; i++) {
                let x1 = 0;
                let y1 = 0;
                let x2 = 0;
                let y2 = 0;
                if (las.length % 2 == 0) {
                    x1 = M.rand(0, c.width);
                    x2 = M.rand(0, c.width);
                    y2 = c.height;
                } else {
                    x2 = c.width;
                    y1 = M.rand(0, c.height);
                    y2 = M.rand(0, c.height);
                };
                las[las.length] = new L(x1, y1, x2, y2, 30);
            }
        }],
        P = function (x, y, r, s) { this.x = x; this.y = y; this.r = r; this.s = s },
        B = function (x, y, r, s) { this.x = x; this.y = y; this.r = 0; this.rm = r; this.s = s; this.c = 1 },
        eF = function (x, y, r, s, c) { this.x = x; this.y = y; this.r = 0; this.rm = r; this.s = s, this.c = c },
        mI = function (x, y, r, s) { this.x = x; this.y = y; this.r = r; this.s = s; this.ef = (f + 150) % 900 },
        L = function (x1, y1, x2, y2, t) { this.x1 = x1; this.y1 = y1; this.x2 = x2; this.y2 = y2; this.t = 0; this.tm = t; this.s = 1; },
        bU = function (x, y, r, id, c) { this.x = x; this.y = y; this.r = r; this.id = id; this.c = c; this.ef = (f + 150) % 900 };
    M.dis = (x1, y1, x2, y2) => { return M.hypot(M.abs(x1 - x2), M.abs(y1 - y2)) };
    M.rand = (s, b) => { return M.floor(M.random() * (b - s) + 1) + s };
    aud.hit.volume = 0.1;
    aud.pow.volume = 0.4;
    P.prototype = {
        vel: { x: 0, y: 0 },
        f: 0.6,
        buff: { armo: false, sped: false },
        bEnd: { armo: 0, sped: 0 },
        draw: function () {
            d.fillStyle = "red";
            d.lineWidth = 3;
            if (this.buff.armo) { d.strokeStyle = "silver"; }
            else if (this.buff.sped) { d.strokeStyle = "blue"; }
            else { d.strokeStyle = "purple"; }
            d.beginPath();
            d.arc(this.x, this.y, this.r, 0, M.PI * 2);
            d.fill();
            d.stroke();
            d.closePath()
        },
        move: function () {
            let sb = this.buff.sped ? this.s * (1 / 5) : 0;
            if (E.w) this.vel.y -= this.s + sb
            else if (E.s) this.vel.y += this.s + sb;
            if (E.a) this.vel.x -= this.s + sb
            else if (E.d) this.vel.x += this.s + sb;
            this.vel.x *= this.f;
            this.vel.y *= this.f;
            this.x += this.vel.x;
            this.y += this.vel.y;
        },
        stopBuff: function () {
            for (let b in this.buff) {
                if (this.buff.hasOwnProperty(b) && f == this.bEnd[b]) {
                    this.buff[b] = false
                }
            }
        },
        ifHit: function () {
            if (this.buff.armo) { return undefined }
            aud.hit.play();
            eff[eff.length] = new eF(this.x, this.y, this.r + 20, 2, "red");
            hp--;
        },
        recBuff: function (id) {
            aud.pow.play();
            switch (id) {
                case "heal": hp++; break;
                case "armo": this.buff.armo = true; this.bEnd.armo = (f + 240) % 900; break;
                case "sped": this.buff.sped = true; this.bEnd.sped = (f + 300) % 900; break;
                default: break;
            }
        }
    };
    B.prototype = {
        expand: function (c) {
            let vel = this.s * this.r <= pl.r ? 0.06 : 1;
            if (this.r >= this.rm) this.c = -1;
            this.r += this.s * vel * this.c;
            if (this.r < 0) c();
        },
        draw: function () {
            d.fillStyle = this.r <= pl.r ? "yellow" : "lime";
            d.beginPath();
            d.arc(this.x, this.y, this.r < 0 ? 0 : this.r, 0, M.PI * 2);
            d.fill();
            d.closePath();
        }
    };
    eF.prototype = {
        expand: function (c) {
            if (this.r >= this.rm) c();
            this.r += this.s
        },
        draw: function () {
            d.strokeStyle = this.c;
            d.lineWidth = 3;
            d.beginPath();
            d.arc(this.x, this.y, this.r < 0 ? 0 : this.r, 0, M.PI * 2);
            d.stroke();
            d.closePath();
        }
    };
    mI.prototype = {
        draw: function () {
            d.strokeStyle = "yellow";
            d.fillStyle = "lime";
            d.lineWidth = 3;
            d.beginPath();
            d.arc(this.x, this.y, this.r, 0, M.PI * 2);
            d.fill();
            d.stroke();
            d.closePath();
        },
        move: function (c) {
            if (f == this.ef) c();
            let sc = this.s / M.dis(pl.x, pl.y, this.x, this.y);
            this.x += (pl.x - this.x) * sc;
            this.y += (pl.y - this.y) * sc;
        }
    };
    L.prototype = {
        expand: function (c) {
            let sp = this.t <= pl.r ? 0.08 : 1;
            this.t += 4 * this.s * sp * lvl;
            if (this.t >= this.tm) this.s = -1;
            if (this.t < 0) c();
        },
        draw: function () {
            d.lineCap = "round";
            d.lineWidth = this.t;
            d.strokeStyle = this.t <= pl.r ? "yellow" : "lime";
            d.beginPath();
            d.moveTo(this.x1, this.y1);
            d.lineTo(this.x2, this.y2);
            d.stroke();
            d.closePath();
        }
    };
    bU.prototype = {
        draw: function (c) {
            if (this.ef == f) c()
            d.fillStyle = this.c;
            d.beginPath();
            d.arc(this.x, this.y, this.r, 0, M.PI * 2);
            d.fill();
            d.closePath();
            if ((f % 30) == 0) {
                eff[eff.length] = new eF(this.x, this.y, this.r + 15, 1, this.c);
            }
        }
    };
    const bub = [],
        mis = [],
        eff = [],
        las = [],
        buf = [];
    d.fillStyle = "red";
    d.lineWidth = 3;
    d.strokeStyle = "purple";
    d.beginPath();
    d.arc(c.width / 2, c.height / 2, 8, 0, M.PI * 2);
    d.fill();
    d.stroke();
    d.closePath()
    let st = setInterval(() => {
        if (lvl == undefined && dif != ""){
            switch (dif){
                case "easy":lvl=1;break;
                case "medium":lvl=1.5;break;
                case "hard":lvl=1.75;break;
            }
            c.style.display = "block";
            pr.style.display = "none";
            D.addEventListener("keydown", e => l(e));
            D.addEventListener("keyup", e => l(e));
            pl = new P(c.width / 2, c.height / 2, 8, 3.5 * lvl);
            console.log(lvl);
        }
        if (go) {
            d.fillStyle = "black";
            d.fillRect(0, 0, c.width, c.height);
            d.font = "50px times-new-roman";
            d.fillStyle = "lime";
            d.textAlign = "center";
            d.fillText("GAME OVER", c.width / 2, c.height / 2 - 25);
            d.fillText("SCORE: " + sc, c.width / 2, c.height / 2 + 25);
            let rel = D.createElement("button");
            rel.innerHTML = "😈 PLAY AGAIN 😈";
            rel.onclick = () => { location.reload() };
            D.body.childNodes[1].appendChild(D.createElement("br"));
            D.body.childNodes[1].appendChild(rel);
            clearInterval(st);
        }
        else if (!p && lvl) {
            d.fillStyle = "rgba(0,0,0,0.25)";
            d.fillRect(0, 0, c.width, c.height);
            f++;
            if (f == 900) { f = 0; cw = cw + 1 == w.length ? 0 : cw + 1 };
            if (f % 30 == 0) {
                sc++;
                w[cw]()
            };
            if (buf.length < 1 && M.rand(0, 10) == 3 && (f % 30) == 0) {
                let loc = M.rand(0, c.width * c.height);
                let x = loc % c.width;
                let y = (loc - x) / c.width;
                let b = (["heal", "sped", "armo"])[M.rand(-1, 2)];
                let col = "";
                switch (b) {
                    case "heal": col = "purple"; break;
                    case "armo": col = "silver"; break;
                    case "sped": col = "blue"; break;
                    default: break;
                };
                buf[buf.length] = new bU(x, y, 15, b, col)
            };
            bub.forEach((b, i) => {
                b.expand(() => { bub.splice(i, 1) });
                b.draw();
                if (M.dis(pl.x, pl.y, b.x, b.y) < pl.r + b.r && b.r > pl.r) {
                    pl.ifHit();
                    bub.splice(i, 1);
                }
            });
            mis.forEach((m, i) => {
                m.draw();
                m.move(() => {
                    eff[eff.length] = new eF(m.x, m.y, m.r + 15, 2.5, "yellow");
                    mis.splice(i, 1)
                });
                if (M.dis(pl.x, pl.y, m.x, m.y) < pl.r + m.r) {
                    pl.ifHit();
                    mis.splice(i, 1);
                }
            });
            las.forEach((l, i) => {
                l.draw();
                l.expand(() => { las.splice(i, 1) });
                let m1 = (l.y2 - l.y1) / (l.x2 - l.x1);
                let m2 = -1 * (1 / m1);
                let b1 = l.y1 - m1 * l.x1;
                let b2 = pl.y - m2 * pl.x;
                let x = (b2 - b1) / (m1 - m2);
                let y = m1 * x + b1;
                if (M.dis(x, y, pl.x, pl.y) < pl.r + l.t && l.t > pl.r) {
                    pl.ifHit();
                }
            });
            buf.forEach((b, i) => {
                b.draw(() => { buf.splice(i, 1) });
                if (M.dis(pl.x, pl.y, b.x, b.y) <= pl.r + b.r) {
                    pl.recBuff(b.id);
                    buf.splice(i, 1)
                }
            });
            eff.forEach((e, i) => {
                e.expand(() => {
                    eff.splice(i, 1);
                });
                e.draw();
            });
            if (pl.x <= pl.r) { pl.x = pl.r }
            else if (pl.x >= c.width - pl.r) { pl.x = c.width - pl.r };
            if (pl.y <= pl.r) { pl.y = pl.r }
            else if (pl.y >= c.height - pl.r) { pl.y = c.height - pl.r };
            pl.move();
            pl.draw();
            pl.stopBuff();
            if (hp <= 0) go = true;
            let str = " ";
            for (let i = 0; i < hp; i++) {
                str += "💚 ";
            }
            bo.innerHTML = str + "-Poison Pool- " + sc;
        } else {
            d.fillStyle = "red";
            d.fillRect(10, 10, 15, 33);
            d.fillRect(33, 10, 15, 33);
        }
    }, 100 / 3);
})(document, Math)