// Name: Guan Congyi, Han Yi, Pan Jiacong

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";

        /*   State: 0 - Home Screen
                    1 - Instruction
                    2 - Play
        */
        var state = 4;
        var keyArray = [];
        var releaseArray = [];
        var backgroundImgs = [];
        var enemies = [];
        var keyPressed = function () { keyArray[keyCode] = 1; };
        var keyReleased = function () { keyArray[keyCode] = 0; releaseArray[keyCode] = 1; };
        var bagObj = function () {
            this.numofPotion = 0;
            this.numofRevive = 0;
        }



        // Panda 
        var pandas = [];
        pandas.push(loadImage("assets/panda.png"));
        pandas.push(loadImage("assets/panda_shy.png"));
        pandas.push(loadImage("assets/panda_dead.png"));
        //pandas.push(loadImage("assets/panda_angry1.png"));

        backgroundImgs.push(loadImage("assets/battle_background.png"));
        backgroundImgs.push(loadImage("assets/status.png"));
        backgroundImgs.push(loadImage("assets/attack_menu.png"));
        backgroundImgs.push(loadImage("assets/attack_menu_nf.png"));


        //PandaObj.prototype.currFrame = frameCount;


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
                image(pandas[this.step], this.x, this.y, 240, 160);
                if (frameCount - this.currFrame > 30) {
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else {
                this.step = 0;
            }
        }
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
            if (this.pos === 1) { this.x = 350; this.y = 170; }
            if (this.pos === 2) { this.x = 350; this.y = 270; }
            MyPandaBullet.draw();
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

        mainChar = [];
        mainChar.push(loadImage("assets/main_back.png"));
        mainChar.push(loadImage("assets/main_back_f1.png"));
        mainChar.push(loadImage("assets/main_back_f2.png"));

        mainChar.push(loadImage("assets/main_front.png"));
        mainChar.push(loadImage("assets/main_front_f1.png"));
        mainChar.push(loadImage("assets/main_front_f2.png"));

        mainChar.push(loadImage("assets/main_left.png"));
        mainChar.push(loadImage("assets/main_right.png"));


        var crocImgs = [];
        crocImgs.push(loadImage("assets/monster1_f1.png"));
        crocImgs.push(loadImage("assets/monster1_f2.png"));
        crocImgs.push(loadImage("assets/monster1_f3.png"));
        crocImgs.push(loadImage("assets/monster1_f4.png"));
        crocImgs.push(loadImage("assets/monster1_f5.png"));
        crocImgs.push(loadImage("assets/monster1_f6.png"));

        var textImgs = [];
        textImgs.push(loadImage("assets/save_dad.png"));
        textImgs.push(loadImage("assets/Instruction.png"));
        textImgs.push(loadImage("assets/Start_Adv.png"));



        var SpiderObj = function (x, y) {
            this.position = new PVector(x, y);
            this.size = 300;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            //this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"))
            this.spider.push(loadImage("assets/spider3.png"));
            this.spider.push(loadImage("assets/spider2.png"))
            this.HP = 500;
            this.currHP = 500;
            this.ATK = 70;
        }
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
        }


        var MainStates = {
            UP: 1,
            DOWN: 2,
            LEFT: 3,
            RIGHT: 4,
            UPW: 5,
            DOWNW: 6
        };

        var MainChar = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.currFrame2 = frameCount;
            this.step = 0;
            this.size = 150;
            this.MainStates = MainStates.UP;
            this.HP = 1000;
            this.currHP = this.HP;
            this.ATK = 40;
        };

        var Croc = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.step = 0;
            this.sizeX = 886 / 4;
            this.sizeY = 625 / 4;
            this.HP = 600;
            this.ATK = 40;
            this.currHP = this.HP;

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
        }

        MainChar.prototype.drawBattle = function () {
            image(mainChar[6], this.position.x, this.position.y, this.size, this.size);
        };


        MainChar.prototype.draw = function () {
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

        var mainCharBattle = new MainChar(880, 250);
        mainCharBattle.size = 250;

        var BattleMenuStates = {
            TURNINGL: 1,
            TURNINGR: 2,
            IDLE: 3,
            INBAG: 4,
            CHOSEN: 5
        };

        var BattleMenuSelection = {
            ATK: 1,
            ULR: 2,
            FLEE: 3,
            ITEM: 4,
        };


        var GameBackground = function () {
            this.currY = 0;
            this.menuRotate = 0;
            this.state = BattleMenuStates.IDLE;
            this.degreeTurned = 0;
            this.prevAngle = 0;
            this.Increment = 0.08;
            this.selection = BattleMenuSelection.ATK;
            this.enemyIdx = 0;
            enemies.push(new SpiderObj(200, 200));
        };

        GameBackground.prototype.draw = function () {
            image(backgroundImgs[0], 0, this.currY);
            image(backgroundImgs[0], 0, this.currY + 1440)
            this.currY--;
            image(backgroundImgs[1], 980, 420, 300, 300);
            textSize(38);
            fill(232, 211, 23);
            text(mainCharBattle.currHP, 1110, 620);
            text(mainCharBattle.HP, 1187, 672);
            textSize(70);
            text("/", 1183, 657);

            pushMatrix();
            translate(825, 140);
            rotate(this.menuRotate);
            image(backgroundImgs[3], -125, -125, 250, 250);
            popMatrix();


            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].currHP > 0) {
                    enemies[i].draw();
                    pushMatrix();
                    translate(enemies[i].position.x + enemies[i].size, enemies[i].position.y + enemies[i].size);
                    noFill();
                    strokeWeight(3);
                    rect(0, 0, 150, 10);
                    fill(0, 255, 0);
                    var temp = 150 * (enemies[i].currHP / enemies[i].HP);
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

        }

        //left/right selection
        GameBackground.prototype.move = function () {
            switch (this.state) {
                case BattleMenuStates.IDLE:
                    if (keyArray[LEFT]) {
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

                    else if (releaseArray[ENTER]) {
                        releaseArray[ENTER] = 0;
                        switch (this.selection) {
                            case BattleMenuSelection.ATK:
                                enemies[this.enemyIdx].currHP -= mainCharBattle.ATK + Math.floor((Math.random() * mainCharBattle.ATK) + 1);
                                for (var i = 0; i < enemies.length; i++) {
                                    mainCharBattle.currHP -= enemies[i].ATK + Math.floor((Math.random() * enemies[i].ATK) + 1);

                                }
                                break;
                            case BattleMenuSelection.ITEM:
                                this.state = BattleMenuSelection.INBAG
                                break;
                            case BattleMenuSelection.FLEE:
                                break;
                            case BattleMenuSelection.ULR:
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
                case BattleMenuSelection.INBAG:
                    rect(300, 20, 700, 300);
                    textSize(24);
                    text(, 1183, 657);


                default:
                    break;
            }
        }
        var mainChara = new MainChar(400, 400);
        var MyPanda = new PandaObj(200, 300);
        var croc = new Croc(600, 400);
        var spider = new SpiderObj(800, 400);
        var bullet = new BulletObj(75, 150);
        var battleBack = new GameBackground();
        var draw = function () {
            switch (state) {
                case 0: // main screen
                    var f = createFont("monospace");
                    // Title
                    textFont(f);
                    background(166, 103, 166);
                    textSize(42);
                    fill(232, 211, 23);
                    image(textImgs[0], 380, -180, 500, 500);

                    //bullet point
                    stroke(228, 237, 59);
                    strokeWeight(10);
                    var pos = bullet.draw();

                    // Options
                    textSize(30);
                    fill(40, 48, 44);
                    image(textImgs[1], 340, -60, 600, 600);
                    image(textImgs[2], 385, 40, 600, 600);

                    // Author
                    textSize(20);
                    text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all right reserve", 500, 650);
                    break;
                case 1:  // instruction
                    var f = createFont("monospace");
                    textFont(f);
                    background(51, 33, 51);
                    textSize(42);
                    fill(232, 211, 23);
                    text("  _Instruction_ \n", 440, 70);
                    textSize(25);
                    text("Instruction:  In the Map: UDLR, Shift Accel, E bag,\n              Arrow Key to move direction.\n", 300, 180);
                    text("\n              During Battle:  Main character and main\n              pet Panda fight with monsters and Boss.\n", 300, 240);
                    text("\n\nStory Line:  Iris's father was caught by demon.\n              ", 300, 300);
                    text("\n             Iris starts the journey with pet Panda.               ", 300, 360);
                    text("             They defeat monsters around the kingdom.              ", 300, 420);
                    text("             With the great courage and wisdom.               ", 300, 450);
                    text("             the Boss was slayed and Dad was saved.", 300, 480);
                    if (keyArray[ENTER] === 1) {
                        //println(2);
                        state = 0;
                        keyArray[ENTER] = 0;

                    }
                    break;
                case 2:  // start game
                    background(51, 33, 51);
                    fill(51, 33, 51);
                    rect(0, 0, 1280, 720);
                    MyPanda.draw();
                    mainChara.draw();
                    croc.draw();
                    spider.draw();
                    if (keyArray[ENTER] === 1) {
                        //println(2);
                        state = 0;
                        keyArray[ENTER] = 0;
                    }
                    break;

                case 3: // 
                    break;
                case 4:
                    background(255, 255, 255);
                    rect(0, 0, 1280, 720);
                    battleBack.draw();
                    battleBack.move();
                    break;
                default:
                    break;

            }


        };



    }
};
var canvas = document.getElementById("mycanvas");
var processingInstance = new Processing(canvas, sketchProc); 
