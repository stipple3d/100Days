let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

let characterImg;

let player;

let arrowHandler;

function Preload(){

	//define the character image
	characterImg = new Image();
	
	//set function to start game loop when the iamge is loaded
	characterImg.onload = function() {
	    // the image is ready
	    Setup();
	};
	//set the image src AFTER the onload function has been defined
	//characterImg.src = '../images/quickWalk64_sheet.png';
	characterImg.src = '../images/skeleWalk01_sheet.png';
	
}

function Setup(){
	//_sheet, _sCols, _sRows, _x, _y, _w, _h, _initVal = 1
	player = new AnimatedCharacterWalkerA(characterImg, 3, 4, 0, 0, 32, 32);
	player.addAnimation('down', [6,7,8]);
	player.addAnimation('up', [9,10,11]);
	player.addAnimation('right', [0,1,2]);
	player.addAnimation('left', [3,4,5]);

	arrowHandler = new FourDirArrowHandler();

	gameLoop = GameLoop({
		fps: 6,
	  update: function(dt) {
	  
	  	player.update(arrowHandler.getDir());

	  },
	  render: function() {

	  	context.imageSmoothingEnabled = false;

	  	player.draw();

	  	//arrowHandler.logDirections();

	  	context.save();
		context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#999';
		context.fillText('*** ARROWS TO MOVE ***', 20, canvas.height -30);
		context.restore();

	  }
	});

	gameLoop.start();

}

Preload();