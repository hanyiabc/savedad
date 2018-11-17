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

        var state = 0;
        var keyArray = [];
        var keyPressed = function() {keyArray[keyCode] = 1;};
        var keyReleased = function() {keyArray[keyCode] = 0;};
        
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
                image(pandas[this.step], this.x, this.y, 100, 60);
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
            if (this.pos === 1){this.x = 400;this.y = 500;}
            if (this.pos === 2){this.x = 400;this.y = 540;}
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
        var brick = loadImage("assets/wall_castle.png");
        var wallObj = function(x,y){this.x = x;this.y = y;this.size = 40}
        wallObj.prototype.draw = function(){image(wall, this.x- this.size/2, this.y- this.size/2, this.size, this.size);}
        var grassObj = function(x,y){this.x = x;this.y = y;this.size = 40}
        grassObj.prototype.draw = function(){image(grass, this.x- this.size/2, this.y- this.size/2, this.size, this.size);}
        var brickObj = function(x,y){this.x = x;this.y = y;this.size = 40}
        brickObj.prototype.draw = function(){image(brick, this.x- this.size/2, this.y- this.size/2, this.size, this.size);}
        var gameObj = function(){
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
                "w                 wwwwwwwwwwwwwww                              w",
                "w                 wwwbbbbbbbbbwww                              w",
                "w                 wwwwwwwwwbbbwww                              w",
                "w                        wwwbbwww                              w",
                "w                        wwwwwwww                              w",
                "w                        gggggggg                              w",
                "wwwwww                   gggggggg                              w",
                "wwwwww                   gggggggg                              w",
                "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",];
    
            this.xCor = 0;
            this.yCor = 0;
            this.initMap = 0;
            this.walls = []; 
            this.grasses = [];
            this.bricks = [];
            this.randPos = [];

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

        var bigCastle = [];
        bigCastle.push(loadImage("assets/bigcastle_blue.png"));
        bigCastle.push(loadImage("assets/bigcastle_green.png"));
        bigCastle.push(loadImage("assets/bigcastle_orange.png"));
        bigCastle.push(loadImage("assets/bigcastle_purple.png"));
        bigCastle.push(loadImage("assets/bigcastle_red.png"));
        bigCastle.push(loadImage("assets/bigcastle_yellow.png"));

        var smallCastle = [];
        smallCastle.push(loadImage("assets/smallcastle_red_blue.png"));
        smallCastle.push(loadImage("assets/smallcastle_red_green.png"));
        smallCastle.push(loadImage("assets/smallcastle_red_orange.png"));
        smallCastle.push(loadImage("assets/smallcastle_red_yellow.png"));

        var bigCObj = function(x,y){
            this.x = x;
            this.y = y;
            this.step = 0;
            this.currFrame = frameCount;
        }
        bigCObj.prototype.draw = function(){
            if(this.step<6){
                image(bigCastle[this.step], this.x, this.y, 1300, 800);
                if(frameCount-this.currFrame>30){
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else{
                this.step = 0;
            }
        }
        var smallCObj = function(x,y){
            this.x = x;
            this.y = y;
            this.step = 0;
            this.currFrame = frameCount;
        }
        smallCObj.prototype.draw = function(){
            if(this.step<4){
                image(smallCastle[this.step], this.x, this.y, 600, 550);
                if(frameCount-this.currFrame>30){
                    this.currFrame = frameCount;
                    this.step++;
                }
            }
            else{
                this.step = 0;
            }
        }
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

        // Maincharacter
        var mainChara;
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
            this.MainStates = MainStates.UPW;
        };

        //functions for checking wall
        var checkWallUp = function () {
            for (var i = 0; i < game.walls.length; i++) {
                if (
                    (
                        (
                            (mainChara.position.x - mainChara.size  / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x - mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        )||
                        (
                            (mainChara.position.x + mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2) &&
                            (mainChara.position.x + mainChara.size / 2) <= (game.walls[i].x + game.walls[i].size / 2)
                        )
                    ) && 
                    (mainChara.position.y - 2 - mainChara.size / 2) >= (game.walls[i].y + game.walls[i].size / 2 - 3) &&
                    (mainChara.position.y - 2 - mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                    )
                {
                    return  true;
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
                        )||
                        (
                            (mainChara.position.y + mainChara.size / 2) >= (game.walls[i].y - game.walls[i].size / 2) &&
                            (mainChara.position.y + mainChara.size / 2) <= (game.walls[i].y + game.walls[i].size / 2)
                        )
                    )&&
                    (mainChara.position.x + 2 + mainChara.size / 2) <= (game.walls[i].x - game.walls[i].size / 2 + 3) &&
                    (mainChara.position.x + 2 + mainChara.size / 2) >= (game.walls[i].x - game.walls[i].size / 2)
                )
                {
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
                    (mainChara.position.x - 2 - mainChara.size / 2) >= (game.walls[i].x + game.walls[i].size / 2 - 3)
                )
                {
                    return true;
                }

            }
        };
        var checkWallDown = function ()
        {
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
                    (mainChara.position.y + 2 + mainChara.size / 2) <= (game.walls[i].y - game.walls[i].size / 2 + 3)
                )
                {
                    return true;
                }

            }
        };

        // for starting screen
        MainChar.prototype.disp = function () {
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
        MainChar.prototype.draw = function () {
            switch (this.MainStates) {
                case MainStates.LEFT:
                    image(mainChar[6], this.position.x - this.size/2, this.position.y- this.size/2, this.size, this.size);
                    break;
                case MainStates.RIGHT:
                    image(mainChar[7], this.position.x- this.size/2, this.position.y- this.size/2, this.size, this.size);
                    break;
                case MainStates.UPW:
                    if( (frameCount - this.currFrame) === 30)
                    {
                        this.step++;
                        this.currFrame = frameCount;
                    }
                    if (this.step === 3){this.step = 0}
                    image(mainChar[this.step], this.position.x- this.size/2, this.position.y- this.size/2, this.size, this.size);
                    break;
                case MainStates.DOWNW:
                    if ((frameCount - this.currFrame) === 30) {
                        //println(1);
                        // println(this.currFrame);
                        // println(this.currFrame2);
                        this.currFrame = frameCount;
                        this.step++;
                    }
                    if (this.step === 3){this.step = 0}
                    image(mainChar[this.step + 3], this.position.x- this.size/2, this.position.y- this.size/2, this.size, this.size);
                    break;
                default:
                    break;
            }

        };
        MainChar.prototype.move = function(){
            // Change map threshhold here
            var mapxMin = 100;
            var mapxMax = 700;
            var mapyMin = 200;
            var mapyMax = 400;
            if(keyArray[UP]===1){
                this.MainStates = 5;
                if(!checkWallUp()){
                    if(keyArray[SHIFT]===1){
                        if (this.position.y + game.yCor <= mapxMin) {
                            game.yCor += 4;
                        }
                        this.position.y-=4;
                    }
                    else{
                        if (this.position.y + game.yCor <= mapxMin) {
                            game.yCor += 2;
                        }
                        this.position.y-=2;
                    }
                }
            }
            else if(keyArray[DOWN]===1){
                this.MainStates = 6;
                if(!checkWallDown()){
                    if(keyArray[SHIFT]===1){
                        if (this.position.y + game.yCor >= mapyMax) {
                            game.yCor -= 4;
                        }
                        this.position.y+=4;
                    }
                    else{
                        if (this.position.y + game.yCor >= mapyMax) {
                            game.yCor -= 2;
                        }
                        this.position.y+=2;
                    }
                }
               
            }
            else if(keyArray[RIGHT]===1){
                this.MainStates = 4;
                if(!checkWallRight()){
                    if(keyArray[SHIFT]===1){
                        if (this.position.x + game.xCor >= mapxMax) {
                            game.xCor -= 4;
                        }
                        this.position.x+=4;
                    }
                    else{
                        if (this.position.x + game.xCor >= mapxMax) {
                            game.xCor -= 2;
                        }
                        this.position.x+=2;
                    }
                }
            }
            else if(keyArray[LEFT]===1){
                this.MainStates = 3;
                if(!checkWallLeft()){
                    if(keyArray[SHIFT]===1){
                        if (this.position.x + game.xCor <= mapyMin) {
                            game.xCor += 4;
                        }
                        this.position.x-=4;
                    }
                    else{
                        if (this.position.x + game.xCor <= mapyMin) {
                            game.xCor += 2;
                        }
                        this.position.x-=2;
                    }
                }
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
                        case 'b':
                            this.bricks.push(new brickObj(j*40, i*40));
                            break; 
                    }
                }
            }
            for (var i = 0; i < 5; i++){
                var r = round(random(0, this.grasses.length));
                //println(r);
                var pos = new PVector(this.grasses[r].x, this.grasses[r].y);
                this.randPos.push(pos);
                println(pos);
            }
            
        };

        gameObj.prototype.metMonster = function(){
            var distThreshhold = 50;
            for (var i = 0; i < this.randPos.length; i++){
                if(dist(this.randPos[i].x, this.randPos[i].y, mainChara.position.x, mainChara.position.y)<distThreshhold){
                    state = 4;
                    
                }
            }
        }

        var star = function(x, y, d) {
            noStroke();
            fill(250, 245, 250);
            ellipse(x, y, d, d);
        };
        

        var bigC1 = new bigCObj(-50, -50);
        var smallC1 = new smallCObj(-150,170);
        var smallC2 = new smallCObj(760,170);
        var croc1 = new Croc(1050,0); 
        var mainChara1 = new MainChar(250,500,150);
        var bullet = new BulletObj(75,150);
        var draw = function () {
            switch (state)
            {
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
                    image(textImgs[0],400, -90, 420, 350);
                    
                    //bullet point
                    stroke(228, 237, 59);
                    strokeWeight(10);
                    var pos = bullet.draw();
                    
                    // Options
                    textSize(30);
                    fill(30, 189, 94);
                    image(textImgs[1], 450, 380, 300, 300);
                    image(textImgs[2], 450, 420, 300, 300);    

                    // Author
                    textSize(20);
                    text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all right reserve", 540, 680);
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
                    background(0, 33, 51);
                    pushMatrix();
                    translate(game.xCor,game.yCor);
                   
                    if (game.initMap === 0){ mainChara = new MainChar(350,200,100);game.initTilemap();game.initMap = 1;}
                    for (var i=0; i<game.walls.length; i++) {
                        game.walls[i].draw();
                    }
                    for (i=0; i<game.grasses.length; i++) {
                        game.grasses[i].draw();
                    }
                    for (i=0; i<game.bricks.length; i++) {
                        game.bricks[i].draw();
                    }
                    mainChara.draw();
                    mainChara.move();
                    game.metMonster();
                    
                    if (keyArray[ENTER] === 1) {
                        state = 0;
                        keyArray[ENTER] = 0;
                    }
                    popMatrix();
                    break;

                case 3: // Game main screen
                    break;
                case 4:
                    background(0, 33, 51);
                    println("meet monster");
                    println(this.randPos[i].x);
                    println(this.randPos[i].y);
                    break;
            }
        };
    }
};
