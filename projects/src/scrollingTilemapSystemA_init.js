let canvas, context;
let s3dLoop;
let game;

function Setup(){
	game = new Game();
	s3dLoop = new s3dGameLoop(60, game.render, game.update);
	s3dLoop.startLoop();
}

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
    Setup();
});

const gameData = {
	//viewport center point's location on the canvas (X/Y)
	//(allows the camera to be off-center in the canvas as needed to have UI, etc)
	vpCenterOnCanvasX: 256,//256
	vpCenterOnCanvasY: 192,//192
	vpWidth: 400,//400
	vpHeight: 225,//300
	tileSize: 48,
	tilesWide: 16,
	tilesHigh: 16,
	startIndexX: 9,
	startIndexY: 9,
	data: [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,
	0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,
	0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,0,
	0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,
	0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,
	0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,
	0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,
	0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,
	0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	]
};