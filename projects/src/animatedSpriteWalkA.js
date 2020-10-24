let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

let characterImg, pumkpkinPatchImg;

let player;

let arrowHandler;

let patchTiles;

function Preload(){

	//define the character image
	characterImg = new Image();
	
	//set function to start game loop when the iamge is loaded
	characterImg.onload = function() {
	    // the image is ready
	    PreloadTwo();
	};
	//set the image src AFTER the onload function has been defined
	//characterImg.src = '../images/quickWalk64_sheet.png';
	characterImg.src = '../images/skeleWalk01_sheet.png';
	
}

function PreloadTwo(){

	//define the character image
	pumkpkinPatchImg = new Image();
	
	//set function to start game loop when the iamge is loaded
	pumkpkinPatchImg.onload = function() {
	    // the image is ready
	    Setup();
	};
	//set the image src AFTER the onload function has been defined
	//characterImg.src = '../images/quickWalk64_sheet.png';
	pumkpkinPatchImg.src = '../images/pumpkinPatchA.png';
	
}

function Setup(){
	//_sheet, _sCols, _sRows, _x, _y, _w, _h, _initVal = 1
	player = new AnimatedCharacterWalkerA(characterImg, 3, 4, 0, 0, 32, 32);
	player.addAnimation('down', [6,7,8]);
	player.addAnimation('up', [9,10,11]);
	player.addAnimation('right', [0,1,2]);
	player.addAnimation('left', [3,4,5]);

	//holds a series of X/Y pairs (source spritesheet locations) for each possible tile
	patchTiles = [];
	var obj;
	//push all of the tile sprite locations into the array
	for(var row = 0; row < 4; row++){
		for(var col = 0; col < 6; col++){
			obj = new Object();
			obj.x = col * 16;
			obj.y = row * 16;
			patchTiles.push(obj);
		}
	}

	/*for(var row = 0; row < patchData.tilesHigh; row++){
  		for(var col = 0; col < patchData.tilesWide; col++){
  			patchTiles.push(new ImageTile(pumkpkinPatchImg, ));
  			context.drawImage(pumkpkinPatchImg, col * 64 , row * 64 ,16 ,16, 0, 0, 96 *4, 64 * 4);
  		}
  	}*/

	arrowHandler = new FourDirArrowHandler();

	gameLoop = GameLoop({
		fps: 6,
	  update: function(dt) {
	  
	  	player.update(arrowHandler.getDir());

	  },
	  render: function() {

	  	context.imageSmoothingEnabled = false;

	  	var index;

	  	
	  	for(var row = 0; row < patchData.tilesHigh; row++){
	  		for(var col = 0; col < patchData.tilesWide; col++){

				index = patchData.tilesWide * row + col;

	  			context.drawImage(pumkpkinPatchImg, patchTiles[patchData.data[index]].x , patchTiles[patchData.data[index]].y ,16 ,16, col * 64, row * 64, 64, 64);
	  		}
	  	}




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

/*class ImageTile{
	constructor(_sheet, _sX, _sY, dX, _dY, _srcSize, _destSize){
		this.sX = _sX;
		this.sY = _sY;
		this.dX = _dX;
		this.dY = _dY;
		this.srcSize = _srcSize;
		this.destSize = _destSize;
		this.sheet = _sheet;

	}

	draw = function(){
		context.save();
		context.drawImage(this.sheet, this.sX , this.sY ,this.srcSize ,this.srcSize, this.dX, this.dY, this.destSize, this.destSize);
		context.restore();
	}
}*/

const patchData = {
	tilesWide: 10,
	tilesHigh: 10,
	data: [
7,2,2,2,2,2,2,2,2,9,
12,11,11,11,11,11,11,11,11,12,
12,17,10,17,16,22,5,17,16,12,
12,11,11,11,11,11,11,11,11,12,
12,16,17,17,23,10,17,22,5,12,
12,11,11,11,11,11,11,11,11,12,
12,17,17,10,5,17,23,16,17,12,
12,11,11,11,11,11,11,11,11,12,
12,17,16,17,23,17,22,10,17,12,
19,2,2,2,2,2,2,2,2,21,
]};