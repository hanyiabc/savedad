// name: Guan Congyi, Han Yi

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";

        /*   State: 0 - Home Screen
                    1 - Instruction
                    2 - Play
        */
        var state = 0;
        var keyArray = [];
        var keyReleased = function () { keyArray[keyCode] = 1; };
        //Create Bullet
        var BulletObj = function (x, y) {
            this.x = x;
            this.y = y;
            this.pos = 1;
        };
        var bullet = new BulletObj(75, 150);
        BulletObj.prototype.draw = function () {
            bullet.select();
            if (this.pos === 1) { this.x = 480; this.y = 240; }
            if (this.pos === 2) { this.x = 480; this.y = 340; }
            return [this.x, this.y];

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

        var mainChar = [];
        mainChar.push(loadImage("assets/main_back.png"));
        mainChar.push(loadImage("assets/main_back_f1.png"));
        mainChar.push(loadImage("assets/main_back_f2.png"));

        mainChar.push(loadImage("assets/main_front.png"));
        mainChar.push(loadImage("assets/main_front_f1.png"));
        mainChar.push(loadImage("assets/main_front_f2.png"));

        mainChar.push(loadImage("assets/main_left.png"));
        mainChar.push(loadImage("assets/main_right.png"));
        

        var crocImgs = [];
        crocImgs.push(loadImage("assets/monster1_f1.png"))
        crocImgs.push(loadImage("assets/monster1_f2.png"))
        crocImgs.push(loadImage("assets/monster1_f3.png"))
        crocImgs.push(loadImage("assets/monster1_f4.png"))
        crocImgs.push(loadImage("assets/monster1_f5.png"))
        crocImgs.push(loadImage("assets/monster1_f6.png"))

        var SpiderObj = function (x, y) {
            this.position = new PVector(x, y);
            this.size = 200;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"))
            this.spider.push(loadImage("assets/spider3.png"));
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
            if(frameCount - this.currFrame > 60)
            {
                this.state = 1;
                this.currFrame = frameCount;
            }
            if (this.state > 2) {
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
        };

        var Croc = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.step = 0;
            this.sizeX = 886/4;
            this.sizeY = 625/4;
        };

        Croc.prototype.draw = function () 
        {
            if (frameCount - this.currFrame > 5) {
                this.step++;
                this.currFrame = frameCount;
            }
            if(this.step > 11)
            {
                this.step = 0;
            }
            if(this.step > 5)
            {
                image(crocImgs[11-this.step], this.position.x, this.position.y, this.sizeX, this.sizeY);                
            }
            else
            {
                image(crocImgs[this.step], this.position.x, this.position.y, this.sizeX, this.sizeY);
            }
        }
        MainChar.prototype.draw = function () {
            switch (this.MainStates) {
                case MainStates.UP:
                    image(mainChar[0], this.position.x, this.position.y, this.size, this.size);
                    if(frameCount - this.currFrame > 60)
                    {
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
                    else if(frameCount - this.currFrame === 30)
                    {
                        this.step=1;
                        this.currFrame = frameCount;
                    }
                    if(frameCount - this.currFrame2 > 120)
                    {
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

        var mainChara = new MainChar(500, 500);
        var spiders = new SpiderObj(300, 300);
        var croc = new Croc(200, 500);

        var draw = function () {
            if (state === 0) {
                var f = createFont("monospace");
                // Title
                textFont(f);
                background(166, 103, 166);
                textSize(42);
                fill(232, 211, 23);
                text("  _Save Dad_", 440, 70);

                //bullet point
                stroke(228, 237, 59);
                strokeWeight(10);
                var pos = bullet.draw();
                point(pos[0], pos[1]);

                // Options
                textSize(30);
                fill(40, 48, 44);
                text(" Instruction ", 500, 250);
                text(" Start Advanture ", 500, 350);

                // Author
                textSize(15);
                text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all right reserve. R and circle ", 700, 700);

            }
            else if (state === 1) { // Instruction Page
                var f = createFont("monospace");
                textFont(f);
                background(51, 33, 51);
                textSize(42);
                fill(232, 211, 23);
                text("  _Instruction_ ", 440, 70);
                text("  ", 440, 70);
            }
            else if (state === 2) {// Start Game
                background(51, 33, 51);
                fill(51, 33, 51);
                rect(0,0,1280,720);
                mainChara.draw();
                spiders.draw();
                croc.draw();
            }


            //mainChara.draw();

        };



    }
};
