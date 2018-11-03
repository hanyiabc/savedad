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
        var keyReleased = function() {keyArray[keyCode] = 1;};
        //Create Bullet
        var BulletObj = function(x,y){
            this.x = x;
            this.y = y;
            this.pos = 1;
        };
        var bullet = new BulletObj(75,150);
        BulletObj.prototype.draw = function() {
            bullet.select();
            if (this.pos === 1){this.x = 480;this.y = 240;}
            if (this.pos === 2){this.x = 480;this.y = 340;}
            return [this.x, this.y];
            
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
                //this.pos = 1;
                 
            }
        };
        
        
        var mainChar = [];
        mainChar.push(loadImage("assets/main_front.png"));
        mainChar.push(loadImage("assets/main_back.png"));

        var SpiderObj = function(x,y){
            this.position = new PVector(x, y);
            this.size = 60;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"))
            this.spider.push(loadImage("assets/spider3.png"));
        }
        var spiders = new SpiderObj(300,300);
        SpiderObj.prototype.draw = function(){
            switch(this.state){
                case 0:
                image(this.spider[0], this.position.x, this.position.y, 60, 60);
                break;
                case 1:
                image(this.spider[1], this.position.x, this.position.y, 60, 60);
                break;
                case 2:
                image(this.spider[2], this.position.x, this.position.y, 60, 60);
                break;
            }
            this.state++;
            if (this.state> 2) {
                this.state = 0;
            }
            if (this.currFrame) {
                this.currFrame = frameCount;
                
            }
        }


        var MainStates = {
            UP: 1,
            DOWN: 2,
            LEFT: 3,
            RIGHT: 4
        };
        var MainChar = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.size = 60;

            this.MainStates = MainStates.UP;
        };
        MainChar.prototype.draw = function () {
            switch (this.MainStates) {
                case MainStates.UP:
                    image(mainChar[1], this.position.x, this.position.y, this.size, this.size);
                    break;
                case MainStates.DOWN:
                    image(mainChar[1], this.position.x, this.position.y, this.size, this.size);                    
                    break;
                case MainStates.LEFT:
                    image(mainChar[1], this.position.x, this.position.y, this.size, this.size);                    
                    break;
                case MainStates.RIGHT:
                    image(mainChar[1], this.position.x, this.position.y, this.size, this.size);                    
                    break;
                default:
                    break;
            }

        };

        var mainChara = new MainChar(500, 500);
        var draw = function () {
            if(state === 0){
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
                point(pos[0],pos[1]);
                
                // Options
                textSize(30);
                fill(40, 48, 44);
                text(" Instruction ", 500, 250);
                text(" Start Advanture ", 500, 350);

                // Author
                textSize(15);
                text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all right reserve. R and circle ", 700, 700);

            }
            else if(state === 1){ // Instruction Page
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
                    println(2);
                    state = 0;
                    keyArray[ENTER] = 0;
                }
            }
            else if(state === 2){// Start Game
                

            }
            
            
            //mainChara.draw();

        };



    }
};
