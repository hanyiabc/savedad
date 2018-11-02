// name: Guan Congyi, Han Yi

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";
        var mainChar = [];
        mainChar.push(loadImage("assets/main_front.png"))
        mainChar.push(loadImage("assets/main_back.png"))

        var MainChar = function (x, y) {
            this.position = new PVector(x, y);
            this.currFrame = frameCount;
            this.size = 60;
        };

        var draw = function () {
            
            image(mainChar[0], 500, 500, 60, 60);
            image(mainChar[1], 300, 400, 60, 60);

        };



    }
};
