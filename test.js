// var canvas = document.getElementById("mycanvas");
// var processingInstance = new Processing(canvas, sketchProc); 
// pjs = Processing.getInstanceById('mycanvas');
// pjs.draw = function () {
//     switch (pjs.state) {
//         case 0: // main screen
//             var f = createFont("monospace");
//             // Title
//             pjs.textFont(f);
//             pjs.background(166, 103, 166);
//             pjs.textSize(42);
//             pjs.fill(232, 211, 23);
//             pjs.image(textImgs[0], 380, -180, 500, 500);

//             //bullet point
//             pjs.stroke(228, 237, 59);
//             pjs.strokeWeight(10);
//             var pos = pjs.bullet.draw();

//             // Options
//             pjs.textSize(30);
//             pjs.fill(40, 48, 44);
//             pjs.image(textImgs[1], 340, -60, 600, 600);
//             pjs.image(textImgs[2], 385, 40, 600, 600);

//             // Author
//             pjs.textSize(20);
//             pjs.text(" Made By: Yi Han, Congyi Guan, Jiacong Pan, all right reserve", 500, 650);
//             break;
//         case 1:  // instruction
//             var f = pjs.createFont("monospace");
//             pjs.textFont(f);
//             pjs.background(51, 33, 51);
//             pjs.textSize(42);
//             pjs.fill(232, 211, 23);
//             pjs.text("  _Instruction_ \n", 440, 70);
//             pjs.textSize(25);
//             pjs.text("Instruction:  In the Map: UDLR, Shift Accel, E bag,\n              Arrow Key to move direction.\n", 300, 180);
//             pjs.text("\n              During Battle:  Main character and main\n              pet Panda fight with monsters and Boss.\n", 300, 240);
//             pjs.text("\n\nStory Line:  Iris's father was caught by demon.\n              ", 300, 300);
//             pjs.text("\n             Iris starts the journey with pet Panda.               ", 300, 360);
//             pjs.text("             They defeat monsters around the kingdom.              ", 300, 420);
//             pjs.text("             With the great courage and wisdom.               ", 300, 450);
//             pjs.text("             the Boss was slayed and Dad was saved.", 300, 480);
//             if (pjs.keyArray[pjs.ENTER] === 1) {
//                 //println(2);
//                 pjs.state = 0;
//                 pjs.keyArray[pjs.ENTER] = 0;

//             }
//             break;
//         case 2:  // start game
//             pjs.background(51, 33, 51);
//             pjs.fill(51, 33, 51);
//             pjs.rect(0, 0, 1280, 720);
//             pjs.MyPanda.draw();
//             pjs.mainChara.draw();
//             pjs.croc.draw();
//             pjs.spider.draw();
//             if (pjs.keyArray[pjs.ENTER] === 1) {
//                 //println(2);
//                 pjs.state = 0;
//                 pjs.keyArray[pjs.ENTER] = 0;
//             }
//             break;

//         case 3: // 
//             break;
//         case 4:
//             pjs.background(255, 255, 255);
//             pjs.rect(0, 0, 1280, 720);
//             pjs.battleBack.draw();
//             break;
//         default:
//             break;

//     }


// }
