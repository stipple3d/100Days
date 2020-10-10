let canvas, context;
let s3dLoop;
let game;


function Setup(){
	game = new Game();
	s3dLoop = new s3dGameLoop(60, game.update, game.render);
	s3dLoop.startLoop();
}

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	/*canvas.onmousemove = HandleMouseMove;
	canvas.onmousedown = HandleCanvasMouseClick;
	document.onmouseup = HandleMouseUp;*/

    Setup();
});


/*function HandleMouseMove(){

	//console.log(event);

	//store mouse X/Y
	mouseX = event.offsetX;
	mouseY = event.offsetY;

	//constrain X/Y to the canvas
	if(mouseX < 0)
		mouseX = 0;
	if(mouseX > canvas.width)
		mouseX = canvas.width;
	if(mouseY < 0)
		mouseY = 0;
	if(mouseY > canvas.height)
		mouseY = canvas.height;
}
function HandleCanvasMouseClick(){

	//NOTE: using stored mouseX/Y values

	//check if the mouseX/Y (on canvas) are in the control area
	if(	mouseX >= controlAreaX &&
		mouseX <= controlAreaX + controlAreaW &&
		mouseY >= controlAreaY &&
		mouseY <= controlAreaY + controlAreaH){
		//mouseClick in control area
		mouseDownInControlArea = true;
	}
}
function HandleMouseUp(){
	//make sure flag for mouse down is false
	mouseDownInControlArea = false;
}*/
