// name: Guan Congyi, Han Yi

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";
        var state = 0;

        var mainChar = [];
        mainChar.push(loadImage("assets/main_front.png"));
        mainChar.push(loadImage("assets/main_back.png"));

        
        
        var spiderObj = function(x,y){
            this.position = new PVector(x, y);
            this.size = 60;
            this.state = 0;
            this.spider = [];
            this.currFrame = frameCount;
            this.spider.push(loadImage("assets/spider1.png"))
            this.spider.push(loadImage("assets/spider2.png"))
            this.spider.push(loadImage("assets/spider3.png"));
        }
        var spiders = new spiderObj(300,300);
        spiderObj.prototype.draw = function(){
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

        var MainChar = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.size = 60;
        };

        var draw = function () {
            if (state === 1)
            {
                image(mainChar[0], 500, 500, 60, 60);
                image(mainChar[1], 300, 400, 60, 60);
                spiders.draw();
            }
            

        };



    }
};
