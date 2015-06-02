var game = new Game(640, 240, document.getElementById("piano"));

var waveforms = game.loader.loadImage("waveforms.png");
var gui = game.loader.loadImage("gui.png");

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
gain.gain.value = 0.05;
gain.connect(actx.destination);

var nodes = [];

var lastFreq = 0;
var lastNote = 0;

var wavesButtons = [];
var oscType = "square";
var oscSelected = 0;

var mouseRect = new Rectangle(game.input.mouse().x, game.input.mouse().y, 1, 1);



game.init = function(){
	wavesButtons.push(new Rectangle(40, 30, 20, 20));
	wavesButtons.push(new Rectangle(70, 30, 20, 20));
	wavesButtons.push(new Rectangle(100, 30, 20, 20));
	wavesButtons.push(new Rectangle(130, 30, 20, 20));

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
		keys[i].n = getFrequency(n);
	}
}

game.render = function(){
	for(var i = 0; i < keys.length; i++){
		game.graphics.rect(keys[i].x - 1, keys[i].y - 1, keys[i].w + 2, keys[i].h + 2, "#000");
		game.graphics.rect(keys[i].x, keys[i].y, keys[i].w, keys[i].h, keys[i].a ? color : keys[i].c);
	}

	game.graphics.rect(x_offset - 2, y_offset - 102, 24 * white_key_width + 4, y_offset - 8, "#000");

	game.graphics.imageSection(waveforms, 40, 30, 0, 0, 20, 20, 20, 20);
	game.graphics.imageSection(waveforms, 70, 30, 1, 0, 20, 20, 20, 20);
	game.graphics.imageSection(waveforms, 100, 30, 0, 1, 20, 20, 20, 20);
	game.graphics.imageSection(waveforms, 130, 30, 1, 1, 20, 20, 20, 20);

	game.graphics.imageSection(gui, 40 + oscSelected * 30, 60, 0, 0, 16, 16, 16, 16);
}

game.update = function(){
	mouseRect.position.set(game.input.mouse().x, game.input.mouse().y);
	pressed = false;
	for(var i = 0; i < keys.length; i++){
		//keys[i].a = false;
	}

	keyboardNote(Keys.A, 0, 0);
	keyboardNote(Keys.W, 1, 24);
	keyboardNote(Keys.S, 2, 1);
	keyboardNote(Keys.E, 3, 25);
	keyboardNote(Keys.D, 4, 2);
	keyboardNote(Keys.F, 5, 3);
	keyboardNote(Keys.T, 6, 32);
	keyboardNote(Keys.G, 7, 4);
	keyboardNote(Keys.Y, 8, 33);
	keyboardNote(Keys.H, 9, 5);
	keyboardNote(Keys.U, 10, 34);
	keyboardNote(Keys.J, 11, 6);
	keyboardNote(Keys.K, 12, 7);
	keyboardNote(Keys.O, 13, 26);
	keyboardNote(Keys.L, 14, 8);
	keyboardNote(Keys.P, 15, 27);

	if(game.input.mouseCheck(Mouse.LEFT)){
		for(var i = 0; i < keys.length; i++){
			if(rects[i].collides(mouseRect)){
				keys[keys.length - i - 1].a = true;
				if(lastFreq != keys[keys.length - i - 1].n){
					keys[lastNote].a = false;
					removeNode(lastFreq);
					lastFreq = keys[keys.length - i - 1].n;
					addNode(lastFreq);
				}
				lastNote = keys.length - i - 1;
				break;
			}
		}
	}

	if(game.input.mousePressed(Mouse.LEFT)){
		for(var i = 0; i < wavesButtons.length; i++){
			if(wavesButtons[i].collides(mouseRect)){
				oscSelected = i;
				if(i == 0) oscType = "square";
				else if(i == 1) oscType = "sine";
				else if(i == 2) oscType = "sawtooth";
				else if(i == 3) oscType = "triangle";
			}
		}
	}

	if(game.input.mouseReleased(Mouse.LEFT)){
		keys[lastNote].a = false;
		removeNode(lastFreq);
		lastFreq = 0;
	}

}

function keyboardNote(keyCode, noteNumber, displayNumber){
	if(game.input.keyPressed(keyCode)){
		keys[displayNumber].a = true;
		addNode(getFrequency(noteNumber));
	} 
	if(game.input.keyReleased(keyCode)){
		keys[displayNumber].a = false;
		removeNode(getFrequency(noteNumber));
	}
}

function getFrequency(number){
	return 440 * Math.pow(2, (-9 + number) / 12);
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
	var osc = actx.createOscillator();
    osc.type = oscType;
    osc.frequency.value = freq;
    osc.connect(gain);
    osc.start();

    var osc2 = actx.createOscillator();
    osc2.type = oscType;
    osc2.frequency.value = freq;
    osc.detune.value = 20;
    osc2.connect(gain);
    osc2.start();

    nodes.push(osc);
    nodes.push(osc2);
}
