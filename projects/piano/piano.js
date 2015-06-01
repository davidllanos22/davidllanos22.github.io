var game = new Game(640, 120, document.getElementById("piano"));

var white_key_width = 25;
var white_key_height = 100;
var black_key_width = 15;
var black_key_height = 60;

var x_offset = 20;
var y_offset = 10;

var scale_interval = white_key_width * 7;

var keys = [];
var rects = [];

var color = "#FFFF00";

var actx = new AudioContext();
var gain = actx.createGain();
var osc = actx.createOscillator();
osc.connect(gain);
gain.connect(actx.destination);
osc.type = "square";
osc.start();
gain.gain.value = 0;

var pressed = false;

game.init = function(){
	game.graphics.setClearColor("#ff00ff");
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
			console.log(n);
		}else if(i < 41){
			scale = Math.floor((i - 32) / 3);
			if((i - 32) % 3 == 0) n = 6 + (scale * 12);
			if((i - 32) % 3 == 1) n = 8 + (scale * 12);
			if((i - 32) % 3 == 2) n = 10+ (scale * 12);
			console.log(n);
		}
		keys[i].n = 440 * Math.pow(2, (-9 + n) / 12);
	}
}

game.render = function(){
	for(var i = 0; i < keys.length; i++){
		game.graphics.rect(keys[i].x - 1, keys[i].y - 1, keys[i].w + 2, keys[i].h + 2, "#000");
		game.graphics.rect(keys[i].x, keys[i].y, keys[i].w, keys[i].h, keys[i].a ? color : keys[i].c);
	}
}

game.update = function(){
	pressed = false;
	for(var i = 0; i < keys.length; i++){
		keys[i].a = false;
	}
	if(game.input.mouseCheck(Mouse.LEFT)){
		for(var i = 0; i < keys.length; i++){
			if(rects[i].collides(new Rectangle(game.input.mouse().x, game.input.mouse().y, 1, 1))){
				keys[keys.length - i - 1].a = true;
				pressed = true;
				osc.frequency.value = keys[keys.length - i - 1].n;
				console.log(osc.frequency.value);
				gain.gain.value = 1;
				return;
			}
		}
	}
	if(!pressed) gain.gain.value = 0;
}