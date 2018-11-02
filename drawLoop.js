// name: Guan Congyi, Han Yi

var sketchProc = function (processingInstance) {
    with (processingInstance) {
        size(1280, 720);
        frameRate(60);
        
        // subdivision - split + average
        // beginShape + endShape to enclose the entire shape
        // EXPERIMENT with coloring and number of iterations
        angleMode = "radiant";

        var start = 0;
        var mouseFlag = 0;
        var otherFlag = 0;
        var initialized = 0;

        // cos and sin using Polar Coordinates to determine direction of explosions
        // compare with cartesian explosion
        // add "fill(0, 0, 0, 60); rect(0, 0, 400, 400);" and see



        var croc1 = new crocObj(100, 100);
        var croc2 = new crocObj(200, 200);
        var snail1 = new snailObj(300, 300);
        var snail2 = new snailObj(400, 400);

        var draw = function () {
            if (start === 0) {
                if (!initialized) {
                    initialize();
                }
                background(255, 255, 0);
                fill(255, 0, 0);
                textSize(20);
                text("Click Mouse to Begin", 20, 350);
                fill(0, 0, 255);
            }
            else if (start === 1) {
                background(43, 43, 43);
                croc1.draw();
                croc1.move();
                croc2.draw();
                croc2.move();
                snail1.draw();
                snail1.move();
                snail2.draw();
                snail2.move();

                for (var j = 0; j < firework.length; j++) {

                    if (firework[j].step === 1) {
                        firework[j].draw();
                    }
                    else if (firework[j].step === 2) {
                        for (var i = 0; i < firework[j].explosions.length; i++) {
                            firework[j].explosions[i].draw();
                        }
                        if (firework[j].explosions[0].timer <= 0) {
                            firework[j].step = 3;
                        }
                    }
                }
                for (var i = firework.length - 1; i >= 0; i--) {
                    if (firework[i].step === 3) {
                        firework.splice(i, 1);
                    }
                }

            }

        };



    }
};
