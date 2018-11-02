var images = [];
var p2 = [];
var firework = [];
var points = [];


var explosionObj = function (a) {
    this.position = new PVector(0, 0);
    this.direction = new PVector(0, 0);
    this.size = Math.random(1, 3);
    if (a === 0) {
        this.c1 = Math.random(0, 250);
    }
    else {
        this.c1 = Math.random(100, 255);
    }
    if (a === 1) {
        this.c2 = Math.random(0, 250);
    }
    else {
        this.c2 = Math.random(100, 255);
    }
    if (a === 3) {
        this.c3 = Math.random(0, 250);
    }
    else {
        this.c3 = Math.random(100, 255);
    }
    this.timer = 0;
};

///// EXPERIMENT number of particles ////
var fireworkObj = function (a) {
    this.position = new PVector(200, 380);
    this.direction = new PVector(0, 0);
    this.target = new PVector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
        this.explosions.push(new explosionObj(a));
    }
};


//// EXPERIMENT direction of explosion /////
fireworkObj.prototype.draw = function () {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);

    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
        this.step = 2;
        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].position.set(this.target.x, this.target.y);

            this.explosions[i].direction.set(Math.random(0, 2 * Math.PI), Math.random(-0.3, 0.3));
            /*	    this.explosions[i].direction.set(Math.random(-0.3, 0.3), 
                    Math.random(-0.3, 0.3)); // cartesian (instead of polar) direction */
            this.explosions[i].timer = 180;
        }
    }
};

//// EXPERIMENT direction of explosion /////
explosionObj.prototype.draw = function () {
    fill(this.c1, this.c2, this.c3, this.timer);	// 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);

    this.position.x += this.direction.y * cos(this.direction.x);
    this.position.y += this.direction.y * sin(this.direction.x);
    /*  this.position.add(this.direction); // Math.random cartesian direction */
    this.position.y += (Math.PI / 4 / (this.timer + 100));    //gravity
    this.timer--;
};
var numnum = 0;

var mouseClicked = function () {
    if (mouseFlag) {
        var temp = new fireworkObj(numnum);
        temp.position.set(200, 450);
        temp.target.set(mouseX, mouseY);
        temp.direction.set(temp.target.x - temp.position.x, temp.target.y - temp.position.y);
        var s = Math.random(1, 2) / 100;
        temp.direction.mult(s);
        temp.step++;
        firework.push(temp);
    }
    start = 1;
    mouseFlag = 1;
};

var snailObj = function (x, y) {
    this.position = new PVector(x, y);
    this.step = new PVector(0, 0);
    this.wanderAngle = Math.random(0, Math.PI);
    this.wanderDist = Math.random(70, 100);
    this.x = x;
    this.y = y;
};
snailObj.prototype.move = function () {
    this.step.set(cos(this.wanderAngle), sin(this.wanderAngle));
    this.position.add(this.step);
    this.wanderDist--;
    if (this.wanderDist < 0) {
        this.wanderDist = Math.random(70, 100);
        this.wanderAngle += Math.random(-Math.PI / 4, Math.PI / 4);
    }

    if (this.position.x > 420) { this.position.x = -20; }
    else if (this.position.x < -20) { this.position.x = 420; }
    if (this.position.y > 420) { this.position.y = -20; }
    else if (this.position.y < -20) { this.position.y = 420; }
};
snailObj.prototype.draw = function () {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(images[0], -50, -50, 100, 100);
    popMatrix();
};

var crocObj = function (x, y) {
    this.position = new PVector(x, y);
    this.angle = 0;
    this.step = new PVector(0, -1);
    this.x = x;
    this.y = y;
    this.wanderAngle = Math.random(0, Math.PI);
    this.wanderDist = Math.random(70, 100);
    this.counter = 0;
};
crocObj.prototype.move = function () {
    this.step.set(cos(this.wanderAngle), sin(this.wanderAngle));
    this.position.add(this.step);
    this.wanderDist--;
    if (this.wanderDist < 0) {
        this.wanderDist = Math.random(70, 100);
        this.wanderAngle += Math.random(-Math.PI / 4, Math.PI / 4);
    }

    if (this.position.x > 420) { this.position.x = -20; }
    else if (this.position.x < -20) { this.position.x = 420; }
    if (this.position.y > 420) { this.position.y = -20; }
    else if (this.position.y < -20) { this.position.y = 420; }
};
crocObj.prototype.draw = function () {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(images[1], -50, -50, 100, 100);
    popMatrix();
};


var iterations = 0;

