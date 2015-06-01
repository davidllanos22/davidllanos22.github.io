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
gain.gain.value = 0;

var pressed = false;
var nodes = [];

var lastFreq = 0;
var oscType = "square";

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
	drawSquare(100, 50);
	drawSaw(150, 50);
	drawTriangle(200, 50);
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
	pressed = false;
	for(var i = 0; i < keys.length; i++){
		keys[i].a = false;
	}
	if(game.input.mouseReleased(Mouse.LEFT)){
		for (var i = 0; i < nodes.length; i++){
			nodes[i].stop();
			nodes[i].disconnect();
			nodes.splice(j, 1);
		}
		lastFreq = 0;
	}

	if(game.input.mouseCheck(Mouse.LEFT)){
		for(var i = 0; i < keys.length; i++){
			if(rects[i].collides(new Rectangle(game.input.mouse().x, game.input.mouse().y, 1, 1))){
				keys[keys.length - i - 1].a = true;
				pressed = true;
				if(Math.abs(lastFreq - keys[keys.length - i - 1].n) > 0.1){
					for (var j = 0; j < nodes.length; j++){
						nodes[j].stop();
						nodes[j].disconnect();
						nodes.splice(j, 1);
					}
					var osc = actx.createOscillator();
					osc.connect(gain);
					osc.type = oscType;
					osc.frequency.value = keys[keys.length - i - 1].n;
					lastFreq = osc.frequency.value;
					osc.start();
					gain.gain.value = 1;
					nodes.push(osc);
				}
				return;
			}
		}
	}

	if(!pressed) gain.gain.value = 0;
}