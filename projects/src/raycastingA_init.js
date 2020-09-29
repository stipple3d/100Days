let canvas, context;
let s3dLoop;
let game;
function Setup(){
	game = new RaycastGameA();
	s3dLoop = new s3dGameLoop(30, game.update, game.render);
	s3dLoop.startLoop();
}
//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
    Setup();
});

