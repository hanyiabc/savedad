// name: Guan Congyi, Han Yi

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        angleMode = "radiant";
        var mainChar = [];

        mainChar.push(loadImage("assets/main_front.png"));
        mainChar.push(loadImage("assets/main_back.png"));
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
            mainChara.draw();

        };



    }
};
