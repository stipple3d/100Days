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
	characterImg.src = '../images/quickWalk64_sheet.png';
}

function Setup(){
	//_sheet, _sCols, _sRows, _x, _y, _w, _h, _initVal = 1
	player = new AnimatedCharacterWalkerA(characterImg, 4, 2, 0, 0, 64, 64);
	player.addAnimation('down', [0,1]);
	player.addAnimation('up', [2,3]);
	player.addAnimation('right', [4,5]);
	player.addAnimation('left', [6,7]);

	arrowHandler = new FourDirArrowHandler();

	gameLoop = GameLoop({
		fps: 8,
	  update: function(dt) {
	  
	  	player.update(arrowHandler.getDir());

	  },
	  render: function() {

	  	player.draw();

	  	//arrowHandler.logDirections();

	  }
	});

	gameLoop.start();

}

Preload();