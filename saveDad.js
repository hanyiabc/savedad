// Name: Guan Congyi, Han Yi, Pan Jiacong
var sketchProc = function (processingInstance) {
    with (processingInstance) {

        size(1280, 720);
        angleMode = "radiant";
        frameRate(60);
        /*   State: 0 - Home Screen
                    1 - Instruction
                    2 - Play
        */

        var state = 0;
        var keyArray = [];
        var backgroundImgs = [];
        var enemies = [];
        var particles = [];
        var pandas = [];
        var mainChar = [];
        var mainCharDad;
        var crocImgs = [];
        var textImgs = [];
        var bigCastle = [];
        var smallCastle = [];
        var love;
        var dad;

        var initialized=0;
        var wall; var grass; var brick;
        var ulrCharge = 0;
        var keyPressed = function () { keyArray[keyCode] = 1;};
        
        var keyReleased = function () { keyArray[keyCode] = 0;};
        var BagObj = function () {
            this.numofPotion = 7;
            this.numofRevive = 2;
        };

        var initialize = function()
        {

                pandas.push(loadImage("assets/panda.png"));
                pandas.push(loadImage("assets/panda_shy.png"));
                pandas.push(loadImage("assets/panda_dead.png"));

                backgroundImgs.push(loadImage("assets/battle_background.png"));
                backgroundImgs.push(loadImage("assets/status.png"));
                backgroundImgs.push(loadImage("assets/attack_menu.png"));
                backgroundImgs.push(loadImage("assets/attack_menu.png"));
                backgroundImgs.push(loadImage("assets/battle_backv2.png"));
                backgroundImgs.push(loadImage("assets/attack_menu_nf.png"));

                mainChar.push(loadImage("assets/main_back.png"));
                mainChar.push(loadImage("assets/main_back_f1.png"));
                mainChar.push(loadImage("assets/main_back_f2.png"));

                mainChar.push(loadImage("assets/main_front.png"));
                mainChar.push(loadImage("assets/main_front_f1.png"));
                mainChar.push(loadImage("assets/main_front_f2.png"));

                mainChar.push(loadImage("assets/main_left.png"));
                mainChar.push(loadImage("assets/main_right.png"));


                crocImgs.push(loadImage("assets/monster1_f1.png"));
                crocImgs.push(loadImage("assets/monster1_f2.png"));
                crocImgs.push(loadImage("assets/monster1_f3.png"));
                crocImgs.push(loadImage("assets/monster1_f4.png"));
                crocImgs.push(loadImage("assets/monster1_f5.png"));
                crocImgs.push(loadImage("assets/monster1_f6.png"));

                textImgs.push(loadImage("assets/save_dad.png"));
                textImgs.push(loadImage("assets/Instruction.png"));
                textImgs.push(loadImage("assets/Start_Adv.png"));

                bigCastle.push(loadImage("assets/bigcastle_blue.png"));
                bigCastle.push(loadImage("assets/bigcastle_green.png"));
                bigCastle.push(loadImage("assets/bigcastle_orange.png"));
                bigCastle.push(loadImage("assets/bigcastle_purple.png"));
                bigCastle.push(loadImage("assets/bigcastle_red.png"));
                bigCastle.push(loadImage("assets/bigcastle_yellow.png"));

                smallCastle.push(loadImage("assets/smallcastle_red_blue.png"));
                smallCastle.push(loadImage("assets/smallcastle_red_green.png"));
                smallCastle.push(loadImage("assets/smallcastle_red_orange.png"));
                smallCastle.push(loadImage("assets/smallcastle_red_yellow.png"));
                // game class for initializing wall block grass block and tilemap

                wall= loadImage("assets/block_brown_main.png");
                grass = loadImage("assets/grassblock1.png");
                brick = loadImage("assets/wall_castle.png");
                love = loadImage("assets/love.png");
                dad = loadImage("assets/dad.png");
        };
        initialize();

        
        var particleObj = function (x, y) {
            this.position = new PVector(x, y);
            this.velocity = new PVector(random(0, TWO_PI), random(-1.5, 1.5));
            this.size = random(1, 30);
            this.c1 = random(155, 255);
            this.c2 = random(0, 255);
            this.timeLeft = 30;
        };
        particleObj.prototype.move = function () {
            var v = new PVector(this.velocity.y * cos(this.velocity.x),
                this.velocity.y * sin(this.velocity.x));

            this.position.add(v);
            //this.position.add(this.velocity);	// cartesian
            this.timeLeft--;
        };

        particleObj.prototype.draw = function () {
            noStroke();
            fill(this.c1, this.c2, 0, this.timeLeft);
            ellipse(this.position.x, this.position.y, this.size, this.size);
        };


        var PandaObj = function (x, y) {
            this.x = x;
            this.y = y;
            this.step = 0;
            this.HP = 200;
            this.ATK = 50;
            this.currFrame = frameCount;
        }
        PandaObj.prototype.draw = function () {
            if (this.step < 3) {
                image(pandas[this.step], this.x - 75, this.y - 45, 150, 90);
                if (frameCount - this.currFrame > 30) {
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else {
                this.step = 0;
            }
        };
        //Create Bullet
        var BulletObj = function (x, y) {
            this.x = x;
            this.y = y;
            this.pos = 1;
            this.avatar = pandas;
        };
        var MyPandaBullet = new PandaObj(1, 1);
        BulletObj.prototype.draw = function () {
            bullet.select();
            // set bullet position
            if (this.pos === 1) { this.x = 470; this.y = 530; }
            if (this.pos === 2) { this.x = 470; this.y = 585; }
            MyPandaBullet.draw();
            fill(255,0,0);
            stroke(0,0,0);
            strokeWeight(2);
            ellipse(this.x-40, this.y, 20,20);
            MyPandaBullet.x = this.x; MyPandaBullet.y = this.y;
        };
        BulletObj.prototype.select = function () {
            if (keyArray[UP] === 1) {
                if (this.pos !== 1) { this.pos -= 1; }
                keyArray[UP] = 0;
            }
            if (keyArray[DOWN] === 1) {
                if (this.pos !== 2) { this.pos += 1; }
                keyArray[DOWN] = 0;
            }
            if (keyArray[ENTER] === 1) {
                if (this.pos === 1) { state = 1; }
                if (this.pos === 2) { state = 2; }
                keyArray[ENTER] = 0;
            }
        };


        var wallObj = function (x, y) { this.x = x; this.y = y; this.size = 40 }
        wallObj.prototype.draw = function () { image(wall, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); }
        var grassObj = function (x, y) { this.x = x; this.y = y; this.size = 40 }
        grassObj.prototype.draw = function () { image(grass, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); }
        var brickObj = function (x, y) { this.x = x; this.y = y; this.size = 40 }
        brickObj.prototype.draw = function () { image(brick, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); }
        var gameObj = function () {
            //64 36
            this.tilemap = [
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                "w                wwwwwwww           wwwwwww                    w",
                "w                wwbbbbww           wwbbbww                    w",
                "w                wwbbbbww           wwbbbww            wwwwwwwww",
                "wwwwwww          wwbbbbww           wwwbwww            wwwwwwwww",
                "wwwwwww          wwbbbbww           wwwwwww            wwwwwwwww",
                "wwwwwwwggggggggggwwbbbbww           ggggggg                    w",
                "wggggggggggggggggwwbbbbww           ggggggg                    w",
                "w                wwbbbbww           ggggggg                    w",
                "w                wwwwwwww           ggggggg                    w",
                "w                wwwwwwww           wwwwwww                    w",
                "w                                   wwwbwww                    w",
                "wwwwwwww                            wwbbbww                    w",
                "wwwwwwwwggggggggg                   wwbbbww                    w",
                "wwwwwwwwggggggggg                   wwwwwww                    w",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                w",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwbbbww                w",
                "w            wwwwwww                    wwbbbwwggggggggggwwwwwww",
                "w            wwwwwww                    wwbbbwwggggggggggwwwwwww",
                "w            wwwwwww                    wwwwwww          wwwwwww",
                "w                                                              w",
                "w                                                              w",
                "wwwwwwww                                                       w",
                "wwbbbbww                                                       w",
                "wwwwwwww                 wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                "w                        wwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
                "w                        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
                "w                 wwwwwwwwwwwwwww                    g          ",
                "w                 wwwbbbbbbbbbwww                     g         ",
                "w                 wwwwwwwwwbbbwww                      g        ",
                "w                        wwwbbwww   ggggggggggggggggggggg       ",
                "w                        wwwwwwww                      g        ",
                "w                        gggggggg                     g         ",
                "wwwwww                   gggggggg                    g          ",
                "wwwwww                   gggggggg                               ",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",];

            this.xCor = 0;
            this.yCor = 0;
            this.initMap = 0;
            this.walls = [];
            this.grasses = [];
            this.bricks = [];
            this.randPos = [];

        };
        var game = new gameObj();

        var bigCObj = function (x, y) {
            this.x = x;
            this.y = y;
            this.step = 0;
            this.currFrame = frameCount;
        };
        bigCObj.prototype.draw = function () {
            if (this.step < 6) {
                image(bigCastle[this.step], this.x, this.y, 1300, 800);
                if (frameCount - this.currFrame > 30) {
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else {
                this.step = 0;
            }
        };
        var smallCObj = function (x, y) {
            this.x = x;
            this.y = y;
            this.step = 0;
            this.currFrame = frameCount;
        };
        smallCObj.prototype.draw = function () {
            if (this.step < 4) {
                image(smallCastle[this.step], this.x, this.y, 600, 550);
                if (frameCount - this.currFrame > 30) {
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else {
                this.step = 0;
            }
        };
        var SpiderObj = function (x, y) {
            this.position = new PVector(x, y);
            this.size = 200;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            //this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"));
            this.spider.push(loadImage("assets/spider3.png"));
            this.spider.push(loadImage("assets/spider2.png"));
            this.HP = 300;
            this.currHP = this.HP;
            this.ATK = 60;
            this.pixMoved = 0;
        };

        SpiderObj.prototype.draw = function () {
            switch (this.state) {
                case 0:
                    image(this.spider[0], this.position.x, this.position.y, this.size, this.size);
                    break;
                case 1:
                    image(this.spider[1], this.position.x, this.position.y, this.size, this.size);
                    break;
                case 2:
                    image(this.spider[2], this.position.x, this.position.y, this.size, this.size);
                    break;
            }
            if (this.state < 3) {
                //image(this.spider[this.state], this.x, this.y, 240, 160);
                if (frameCount - this.currFrame > 30) {
                    this.currFrame = frameCount;
                    this.state++;
                }
            }
            else {
                this.state = 0;
            }
        };
        var Croc = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.step = 0;
            this.state = 0;
            this.size = 200;
            this.sizeX = 886 / 4;
            this.sizeY = 625 / 4;
            this.HP = 1700;
            this.ATK = 45;
            this.currHP = this.HP;
            this.pixMoved = 0;
        };
        Croc.prototype.draw = function () {
            if (frameCount - this.currFrame > 5) {
                this.step++;
                this.currFrame = frameCount;
            }
            if (this.step > 11) {
                this.step = 0;
            }
            if (this.step > 5) {
                image(crocImgs[11 - this.step], this.position.x, this.position.y, this.sizeX, this.sizeY);
            }
            else {
                image(crocImgs[this.step], this.position.x, this.position.y, this.sizeX, this.sizeY);
            }
        };

        // Maincharacter
        var MainStates = {
            UP: 1,
            DOWN: 2,
            LEFT: 3,
            RIGHT: 4,
            UPW: 5,
            DOWNW: 6
        };

        var MainChar = function (x, y, size) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.currFrame2 = frameCount;
            this.step = 0;
            this.size = size;
            this.MainStates = MainStates.UPW;
            this.HP = 1000;
            this.currHP = this.HP;
            this.ATK = 40;
            this.distMoved = 0;
        };

        var MainCharDad = function (x, y, size) {
            this.position = new PVector(x, y);
            this.size = size;
        };
        var Dad = new MainCharDad(600,300,200);
        MainCharDad.prototype.draw = function(){
            image(dad, this.position.x,this.position.y,  this.size,  this.size);
        };

        
        //functions for checking wall
        var checkWallUp = function () {
            for (var i = 0; i < game.walls.length; i++) {
                if (
                    (
                        (
                            (mainChara.position.x - mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x - mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        ) ||
                        (
                            (mainChara.position.x + mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x + mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        )
                    ) &&
                    (mainChara.position.y - 2 - mainChara.size / 2) >= (game.walls[i].y + game.walls[i].size / 2 - 2) &&
                    (mainChara.position.y - 2 - mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                ) {
                    return true;
                }

            }
        };
        var checkWallRight = function () {
            for (var i = 0; i < game.walls.length; i++) {
                if
                (
                    (
                        (
                            (mainChara.position.y - mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                            (mainChara.position.y - mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                        ) ||
                        (
                            (mainChara.position.y + mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                            (mainChara.position.y + mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                        )
                    ) &&
                    (mainChara.position.x + 2 + mainChara.size / 2) <= (game.walls[i].x - game.walls[i].size / 2 + 2) &&
                    (mainChara.position.x + 2 + mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2)
                ) {
                    return true;
                }

            }
        };
        var checkWallLeft = function () {
            for (var i = 0; i < game.walls.length; i++) {
                if
                (
                    (
                        (
                            (mainChara.position.y - mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                            (mainChara.position.y - mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                        ) ||
                        (
                            (mainChara.position.y + mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                            (mainChara.position.y + mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                        )
                    ) &&
                    (mainChara.position.x - 2 - mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2) &&
                    (mainChara.position.x - 2 - mainChara.size / 2) >= (game.walls[i].x + game.walls[i].size / 2 - 2)
                ) {
                    return true;
                }

            }
        };
        var checkWallDown = function () {
            for (var i = 0; i < game.walls.length; i++) {
                if (
                    (
                        (
                            (mainChara.position.x - mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x - mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        ) ||
                        (
                            (mainChara.position.x + mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x + mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        )
                    ) &&
                    (mainChara.position.y + 2 + mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                    (mainChara.position.y + 2 + mainChara.size / 2) <= (game.walls[i].y - game.walls[i].size / 2 + 2)
                ) {
                    return true;
                }

            }
        };

        MainChar.prototype.drawEnd = function(){
            this.MainStates = MainStates.RIGHT;
            this.position.x++;
            Dad.position = new PVector(1280-this.position.x, this.position.y-100);
            if (this.position.x >= 600){
                this.position.x = 600
                image(love, this.position.x+30, this.position.y-50, this.size, this.size); 
            }

        };

        MainChar.prototype.drawBattle = function () {
            image(mainChar[6], this.position.x, this.position.y, this.size, this.size);
        };

        MainChar.prototype.disp = function () {
            switch (this.MainStates) {
                case MainStates.UP:
                    image(mainChar[0], this.position.x, this.position.y, this.size, this.size);
                    if (frameCount - this.currFrame > 60) {
                        this.MainStates++;
                        this.currFrame = frameCount;
                    }
                    break;
                case MainStates.DOWN:
                    image(mainChar[3], this.position.x, this.position.y, this.size, this.size);
                    if (frameCount - this.currFrame > 60) {
                        this.MainStates++;
                        this.currFrame = frameCount;
                    }
                    break;
                case MainStates.LEFT:
                    image(mainChar[6], this.position.x, this.position.y, this.size, this.size);
                    if (frameCount - this.currFrame > 60) {
                        this.MainStates++;
                        this.currFrame = frameCount;
                    }
                    break;
                case MainStates.RIGHT:
                    image(mainChar[7], this.position.x, this.position.y, this.size, this.size);
                    if (frameCount - this.currFrame > 60) {
                        this.MainStates++;
                        this.currFrame = frameCount;
                    }
                    this.currFrame2 = frameCount;
                    break;
                case MainStates.UPW:
                    if (frameCount - this.currFrame === 15) {
                        this.step = 0;
                        //this.currFrame = frameCount;
                    }
                    else if (frameCount - this.currFrame === 30) {
                        this.step = 1;
                        this.currFrame = frameCount;
                    }
                    if (frameCount - this.currFrame2 > 120) {
                        this.currFrame2 = frameCount;
                        this.MainStates++;
                    }
                    image(mainChar[this.step + 1], this.position.x, this.position.y, this.size, this.size);
                    break;
                case MainStates.DOWNW:
                    if (frameCount - this.currFrame === 15) {
                        this.step = 0;
                        //this.currFrame = frameCount;
                    }
                    else if (frameCount - this.currFrame === 30) {
                        this.step = 1;
                        this.currFrame = frameCount;
                    }
                    if (frameCount - this.currFrame2 > 120) {
                        this.currFrame2 = frameCount;
                        this.MainStates = 1;
                    }
                    image(mainChar[this.step + 4], this.position.x, this.position.y, this.size, this.size);
                    break;
                default:
                    break;
            }

        };

        var mainCharBattle = new MainChar(880, 300);
        mainCharBattle.size = 250;

        var BattleMenuStates = {
            TURNINGL: 1,
            TURNINGR: 2,
            IDLE: 3,
            INBAG: 4,
            CHOSEN: 5,
            ENEMYATK: 6,
            WON: 7,
            LOST: 8,
            ATKING: 9,
            ATKED: 10,
            ENEATKING: 11,
            ENEATKED: 12,
            ULRING: 13,
            FLEE: 14,
            ULRNC: 15, 
            FLEEF: 16, 
        };

        var BattleMenuSelection = {
            ATK: 1,
            ULR: 2,
            FLEE: 3,
            ITEM: 4,
        };


        var bag = new BagObj();
        var GameBackground = function () {
            this.currY = 0;
            this.menuRotate = 0;
            this.state = BattleMenuStates.IDLE;
            this.degreeTurned = 0;
            this.prevAngle = 0;
            this.Increment = 0.08;
            this.selection = BattleMenuSelection.ATK;
            this.enemyIdx = 0;
            this.bagSelection = 0;
            this.pixMoved = 0;
        };

        GameBackground.prototype.draw = function () {
            image(backgroundImgs[0], 0, this.currY);
            image(backgroundImgs[0], 0, this.currY + 1440)
            image(backgroundImgs[4], 0, -50);
            this.currY--;
            image(backgroundImgs[1], 980, 420, 300, 300);
            textSize(38);
            fill(232, 211, 23);
            text(mainCharBattle.currHP, 1110, 620);
            text(mainCharBattle.HP, 1187, 672);
            textSize(70);
            text("/", 1175, 657);

            pushMatrix();
            translate(1015, 163);
            rotate(this.menuRotate);
            if (enemies.length == 1 && enemies[0] instanceof Croc)
            {
                image(backgroundImgs[5], -125, -125, 250, 250);                    
            }
            else
            {
                image(backgroundImgs[3], -125, -125, 250, 250);
                
            }
            popMatrix();


            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].currHP > 0) {
                    enemies[i].draw();
                    pushMatrix();
                    translate(enemies[i].position.x, enemies[i].position.y + enemies[i].size*0.8);
                    noFill();
                    strokeWeight(3);
                    stroke(0,0,0);
                    rect(0, 0, enemies[i].size, 10);
                    fill(0, 255, 0);
                    var temp = enemies[i].size * (enemies[i].currHP / enemies[i].HP);
                    if (temp < 0) {
                        temp = 0;
                    }
                    rect(0, 0, temp, 10);

                    popMatrix();
                }

            }

            mainCharBattle.drawBattle();
            if (this.currY == -1440) {
                this.currY = 0;
            }
            for (var i = 0; i < particles.length; i++) {
                if (particles[i].timeLeft > 0) {
                    particles[i].draw();
                    particles[i].move();
                }
                else {
                    particles.splice(i, 1);
                }
            }

            if(this.state==BattleMenuStates.IDLE)
            {
                var textposX = 310;
                var textposY = 23;
                fill(0,255,0);
                strokeWeight(3);
                stroke(0,0,0);
                rect(300, 0, 800, 30);
                textSize(24);
                fill(0, 0, 0);
                switch (this.selection) {
                    case BattleMenuSelection.ATK:
                        text("Attak the enemy: damage depends on the character's strength", textposX, textposY);
                        break;
                    case BattleMenuSelection.ITEM:
                        text("Use Item: using an item will finish your round", textposX, textposY);
                        break;
                    case BattleMenuSelection.FLEE:
                        if (enemies[0] instanceof Croc) {
                            text("You can't flee while fighting the boss.", textposX, textposY);
                        }
                        else {
                            text("You have 30% chances to flee successfully.", textposX, textposY);                            
                        }
                        break;
                    case BattleMenuSelection.ULR:
                        text("Ultimate Skill: Deals 300 Damage, recharge every 3 rounds", textposX, textposY);
                        break;
                }
            }
        };
        

        //left/right selection
        var pb = 1;
        GameBackground.prototype.move = function () {
            switch (this.state) {
                case BattleMenuStates.IDLE:
                    if (keyArray[LEFT]) {
                        keyArray[LEFT] = 0;
                        this.state = BattleMenuStates.TURNINGL;
                        this.degreeTurned = 0;
                        this.prevAngle = this.menuRotate;
                        if (this.selection == BattleMenuSelection.ATK) {
                            this.selection = BattleMenuSelection.ITEM;
                        }
                        else {
                            this.selection--;
                        }
                    }
                    else if (keyArray[RIGHT]) {
                        keyArray[RIGHT] = 0;
                        this.state = BattleMenuStates.TURNINGR;
                        this.degreeTurned = 0;
                        this.prevAngle = this.menuRotate;
                        if (this.selection == BattleMenuSelection.ITEM) {
                            this.selection = BattleMenuSelection.ATK;
                        }
                        else {
                            this.selection++;
                        }
                    }

                    else if (keyArray[ENTER]) {
                        keyArray[ENTER] = 0;
                        switch (this.selection) {
                            case BattleMenuSelection.ATK:
                                this.state = BattleMenuStates.ATKING;
                                ulrCharge++;
                                break;
                            case BattleMenuSelection.ITEM:
                                this.state = BattleMenuStates.INBAG
                                break;
                            case BattleMenuSelection.FLEE:
                                if (enemies.length == 1 && enemies[0] instanceof Croc) {
  
                                }
                                else
                                {
                                    this.state = BattleMenuStates.FLEE;                                    
                                }
                                break;
                            case BattleMenuSelection.ULR:
                                if (ulrCharge >= 3)
                                {
                                    ulrCharge = 0;
                                    this.state = BattleMenuStates.ULRING;
                                }
                                else
                                {
                                    this.state = BattleMenuStates.ULRNC;
                                }
                                break;
                        }


                    }

                    break;
                case BattleMenuStates.TURNINGL:
                    this.menuRotate += this.Increment;
                    this.degreeTurned += this.Increment;
                    if (this.degreeTurned > PI / 2) {
                        this.state = BattleMenuStates.IDLE;
                        this.menuRotate = PI / 2 + this.prevAngle;
                    }
                    break;
                case BattleMenuStates.TURNINGR:
                    this.menuRotate -= this.Increment;
                    this.degreeTurned += this.Increment;
                    if (this.degreeTurned > PI / 2) {
                        this.state = BattleMenuStates.IDLE;
                        this.menuRotate = this.prevAngle - PI / 2;
                    }
                    break;
                case BattleMenuStates.INBAG:

                    if (keyArray[UP]) {
                        keyArray[UP] = 0;
                        if (this.bagSelection == 0) {
                            this.bagSelection = 2;
                        }
                        else {
                            this.bagSelection--;
                        }
                    }
                    else if (keyArray[DOWN]) {
                        keyArray[DOWN] = 0;
                        if (this.bagSelection == 2) {
                            this.bagSelection = 0;
                        }
                        else {
                            this.bagSelection++;
                        }
                    }
                    strokeWeight(3);
                    rect(300, 20, 700, 300);
                    strokeWeight(1);
                    fill(255, 255, 0);
                    rect(320, 65 + 30 * this.bagSelection, 640, 25);

                    textSize(24);
                    fill(0, 0, 0);
                    text("Item                            Count", 380, 50);
                    text("Potion:                                                        ", 380, 85);
                    text("Life Potion:                                                   ", 380, 115);
                    text(bag.numofPotion, 830, 85);
                    text(bag.numofRevive, 830, 115);
                    text("Back", 380, 145);
                    switch (this.bagSelection) {
                        case 0:
                            text("Potion: Recover 500 HP", 380, 200);
                            break;
                        case 1:
                            text("Life Potion: Revive and Recover 150 HP", 380, 200);
                            break;
                        case 2:
                            text("Go Back", 380, 200);
                            break;
                        default:
                            break;
                    }

                    if (keyArray[ENTER]) {
                        keyArray[ENTER] = 0;
                        ulrCharge++;
                        switch (this.bagSelection) {
                            case 0:
                                if (bag.numofPotion > 0) {
                                    bag.numofPotion--;
                                    mainCharBattle.currHP += 500;
                                    if (mainCharBattle.currHP >= mainCharBattle.HP) {
                                        mainCharBattle.currHP = mainCharBattle.HP;
                                    }
                                    this.state = BattleMenuStates.ENEATKING;
                                }

                                break;
                            case 1:
                                if (bag.numofRevive > 0) {
                                    bag.numofRevive--;
                                    mainCharBattle.currHP += 150;
                                    if (mainCharBattle.currHP >= mainCharBattle.HP) {
                                        mainCharBattle.currHP = mainCharBattle.HP;
                                    }
                                    this.state = BattleMenuStates.ENEATKING;
                                }
                                break;
                            case 2:
                                this.state = BattleMenuStates.IDLE;
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case BattleMenuStates.ENEMYATK:
                    for (var i = 0; i < enemies.length; i++) {
                        mainCharBattle.currHP -= enemies[i].ATK + Math.floor((Math.random() * enemies[i].ATK) + 1);
                    }
                    if (mainCharBattle.currHP < 0) {
                        mainCharBattle.currHP = 0;
                        this.state = BattleMenuStates.LOST;
                    }
                    this.state = BattleMenuStates.IDLE;
                    break;
                case BattleMenuStates.WON:
                    fill(0, 255, 0);
                    stroke(0, 0, 0);
                    rect(300, 300, 600, 250);
                    fill(0, 0, 0);
                    textSize(50);
                    text("You Won!\nPress Enter", 350, 400)
                    if(keyArray[ENTER])
                    {
                        keyArray[ENTER]=0
                        this.state = BattleMenuStates.IDLE;
                        state = 2;
                    }
                    break;
                case BattleMenuStates.LOST:
                    if(bag.numofRevive!=0)
                    {
                        fill(0,255,0);
                        stroke(0,0,0);
                        rect(300,300,600,250);
                        fill(0,0,0);
                        textSize(50);
                        text("Life Potion Used\nPress Enter", 350, 400)

                        if (keyArray[ENTER]) {
                            keyArray[ENTER] = 0
                            bag.numofRevive--;
                            mainCharBattle.currHP=150;
                            this.state= BattleMenuStates.IDLE;
                        }
                    }
                    else
                    {
                        fill(0, 255, 0);
                        stroke(0, 0, 0);
                        rect(300, 300, 700, 250);
                        fill(0, 0, 0);
                        textSize(50);
                        text("You Lose!\nPress Enter to try again", 350, 350);
                        if (keyArray[ENTER]) {
                            keyArray[ENTER] = 0
                            state = 0;
                            mainChara = new MainChar(350, 200, 100);
                            mainChara1 = new MainChar(250, 500, 150);
                            mainCharBattle = new MainChar(880, 300);
                            game = new gameObj();
                            battleBack = new GameBackground();
                            mainCharBattle.size = 250;
                            enemies = [];
                            bag = new BagObj();
                        }
                    }
                    break;
                case BattleMenuStates.ATKING:

                    if (this.pixMoved >= 32) {
                        if (particles.length == 0) {
                            enemies[this.enemyIdx].position.x += 16;
                            this.state = BattleMenuStates.ATKED;
                            this.pixMoved = 0;
                        }
                    }
                    else if (this.pixMoved >= 16) {
                        mainCharBattle.position.x += 2;
                        this.pixMoved += 2;
                        enemies[this.enemyIdx].position.x -= 2;

                    }
                    else if (this.pixMoved < 16) {
                        mainCharBattle.position.x -= 2;
                        this.pixMoved += 2;
                    }
                    if (this.pixMoved == 16) {
                        for (var i = 0; i < 200; i++) {
                            particles.push(new particleObj(enemies[this.enemyIdx].position.x + enemies[this.enemyIdx].size / 2, enemies[this.enemyIdx].position.y + enemies[this.enemyIdx].size / 2));
                        }
                    }
                    break;
                case BattleMenuStates.ATKED:
                    enemies[this.enemyIdx].currHP -= mainCharBattle.ATK + Math.floor((Math.random() * mainCharBattle.ATK) + 1);
                    var isCorc = 0;
                    for (var i = enemies.length - 1; i >= 0; i--) {
                        if (enemies[i].currHP <= 0) {
                            isCorc = enemies[i] instanceof Croc;
                            enemies.splice(i, 1);
                        }
                    }
                    this.state = BattleMenuStates.ENEATKING;
                    if (enemies.length == 0) {
                        this.state = BattleMenuStates.WON;
                    }
                    if (isCorc)
                    {
                        this.state = BattleMenuStates.IDLE;
                        state = 5;
                    }
                    break;
                case BattleMenuStates.ENEATKING:
                    for(var i =0;i<enemies.length;i++)
                    {
                        if (enemies[i].pixMoved >= 16) {
                            mainCharBattle.position.x += 2;
                            enemies[i].pixMoved += 2;
                            enemies[i].position.x -= 2;
                            if (enemies[i].pixMoved >= 32) {
                                mainCharBattle.position.x -= 16;
                                this.state = BattleMenuStates.ENEATKED;
                                for (var j = 0; j < enemies.length; j++) {
                                    enemies[j].pixMoved = 0;                                
                                }
                            }
                        }
                        else if (enemies[i].pixMoved < 16) {
                            enemies[i].position.x += 2;
                            enemies[i].pixMoved += 2;
                        }
                        if (enemies[i].pixMoved == 16) {
                            for (var i = 0; i < 200; i++) {
                                particles.push(new particleObj(mainCharBattle.position.x + mainCharBattle.size / 3, mainCharBattle.position.y + mainCharBattle.size / 3));
                            }
                        }
                    }
                    
                    break;
                case BattleMenuStates.ENEATKED:
                    if(particles.length==0)
                    {
                        for (var i = 0; i < enemies.length; i++) {
                            mainCharBattle.currHP -= enemies[i].ATK + Math.floor((Math.random() * enemies[i].ATK) + 1);
                        }
                        this.state = BattleMenuStates.IDLE;
                    }
                    if (mainCharBattle.currHP <= 0) {
                        mainCharBattle.currHP = 0;
                        this.state = BattleMenuStates.LOST;
                    }
                    break;
                case BattleMenuStates.ULRING:
                    if (this.pixMoved >= 32) {
                        if (particles.length == 0) {
                            enemies[this.enemyIdx].position.x += 16;
                            this.state = BattleMenuStates.ULRED;
                            this.pixMoved = 0;
                        }
                    }
                    else if (this.pixMoved >= 16) {
                        mainCharBattle.position.x += 2;
                        this.pixMoved += 2;
                        enemies[this.enemyIdx].position.x -= 2;

                    }
                    else if (this.pixMoved < 16) {
                        mainCharBattle.position.x -= 2;
                        this.pixMoved += 2;
                    }
                    if (this.pixMoved == 16) {
                        for (var i = 0; i < 800; i++) {
                            var rand = random(-100,100);
                            particles.push(new particleObj(enemies[this.enemyIdx].position.x + enemies[this.enemyIdx].size / 2+rand , enemies[this.enemyIdx].position.y + enemies[this.enemyIdx].size / 2+rand));
                        }
                    }
                    break;
                case BattleMenuStates.ULRED:
                    enemies[this.enemyIdx].currHP -= 300;
                    for (var i = enemies.length - 1; i >= 0; i--) {
                        if (enemies[i].currHP <= 0) {
                            enemies.splice(i, 1);
                        }
                    }
                    this.state = BattleMenuStates.ENEATKING;
                    if (enemies.length == 0) {
                        this.state = BattleMenuStates.WON;
                    }
                    break;
                case BattleMenuStates.FLEE:
                    var rand = random(1, 10);
                    prob = Math.floor(rand);
                    println(prob);
                    if (prob <= pb) {
                        enemies = [];
                        this.state = BattleMenuStates.IDLE;
                        state = 2;
                        pb = 3;
                    }
                    else {
                        pb++;
                        this.state = BattleMenuStates.FLEEF;
                        
                    }
                    break;
                case BattleMenuStates.ULRNC:
                    fill(0, 255, 0);
                    stroke(0, 0, 0);
                    rect(180, 300, 1000, 250);
                    fill(0, 0, 0);
                    textSize(50);
                    text("Ultimate Skill Not Charged. \nPress Enter", 200, 400)
                    if (keyArray[ENTER]) {
                        keyArray[ENTER] = 0
                        this.state = BattleMenuStates.IDLE;
                    }
                    break;
                case BattleMenuStates.FLEEF:
                    fill(0, 255, 0);
                    stroke(0, 0, 0);
                    rect(180, 300, 1000, 250);
                    fill(0, 0, 0);
                    textSize(50);
                    text("Failed to flee. \nPress Enter", 200, 400)
                    if (keyArray[ENTER]) {
                        keyArray[ENTER] = 0
                        this.state = BattleMenuStates.ENEATKING;
                    }
                    break;
                    default:
                    break;
            }
        };

        gameObj.prototype.initTilemap = function () {
            for (var i = 0; i < this.tilemap.length; i++) {
                for (var j = 0; j < this.tilemap[i].length; j++) {
                    switch (this.tilemap[i][j]) {
                        case 'w':
                            this.walls.push(new wallObj(j * 40, i * 40));
                            break;
                        case 'g':
                            this.grasses.push(new grassObj(j * 40, i * 40));
                            break;
                        case 'b':
                            this.bricks.push(new brickObj(j * 40, i * 40));
                            break;
                    }
                }
            }
            for (var i = 0; i < 5; i++) {
                var r = round(random(0, this.grasses.length));
                //println(r);
                var pos = new PVector(this.grasses[r].x, this.grasses[r].y);
                this.randPos.push(pos);
            }

        };

        gameObj.prototype.metMonster = function () {
            
            var rand = random(1, 3);
            if (Math.floor(rand) == 1) {
                enemies.push(new SpiderObj(200, 350));
            }
            else if (Math.floor(rand) == 2) {
                enemies.push(new SpiderObj(200, 350));
                enemies.push(new SpiderObj(450, 200));
            }
            pb = 2;
            state = 4;

        };

        MainChar.prototype.move = function () {
            // Change map threshhold here
            var mapxMin = 100;
            var mapxMax = 700;
            var mapyMin = 200;
            var mapyMax = 400;
            if (keyArray[UP] === 1) {
                this.MainStates = 5;
                if (!checkWallUp()) {
                    if (keyArray[SHIFT] === 1) {
                        if (this.position.y + game.yCor <= mapxMin) {
                            game.yCor += 3;
                        }
                        this.position.y -= 3;
                        this.distMoved += 3;

                    }
                    else {
                        if (this.position.y + game.yCor <= mapxMin) {
                            game.yCor += 2;
                        }
                        this.position.y -= 2;
                        this.distMoved += 2;

                    }
                }
                else
                {
                    this.position.y ++;

                }
            }
            else if (keyArray[DOWN] === 1) {
                this.MainStates = 6;
                if (!checkWallDown()) {
                    if (keyArray[SHIFT] === 1) {
                        if (this.position.y + game.yCor >= mapyMax) {
                            game.yCor -= 3;
                        }
                        this.position.y += 3;
                        this.distMoved += 3;

                    }
                    else {
                        if (this.position.y + game.yCor >= mapyMax) {
                            game.yCor -= 2;
                        }
                        this.position.y += 2;
                        this.distMoved += 2;

                    }
                }
                else
                {
                    this.position.y--;

                }

            }
            else if (keyArray[RIGHT] === 1) {
                this.MainStates = 4;
                if (!checkWallRight()) {
                    if (keyArray[SHIFT] === 1) {
                        if (this.position.x + game.xCor >= mapxMax) {
                            game.xCor -= 3;
                        }
                        this.position.x += 3;
                        this.distMoved += 3;

                    }
                    else {
                        if (this.position.x + game.xCor >= mapxMax) {
                            game.xCor -= 2;
                        }
                        this.position.x += 2;
                        this.distMoved += 2;

                    }
                }
                else
                {
                    this.position.x--;

                }
            }
            else if (keyArray[LEFT] === 1) {
                this.MainStates = 3;
                if (!checkWallLeft()) {
                    if (keyArray[SHIFT] === 1) {
                        if (this.position.x + game.xCor <= mapyMin) {
                            game.xCor += 3;
                        }
                        this.position.x -= 3;
                        this.distMoved += 3;

                    }
                    else {
                        if (this.position.x + game.xCor <= mapyMin) {
                            game.xCor += 2;
                        }
                        this.position.x -= 2;
                        this.distMoved += 2;

                    }
                }
                else
                {
                    this.distMoved++;

                }
            }
            if(this.position.y > 1120 && this.position.x > 2300)
            {  
                enemies.push(new Croc(200, 350));                
                state = 4;
            }
        };

        MainChar.prototype.draw = function () {
            switch (this.MainStates) {
                case MainStates.UP:
                    image(mainChar[0], this.position.x - this.size / 2, this.position.ythis.size / 2, this.size, this.size);
                    
                    break;
                case MainStates.DOWN:
                    image(mainChar[3], this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
                    
                    break;
                case MainStates.LEFT:
                    image(mainChar[6], this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
                    
                    break;
                case MainStates.RIGHT:
                    image(mainChar[7], this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
                    
                    break;
                case MainStates.UPW:
                    if (this.distMoved % 60 < 30) {
                        this.step = 0;
                    }
                    else if (this.distMoved % 60 > 30) {
                        this.step = 1;
                        this.currFrame = frameCount;
                    }
                    image(mainChar[this.step + 1], this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
                    break;
                case MainStates.DOWNW:
                    if (this.distMoved % 60 < 30) {
                        this.step = 0;
                    }
                    else if (this.distMoved % 60 > 30) {
                        this.step = 1;
                        this.currFrame = frameCount;
                    }
                    image(mainChar[this.step + 4], this.position.x - this.size / 2, this.position.y - this.size / 2, this.size, this.size);
                    break;
                default:
                    break;
            }
        };


            var star = function (x, y, d) {
                noStroke();
                fill(250, 245, 250);
                ellipse(x, y, d, d);
            };

            var bigC1 = new bigCObj(-50, -50);
            var smallC1 = new smallCObj(-150, 170);
            var smallC2 = new smallCObj(760, 170);
            var croc1 = new Croc(1050, 0);
            var mainChara1 = new MainChar(250, 500, 150);
            var mainChara2 = new MainChar(250, 600, 150);
            var bullet = new BulletObj(75, 150);
            var battleBack = new GameBackground();

            var draw = function () {
 
                switch (state) {
                    case 0: // main screen
                        var f = createFont("monospace");
                        // Title
                        textFont(f);
                        background(28, 31, 29);
                        for (var i = 0; i < 500; i++) {
                            star(random(width), random(height), random(1, 2));
                        }
                        bigC1.draw();
                        smallC1.draw();
                        smallC2.draw();
                        mainChara1.disp();
                        croc1.draw();
                        textSize(42);
                        fill(232, 211, 23);
                        image(textImgs[0], 400, -90, 420, 350);

                        //bullet point
                        stroke(228, 237, 59);
                        strokeWeight(10);
                        var pos = bullet.draw();

                        // Options
                        textSize(30);
                        fill(30, 189, 94);
                        image(textImgs[1], 450-75, 380-75, 450, 450);
                        image(textImgs[2], 450 - 75, 420 - 50, 450, 450);

                        // Author
                        textSize(20);
                        text("UP/DOWN To navigate; Enter to select",10,690)
                        text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all rights reserve", 550, 690);
                        break;
                    case 1:  // instruction
                        var f = createFont("monospace");
                        textFont(f);
                        background(51, 33, 51);

                        textSize(42);
                        fill(232, 211, 23);
                        text("  _Instruction_ \n", 440, 70);
                        textSize(25);
                        //Instruction: You are looking for your dady, \nbut you have to go through a garden filled with spiders\n
                        text("Dad has been caught by a Crocodile. \nFight the spiders in the garden \nand beat the crocdile to win\nIn the Map: Up/Down/Left/Right to move, Shift to Accelerate\nDuring battle: Left and Right to choose an option, enter to confirm.\n\n\nYou are unable to flee from battle for now\nYou have 7 potions in the bag\nLife potion can revive you but can only recover 150 HP\n", 300, 180);
                        
                        if (keyArray[ENTER] === 1) {
                            //println(2);
                            state = 0;
                            keyArray[ENTER] = 0;
                        }
                        break;
                    case 2:  // start game
                        background(0, 33, 51);
                        pushMatrix();
                        translate(game.xCor, game.yCor);
                        if (game.initMap === 0) { mainChara = new MainChar(350, 200, 100); game.initTilemap(); game.initMap = 1; }

                        //if (game.initMap === 0) { mainChara = new MainChar(2100,1000 , 100); game.initTilemap(); game.initMap = 1; }
                        for (var i = 0; i < game.walls.length; i++) {
                            game.walls[i].draw();
                        }
                        for (i = 0; i < game.grasses.length; i++) {
                            game.grasses[i].draw();
                        }
                        for (i = 0; i < game.bricks.length; i++) {
                            game.bricks[i].draw();
                        }
                        mainChara.draw();
                        mainChara.move();
                        var randnum  =random(300,800);
                        if(mainChara.distMoved > randnum+700)
                        {
                            mainChara.distMoved = 0;
                            game.metMonster();

                        }

                        if (keyArray[ENTER] === 1) {
                            state = 0;
                            keyArray[ENTER] = 0;
                        }
                        if(keyArray[65] === 1){
                            state = 5;
                        }
                        popMatrix();

                        break;

                    case 3: // 

                        break;
                    case 4:
                        
                        fill(255,255,255);
                        rect(0, 0, 1280, 720);
                        battleBack.draw();
                        battleBack.move();
                        break;
                    case 5:
                        background(29, 40, 115);
                        fill(255, 242, 0);
                        for (var i = 0; i < 500; i++) {
                            star(random(width), random(height), random(1, 2));
                        }
                        fill(255, 255, 175);
                        ellipse(120, 105, 100, 100);
                        bigC1.draw();
                        smallC1.draw();
                        smallC2.draw();
                        mainChara2.drawEnd();
                        mainChara2.draw();
                        Dad.draw();
                        textSize(30);
                        if (keyArray[ENTER]) {
                            keyArray[ENTER] = 0
                            state = 0;
                            mainChara = new MainChar(350, 200, 100);
                            mainChara1 = new MainChar(250, 500, 150);
                            mainCharBattle = new MainChar(880, 300);
                            game = new gameObj();
                            battleBack = new GameBackground();
                            mainCharBattle.size = 250;
                            enemies = [];
                            bag = new BagObj();
                        }
                    default:
                        break;
                }
            };
    }
    
};
// var canvas = document.getElementById("mycanvas");
// var processingInstance = new Processing(canvas, sketchProc); 
