'use strict';
    const random = (min, max) => {
        return Math.floor(Math.random()*(max-min+1))+min;
    };
    
    (() => {
      var can = document.getElementById('can'),
          ctx = can.getContext('2d');

        var title = document.getElementById("title");
        var sc1 = 0;
        var sc2 = 0;

        var paused = false;
        var fric = 0.7;

        var ball = {
            x: can.width/2,
            y: can.height/2,
            r: 10,
            velx: 0,
            vely: 0,
            checkBounce: function(){
                if (this.y <= 0 || this.y >= can.height){
                    this.vely *= -1;
                };
                if (this.x == this.r+p1.x+p1.w && this.y >= p1.y && this.y <= p1.y+p1.h){
                    this.velx *= -1;
                    this.vely += p1.vely;
                }
                else if (this.x == p2.x-this.r && this.y >= p2.y && this.y <= p2.y+p2.h){
                    this.velx *= -1;
                    this.vely += p2.vely;
                };
                if (this.x <= 0){
                    sc2++;
                    this.x = can.width/2;
                    this.y = can.height/2;
                    let sp = 0;
                    if (this.velx < 0){
                        sp = this.velx-1;
                    } else {
                        sp = this.velx+1;
                    };
                    this.vely = 0;
                    this.velx = 0;
                    addEventListener("keydown", () => { this.velx = sp; }, {once: true})
                    p1.y = (can.height-p1.h)/2;
                    p2.y = (can.height-p2.h)/2;
                }
                else if (this.x >= can.width){
                    sc1++;
                    this.x = can.width/2;
                    this.y = can.height/2;
                    let sp = 0;
                    if (this.velx < 0){
                        sp = this.velx-1;
                    } else {
                        sp = this.velx+1;
                    };
                    this.vely = 0;
                    this.velx = 0;
                    addEventListener("keydown", () => { this.velx = sp; }, {once: true})
                    p1.y = (can.height-p1.h)/2;
                    p2.y = (can.height-p2.h)/2;
                };
                this.y += this.vely;
                this.x += this.velx;
            },
            render: function(){
                this.checkBounce();
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        };

        var p1 = {
            x: 10,
            y: (can.height-75)/2,
            vely: 0,
            w: 20,
            h: 75,
            move: function(){
                if (keys.w){
                    this.vely -= 5;
                }
                else if (keys.a){
                    this.vely += 5;
                };
                this.y += this.vely;
                this.vely *= fric;
            },
            render: function(){
                this.move();
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.closePath();
            }
        };

        var p2 = {
            x: can.width-30,
            y: (can.height-75)/2,
            vely: 0,
            w: 20,
            h: 75,
            move: function(e){
                if (keys.i){
                    this.vely -= 5;
                }
                else if (keys.k){
                    this.vely += 5;
                };
                this.y += this.vely;
                this.vely *= fric;
            },
            render: function(){
                this.move();
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.fillRect(this.x, this.y, this.w, this.h);
                ctx.closePath();
            }
        };

        var keys = {
            w: false,
            a: false,
            i: false,
            k: false
        };

        var listner = (e) => {
            let state = e.type == "keydown" ? true:false;
            switch (e.keyCode) {
                case 87:
                    keys.w = state;
                    break;
                case 83:
                    keys.a = state;
                    break;
                case 73:
                    keys.i = state;
                    break;
                case 75:
                    keys.k = state;
                    break;
                case 32:
                    if (state) paused = !paused;
                    break;
                default:
                    break;
            };
        };
        window.addEventListener("keydown", listner);
        window.addEventListener("keyup", listner);
        window.addEventListener("keydown", (e) => { ball.velx = random(1, 2) == 1 ? -5:5; }, {once: true});

        var loop = () => {
            if (!paused){
                ctx.clearRect(0, 0, can.width, can.height);
                ctx.beginPath();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 3;
                ctx.moveTo(can.width/2, 0);
                ctx.lineTo(can.width/2, can.height);
                ctx.stroke();
                ctx.closePath();
                ball.render();
                p1.render();
                p2.render();
                title.innerHTML = sc1+'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp PONG &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+sc2;
                scrollTo(0, 0);
                if (sc1 == 5){
                    document.body.innerHTML = '<center><h1 style="color: white;">Player One Wins</h1><h1 style="color: white;">Player One Wins</h1><h1 style="color: white;">Player One Wins</h1><h1 style="color: white;">Player One Wins</h1><h1 style="color: white;">Player One Wins</h1><br/><style>body { background-color: black; }</style></center>';
                    clearInterval(timer);
                }
                else if (sc2 == 5){
                    document.body.innerHTML = '<center><h1 style="color: white;">Player Two Wins</h1><h1 style="color: white;">Player Two Wins</h1><h1 style="color: white;">Player Two Wins</h1><h1 style="color: white;">Player Two Wins</h1><h1 style="color: white;">Player Two Wins</h1><br/><style>body { background-color: black; }</style></center>';
                    clearInterval(timer);
                };
            };
        };
        var timer = setInterval(loop, 40);

    })()