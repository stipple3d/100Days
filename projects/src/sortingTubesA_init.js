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
	colors: ['red', 'blue', 'yellow', 'green', 'cyan', 'orange', 'purple', 'grey'],
	levels: [

		{
			numTubes: 3,
			numColors: 2
		}
	]
};