var splitPoints = function () {
    p2.splice(0, p2.length);
    for (var i = 0; i < points.length - 1; i++) {
        p2.push(new PVector(points[i].x, points[i].y));
        p2.push(new PVector((points[i].x + points[i + 1].x) / 2, (points[i].y +
            points[i + 1].y) / 2));
    }
    p2.push(new PVector(points[i].x, points[i].y));
    p2.push(new PVector((points[0].x + points[i].x) / 2, (points[0].y +
        points[i].y) / 2));
};

var average = function () {
    for (var i = 0; i < p2.length - 1; i++) {
        var x = (p2[i].x + p2[i + 1].x) / 2;
        var y = (p2[i].y + p2[i + 1].y) / 2;
        p2[i].set(x, y);
    }
    var x = (p2[i].x + points[0].x) / 2;
    var y = (p2[i].y + points[0].y) / 2;
    points.splice(0, points.length);
    for (i = 0; i < p2.length; i++) {
        points.push(new PVector(p2[i].x, p2[i].y));
    }
};

var subdivide = function () {
    splitPoints();
    average();
};

var drawSnail = function () {
    points = [];
    points.push(new PVector(159, 140));
    points.push(new PVector(149, 128));
    points.push(new PVector(137, 120));
    points.push(new PVector(122, 119));
    points.push(new PVector(111, 122));
    points.push(new PVector(105, 132));
    points.push(new PVector(104, 144));
    points.push(new PVector(109, 153));
    points.push(new PVector(119, 162));
    points.push(new PVector(133, 165));
    points.push(new PVector(145, 167));
    points.push(new PVector(143, 174));
    points.push(new PVector(144, 196));
    points.push(new PVector(148, 217));
    points.push(new PVector(159, 238));
    points.push(new PVector(173, 255));
    points.push(new PVector(190, 269));
    points.push(new PVector(208, 267));
    points.push(new PVector(230, 263));
    points.push(new PVector(261, 266));
    points.push(new PVector(279, 272));
    points.push(new PVector(340, 278));
    points.push(new PVector(375, 262));
    points.push(new PVector(380, 239));
    points.push(new PVector(368, 219));
    points.push(new PVector(350, 209));
    points.push(new PVector(329, 206));
    points.push(new PVector(315, 224));
    points.push(new PVector(322, 179));
    points.push(new PVector(320, 154));
    points.push(new PVector(313, 123));
    points.push(new PVector(308, 105));
    points.push(new PVector(290, 85));
    points.push(new PVector(267, 82));
    points.push(new PVector(251, 74));
    points.push(new PVector(224, 84));
    points.push(new PVector(209, 89));
    points.push(new PVector(191, 105));
    points.push(new PVector(176, 132));
    points.push(new PVector(175, 139));
    points.push(new PVector(176, 147));
    points.push(new PVector(209, 247));

    fill(255, 0, 0);
    fill(184, 245, 30);
    stroke(176, 176, 176);
    strokeWeight(1);
    beginShape();
    for (var i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y);
    }
    vertex(points[0].x, points[0].y);
    endShape();

    if (iterations < 5) {
        subdivide();
        iterations++;
    }
    fill(255, 0, 0);
    ellipse(249, 167, 145, 175);
    fill(235, 154, 23);
    ellipse(264, 167, 118, 128);
    fill(255, 0, 0);
    ellipse(283, 168, 80, 80);

    noFill();
    var x1 = 125;
    var y1 = 87;
    var cx1 = 114;
    var cy1 = 102;
    var cx2 = 117;
    var cy2 = 112;
    var x2 = 118;
    var y2 = 128;
    stroke(0, 60, 255);
    strokeWeight(3);
    var diff = 20;
    bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    bezier(x1 + diff, y1 + diff / 2, cx1 + diff, cy1, cx2 + diff, cy2, x2 + diff - 10, y2);
    noStroke();
    fill(0, 0, 0);
    ellipse(111, 136, 10, 10);
    ellipse(124, 136, 10, 10);
};

