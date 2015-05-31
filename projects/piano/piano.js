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

var color = "#FF0000";

game.init = function(){
	game.graphics.setClearColor("#ff00ff");
	// whites
	for(var x = 0; x < 24; x++)
		keys.push({x: (x_offset + x * white_key_width) -1, y: y_offset - 1, w: white_key_width + 2, h: white_key_height + 2, c: "#FFF", a: false});
	// two 
	for(var i = 0; i < 4; i++)
		for(var x = 0; x < 2; x++)
			keys.push({x: x_offset + 16 + x * white_key_width + scale_interval * i, y: y_offset, w: black_key_width, h: black_key_height, c: "#000", a: false});
	// three
	for(var i = 0; i < 3; i++)
		for(var x = 0; x < 3; x++)
			keys.push({x: x_offset + 92 + x * white_key_width + scale_interval * i, y: y_offset, w: black_key_width, h: black_key_height, c: "#000", a: false});

	for(var i = 0; i < keys.length; i++)
		rects.push(new Rectangle(keys[i].x + 1, keys[i].y + 1, keys[i].w - 2, keys[i].h - 2));

	rects.reverse();
}

game.render = function(){
	for(var i = 0; i < keys.length; i++){
		game.graphics.rect(keys[i].x - 1, keys[i].y - 1, keys[i].w + 2, keys[i].h + 2, "#000");
		game.graphics.rect(keys[i].x, keys[i].y, keys[i].w, keys[i].h, keys[i].a ? color : keys[i].c);
	}
}

game.update = function(){
	for(var i = 0; i < keys.length; i++){
		keys[i].a = false;
	}
	for(var i = 0; i < keys.length; i++){
		if(rects[i].collides(new Rectangle(game.input.mouse().x, game.input.mouse().y, 1, 1))){

			keys[keys.length - i - 1].a = true;
			return;
		}
	}
}