// Name: Guan Congyi, Han Yi, Pan Jiacong

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";
        
        /*   State: 0 - Home Screen
                    1 - Instruction
                    2 - Play
                    3 - 
        */
        var state = 0;
        var keyArray = [];
        var keyReleased = function() {keyArray[keyCode] = 1;};
        
        // Panda 
        var pandas = [];
        pandas.push(loadImage("assets/panda.png"));
        pandas.push(loadImage("assets/panda_shy.png"));
        pandas.push(loadImage("assets/panda_dead.png"));
        //pandas.push(loadImage("assets/panda_angry1.png"));
        var PandaObj = function(x,y){
            this.x = x;
            this.y = y;
            this.step = 0;
            this.currFrame = frameCount;
        }
        PandaObj.prototype.draw = function(){
            if(this.step<3){
                image(pandas[this.step], this.x, this.y, 240, 160);
                if(frameCount-this.currFrame>30){
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else{
                this.step = 0;
            }
        }
        //Create Bullet
        var BulletObj = function(x,y){
            this.x = x;
            this.y = y;
            this.pos = 1;
            this.avatar = pandas;
        };
        var MyPandaBullet = new PandaObj(1,1);
        BulletObj.prototype.draw = function() {
            bullet.select();
            // set bullet position
            if (this.pos === 1){this.x = 350;this.y = 170;}
            if (this.pos === 2){this.x = 350;this.y = 270;}
            MyPandaBullet.draw();
            MyPandaBullet.x = this.x; MyPandaBullet.y =  this.y;
        };
        BulletObj.prototype.select = function(){
            if(keyArray[UP]===1){
                if(this.pos !== 1){this.pos-=1;}
                keyArray[UP]=0;
            }
            if(keyArray[DOWN]===1){
                if(this.pos !== 2){this.pos+=1;}
                keyArray[DOWN]=0;
            }
            if(keyArray[ENTER]===1){
                if(this.pos === 1){state = 1;}
                if(this.pos === 2){state = 2;}
                keyArray[ENTER]=0;  
            }
        };

        // game class for initializing wall block grass block and tilemap
        var wall = loadImage("assets/block_brown_main.png");
        var grass = loadImage("assets/grassblock1.png");
        var wallObj = function(x,y){this.x = x;this.y = y;}
        wallObj.prototype.draw = function(){image(wall, this.x, this.y, 40, 40);}
        var grassObj = function(x,y){this.x = x;this.y = y;}
        grassObj.prototype.draw = function(){image(grass, this.x, this.y, 40, 40);}
        var gameObj = function(){
            this.tilemap = [ "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", //80
            "w                  ggggggggggg                      							w",
            "w                                    w     w                     				w",
            "w                                    w     w                      				w",
            "w                                                      w     w                 w",
            "wwwwwww                      wwwwwwwww     w                   			    w",
            "wwww              											                    w",
            "w                 											        wwwwwww     w",
            "w         wwwwwwww											   gg               w",
            "w s               											                    w",
            "w           gg     											            ggggw",
            "w      gg          											    gg          w",
            "w             gg   											                w",
            "w         gg       											              ggw",
            "w           gg     											        gg      w",
            "w                 											                    w",
            "w                 											                    w",
            "w               ww											    w         w     w",
            "w   w         wwww											   w w       w w    w",
            "w     w         ww											  w w w     w w w   w",
            "w																				w",
            "w       w         											    w         w     w",
            "wwwwwwwwwww       											    w         w     w",
            "w       w         											    w         w     w",
            "w     w           											                    w",
            "w    w            											                    w",
            "w       w         											                    w",
            "wwwwwwwwww        											                    w",
            "w       w         											                    w",
            "w     w           											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w    w            											                    w",
            "w       w         											                    w",
            "wwwwwwwwww        											                    w",
            "w       w         											                    w",
            "w     w           											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "w                 											                    w",
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",];
            this.xCor = 0;
            this.yCor = 0;
            this.initMap = 0;
            this.walls = []; this.grasses = [];

        }
        var game = new gameObj();

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
            this.size = 200;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            //this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"))
            this.spider.push(loadImage("assets/spider3.png"));
            this.spider.push(loadImage("assets/spider2.png"))
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
            if(this.state<3){
                //image(this.spider[this.state], this.x, this.y, 240, 160);
                if(frameCount-this.currFrame>30){
                    this.currFrame = frameCount;
                    this.state++;
                }
            }
            else{
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
        
        var MainChar = function (x, y,size) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.currFrame2 = frameCount;
            this.step = 0;
            this.size = size;
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

        gameObj.prototype.initTilemap = function() {
            for (var i = 0; i< this.tilemap.length; i++) {
                for (var j =0; j < this.tilemap[i].length; j++) {
                    switch (this.tilemap[i][j]) {
                        case 'w': 
                            this.walls.push(new wallObj(j*40, i*40));
                            break;
                        case 'g':
                            this.grasses.push(new grassObj(j*40, i*40));
                            break;
                    }
                }
            }        
        };
        
        gameObj.prototype.move = function(){
            // if(fakeP.x+this.xCor <= 200 &&keyArray[LEFT] === 1){this.xCor+=2;}
            // if(fakeP.x+this.xCor  >= 200 &&keyArray[RIGHT] === 1){this.xCor-=2;}
            // if(fakeP.y+this.yCor  <= 200 &&keyArray[UP] === 1){this.yCor+=2;}
            // if(fakeP.y+this.yCor  >= 200 &&keyArray[DOWN] === 1){this.yCor-=2;}
        };

        var MyPanda = new PandaObj(200, 300);
        var mainChara;
        var croc = new Croc(600,400);
        var spider = new SpiderObj(800, 400);
        var bullet = new BulletObj(75,150);
        var draw = function () {
            switch (state)
            {
                case 0: // main screen
                    var f = createFont("monospace");
                    // Title
                    textFont(f);
                    background(166, 103, 166);
                    textSize(42);
                    fill(232, 211, 23);
                    image(textImgs[0],380, -180, 500, 500);
                    
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
                    text("\n              During Battle:  Main character and main\n              pet Panda fight with monsters and Boss.\n" , 300, 240);
                    text("\n\nStory Line:  Iris's father was caught by demon.\n              ", 300, 300);
                    text("\n             Iris starts the journey with pet Panda.               ",300, 360);
                    text("             They defeat monsters around the kingdom.              ", 300,420);
                    text("             With the great courage and wisdom.               ",300, 450);
                    text("             the Boss was slayed and Dad was saved.", 300, 480);
                    if(keyArray[ENTER]===1){
                        //println(2);
                        state = 0;
                        keyArray[ENTER] = 0;
                    }
                    break;
                case 2:  // start game
                    pushMatrix();
                    translate(game.xCor,game.yCor);
                    background(0, 33, 51);

                    if (game.initMap === 0){ mainChara = new MainChar(200,200,100);game.initTilemap();game.initMap = 1;}
                    for (var i=0; i<game.walls.length; i++) {
                        game.walls[i].draw();
                    }
                    for (i=0; i<game.grasses.length; i++) {
                        game.grasses[i].draw();
                    }
                    game.move();
                    mainChara.draw();
                    if (keyArray[ENTER] === 1) {
                        state = 0;
                        keyArray[ENTER] = 0;
                    }
                    popMatrix();
                    break;

                case 3: // Game main screen
                    
            }
        };
    }
};