var drawCroc = function () {
    var points = [];
    points.push(new PVector(78, 82));
    points.push(new PVector(71, 88));
    points.push(new PVector(63, 95));
    points.push(new PVector(57, 107));
    points.push(new PVector(53, 119));
    points.push(new PVector(50, 132));
    points.push(new PVector(52, 148));
    points.push(new PVector(52, 163));
    points.push(new PVector(56, 178));
    points.push(new PVector(64, 199));
    points.push(new PVector(71, 211));
    points.push(new PVector(82, 226));
    points.push(new PVector(93, 239));
    points.push(new PVector(109, 250));
    points.push(new PVector(128, 251));
    points.push(new PVector(152, 258));
    points.push(new PVector(165, 254));
    points.push(new PVector(189, 253));
    points.push(new PVector(204, 251));
    points.push(new PVector(232, 246));
    points.push(new PVector(241, 246));
    points.push(new PVector(253, 254));
    points.push(new PVector(268, 259));
    points.push(new PVector(278, 264));
    points.push(new PVector(290, 268));
    points.push(new PVector(306, 268));
    points.push(new PVector(315, 268));
    points.push(new PVector(327, 262));
    points.push(new PVector(334, 255));
    points.push(new PVector(341, 245));
    points.push(new PVector(344, 234));
    points.push(new PVector(342, 224));
    points.push(new PVector(337, 218));
    points.push(new PVector(330, 214));
    points.push(new PVector(324, 212));
    points.push(new PVector(319, 211));
    points.push(new PVector(310, 205));
    points.push(new PVector(304, 201));
    points.push(new PVector(298, 193));
    points.push(new PVector(292, 185));
    points.push(new PVector(289, 174));
    points.push(new PVector(294, 157));
    points.push(new PVector(295, 149));
    points.push(new PVector(294, 137));
    points.push(new PVector(287, 132));
    points.push(new PVector(279, 131));
    points.push(new PVector(268, 131));
    points.push(new PVector(259, 134));
    points.push(new PVector(258, 142));
    points.push(new PVector(253, 144));
    points.push(new PVector(239, 143));
    points.push(new PVector(228, 143));
    points.push(new PVector(221, 143));
    points.push(new PVector(210, 136));
    points.push(new PVector(195, 139));
    points.push(new PVector(188, 143));
    points.push(new PVector(183, 151));
    points.push(new PVector(181, 162));
    points.push(new PVector(182, 170));
    points.push(new PVector(188, 179));
    points.push(new PVector(193, 186));
    points.push(new PVector(174, 188));
    points.push(new PVector(159, 186));
    points.push(new PVector(135, 187));
    points.push(new PVector(122, 184));
    points.push(new PVector(104, 183));
    points.push(new PVector(93, 166));
    points.push(new PVector(81, 153));
    points.push(new PVector(77, 133));
    points.push(new PVector(71, 121));
    points.push(new PVector(73, 108));
    points.push(new PVector(81, 91));

    background(43, 43, 43);
    fill(255, 0, 0);

    fill(54, 214, 80);
    beginShape();
    for (var i = 0; i < points.length; i++) {
        vertex(points[i].x, points[i].y);
    }
    vertex(points[0].x, points[0].y);
    endShape();

    if (iterations < 5) {
        subdivide();
        iterations++;
    }
    var tempX = 158;
    var tempY = 157;

    pushMatrix();
    translate(120, 184);
    rotate(4.79);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    pushMatrix();
    translate(157, 188);
    rotate(4.79);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    pushMatrix();
    translate(185, 189);
    rotate(4.79);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    pushMatrix();
    translate(75, 134);
    rotate(5.85);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    pushMatrix();
    translate(87, 160);
    rotate(5.56);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();


    pushMatrix();
    translate(101, 181);
    rotate(5.47);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    pushMatrix();
    translate(257, 186);
    rotate(4.28);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();


    pushMatrix();
    translate(277, 213);
    rotate(4.28);
    fill(15, 125, 35);
    noStroke();
    beginShape();
    vertex(143 - tempX, 138 - tempY);
    bezierVertex(178 - tempX, 135 - tempY, 175 - tempX, 178 - tempY, 144 - tempX, 176 - tempY);
    bezierVertex(156 - tempX, 183 - tempY, 163 - tempX, 135 - tempY, 139 - tempX, 138 - tempY);
    endShape();
    popMatrix();

    fill(0, 0, 0);
    ellipse(199, 157, 16, 16);
    ellipse(275, 149, 16, 16);

    fill(255, 255, 255);
    ellipse(203, 155, 8, 6);
    ellipse(279, 146, 8, 6);

    var triD = 12;
    var triDY = 5;
    fill(255, 255, 255);
    triangle(285, 236, 269, 255, 282, 262);
    triangle(285 - triD, 236 - triDY, 269 - triD, 255 - triDY, 282 - triD, 261 - triDY);
    triD = -12;
    triDY = -6;
    triangle(285 - triD, 236 - triDY, 269 - triD, 255 - triDY, 278 - triD, 258 - triDY);
    fill(55, 214, 30);
    quad(114, 246, 139, 247, 147, 273, 110, 272);
    quad(212, 246, 186, 247, 184, 273, 220, 268);
};

var initialize = function () {
    initialized = 1;
    fill(43, 43, 43);
    rect(0, 0, 400, 400);
    drawSnail();
    images.push(get(50, 50, 350, 330));

    fill(43, 43, 43);
    rect(0, 0, 400, 400);
    drawCroc();
    images.push(get(50, 70, 350, 330));
};