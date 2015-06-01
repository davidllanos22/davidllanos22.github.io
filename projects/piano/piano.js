var game = new Game(640, 240, document.getElementById("piano"));

var white_key_width = 25;
var white_key_height = 100;
var black_key_width = 15;
var black_key_height = 60;

var x_offset = 20;
var y_offset = 120;

var scale_interval = white_key_width * 7;

var keys = [];
var rects = [];

var color = "#FFFF00";

var actx = new AudioContext();
var gain = actx.createGain();
gain.connect(actx.destination);

var nodes = [];

var lastFreq = 0;
var oscType = "square";

var mouseRect = new Rectangle(game.input.mouse().x, game.input.mouse().y, 1, 1);



game.init = function(){
	game.graphics.setClearColor("#3b7bb3");
	// whites
	for(var x = 0; x < 24; x++)
		keys.push({x: (x_offset + x * white_key_width) -1, y: y_offset - 1, w: white_key_width + 2, h: white_key_height + 2, n: 0, c: "#FFF", a: false});
	// two 
	for(var i = 0; i < 4; i++)
		for(var x = 0; x < 2; x++)
			keys.push({x: x_offset + 16 + x * white_key_width + scale_interval * i, y: y_offset, w: black_key_width, h: black_key_height, n: 0, c: "#000", a: false});
	// three
	for(var i = 0; i < 3; i++)
		for(var x = 0; x < 3; x++)
			keys.push({x: x_offset + 92 + x * white_key_width + scale_interval * i, y: y_offset, w: black_key_width, h: black_key_height, n: 0, c: "#000", a: false});

	for(var i = 0; i < keys.length; i++)
		rects.push(new Rectangle(keys[i].x + 1, keys[i].y + 1, keys[i].w - 2, keys[i].h - 2));
	rects.reverse();

	for(var i = 0; i < keys.length; i++){
		var n = 0;
		var scale = 0;
		if(i < 24){
			scale = Math.floor(i / 7);
			if(i % 7 == 0) n = 0 + (scale * 12);
			if(i % 7 == 1) n = 2 + (scale * 12);
			if(i % 7 == 2) n = 4 + (scale * 12);
			if(i % 7 == 3) n = 5 + (scale * 12);
			if(i % 7 == 4) n = 7 + (scale * 12);
			if(i % 7 == 5) n = 9 + (scale * 12);
			if(i % 7 == 6) n = 11+ (scale * 12);
		}else if(i < 32){
			scale = Math.floor((i - 24) / 2);
			if((i - 24) % 2 == 0) n = 1 + (scale * 12);
			if((i - 24) % 2 == 1) n = 3 + (scale * 12);
		}else if(i < 41){
			scale = Math.floor((i - 32) / 3);
			if((i - 32) % 3 == 0) n = 6 + (scale * 12);
			if((i - 32) % 3 == 1) n = 8 + (scale * 12);
			if((i - 32) % 3 == 2) n = 10+ (scale * 12);
		}
		keys[i].n = 440 * Math.pow(2, (-9 + n) / 12);
	}
}

game.render = function(){
	for(var i = 0; i < keys.length; i++){
		game.graphics.rect(keys[i].x - 1, keys[i].y - 1, keys[i].w + 2, keys[i].h + 2, "#000");
		game.graphics.rect(keys[i].x, keys[i].y, keys[i].w, keys[i].h, keys[i].a ? color : keys[i].c);
	}

	game.graphics.rect(x_offset - 2, y_offset - 102, 24 * white_key_width + 4, y_offset - 8, "#000");
	//drawSquare(100, 50);
	//drawSaw(150, 50);
	//drawTriangle(200, 50);
	//drawSine(250, 50);
}

function drawSquare(x, y){
	var h = 10;
	game.graphics.line(x, y, x, y - h, "#FFF");
	game.graphics.line(x, y - h, x + h, y - h, "#FFF");
	game.graphics.line(x + h, y - h, x + h, y, "#FFF");
	game.graphics.line(x + h, y, x + h * 2, y, "#FFF");
	game.graphics.line(x + h * 2, y, x + h * 2, y - h, "#FFF");
}

function drawSaw(x, y){
	var h = 10;
	game.graphics.line(x, y, x, y - h, "#FFF");
	game.graphics.line(x, y - h, x + h * 2, y, "#FFF");
}

function drawTriangle(x, y){
	var h = 10;
	game.graphics.line(x, y - h / 2, x + h / 2, y - h, "#FFF");
	game.graphics.line(x + h / 2, y - h, x + h + h / 2, y, "#FFF");
	game.graphics.line(x + h + h / 2, y, x + h * 2, y - h / 2, "#FFF");
}

function drawSine(x, y){
	var h = 10;
	for(var i = 0; i < h * 2; i++){
		game.graphics.point(x + i, (Math.cos((i*5)/20) * 20) + y, "#FFF");
	}
}

game.update = function(){
	mouseRect.position.set(game.input.mouse().x, game.input.mouse().y);
	pressed = false;
	for(var i = 0; i < keys.length; i++){
		keys[i].a = false;
	}

	if(game.input.keyPressed(Keys.A)) addNode(261.6255653005986);
	if(game.input.keyReleased(Keys.A)) removeNode(261.6255653005986);

	if(game.input.keyPressed(Keys.S)) addNode(293.6647679174076);
	if(game.input.keyReleased(Keys.S)) removeNode(293.6647679174076);

	if(game.input.keyPressed(Keys.D)) addNode(329.6275569128699);
	if(game.input.keyReleased(Keys.D)) removeNode(329.6275569128699);

	if(game.input.keyPressed(Keys.F)) addNode(349.2282314330039);
	if(game.input.keyReleased(Keys.F)) removeNode(349.2282314330039);

	if(game.input.keyPressed(Keys.G)) addNode(391.99543598174927);
	if(game.input.keyReleased(Keys.G)) removeNode(391.99543598174927);

	if(game.input.keyPressed(Keys.H)) addNode(440);
	if(game.input.keyReleased(Keys.H)) removeNode(440);

	if(game.input.keyPressed(Keys.J)) addNode(493.8833012561241);
	if(game.input.keyReleased(Keys.J)) removeNode(493.8833012561241);

	if(game.input.mouseCheck(Mouse.LEFT)){
		for(var i = 0; i < keys.length; i++){
			if(rects[i].collides(mouseRect)){
				keys[keys.length - i - 1].a = true;
				if(lastFreq != keys[keys.length - i - 1].n){
					removeNode(lastFreq);
					lastFreq = keys[keys.length - i - 1].n;
					addNode(lastFreq);
				}
				break;
			}
		}
	}
	if(game.input.mouseReleased(Mouse.LEFT)){
		removeNode(lastFreq);
		lastFreq = 0;
	}

}

function removeNode(freq){
	var new_nodes = [];
    for (var i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].frequency.value) === Math.round(freq)) {
            nodes[i].stop();
            nodes[i].disconnect();
        } else {
            new_nodes.push(nodes[i]);
        }
    }
    nodes = new_nodes;
}

function addNode(freq){
	var oscillator = actx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = freq;
    oscillator.connect(gain);
    oscillator.start();

    nodes.push(oscillator);
}
