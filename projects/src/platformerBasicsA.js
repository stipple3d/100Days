let canvas, context;

let s3dLoop;

//canvas 600 x 400
const data = {
	playerStartX: 200, playerStartY: 50,
	playerW: 24, playerH: 45, 
	crouches: true, crouchHeight: 27,
	friction: 0.01, gravity: 9.81,
	blockUnit: 30, blocks:
	[
	{x: 0, y: 370, w: 600, h: 30},//floor
	{x: 0, y: 0, w: 600, h: 30},//ceiling
	{x: 0, y: 30, w: 30, h: 340},//left wall
	{x: 570, y: 30, w: 30, h: 340},//right wall
	{x: 300, y: 300, w: 200, h: 30},
	//{x: 0, y: 0, w: 0, h: 0},
	//{x: 0, y: 0, w: 0, h: 0},
	//{x: 0, y: 0, w: 0, h: 0},
	//{x: 0, y: 0, w: 0, h: 0},
	//{x: 0, y: 0, w: 0, h: 0},
	//{x: 0, y: 0, w: 0, h: 0}
	],
	drawWithHighlight: true, highlightWidth: 1
};

let leftPressed, rightPressed;

let blocks;

let player;

function Setup(){

	//run function to init level (run at start and after a death)
	InitLevel();

	s3dLoop = new s3dGameLoop(60, GameRender, GameUpdate);
	s3dLoop.startLoop();

}

function InitLevel(){
	//init the l/r pressed bools to false
	leftPressed = rightPressed = false;

	blocks = [];
	var newBlock;
	for(var b = 0; b < data.blocks.length; b++){
		newBlock = new Object();
		newBlock.x = data.blocks[b].x;
		newBlock.y = data.blocks[b].y;
		newBlock.w = data.blocks[b].w;
		newBlock.h = data.blocks[b].h;
		blocks.push(newBlock);
	}
	//_x, _y, _w, _h, _xS, _jf, _g = 9.81
	player = new SimplePlatformerPlayerA(data.playerStartX, data.playerStartY,
											data.playerW, data.playerH, 
											4, -9.81);

	if(data.crouches){
		player.enableCrouching(data.crouchHeight);
	}
}

function GameUpdate(_deltaTime){
	player.update(leftPressed, rightPressed);
}

function GameRender(){
	context.save();

		//clear BG
		//TODO: have this be a gameSetting?
		context.clearRect(0, 0, canvas.width, canvas.height);

	  	//draw blocks
	  	if(data.drawWithHighlight){
	  		for(var b = 0; b < blocks.length; b++){
				context.beginPath();
				context.fillStyle = 'white';
				context.rect(blocks[b].x, blocks[b].y, blocks[b].w, blocks[b].h);
				context.fill();
				context.beginPath();
				context.fillStyle = '#555';
				context.rect(blocks[b].x + data.highlightWidth, blocks[b].y + data.highlightWidth, blocks[b].w -(data.highlightWidth *2), blocks[b].h - (data.highlightWidth * 2));
		  		context.fill();
	  		}
		}else{
			context.fillStyle = '#555';
		  	for(var b = 0; b < blocks.length; b++){
				context.beginPath();
				context.rect(blocks[b].x, blocks[b].y, blocks[b].w, blocks[b].h);
				context.fill();
			}
		
	  	}
	  	
	  	//draw player
	  	player.draw();

	  	//debug text
	  	context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#999';
		context.fillText('leftPressed: ' + leftPressed , 40, 50);
		context.fillText('rightPressed: ' + rightPressed, 40, 70);
		context.fillText('grounded: ' + player.isGrounded(), 40, 90);
		context.fillText('crouching: ' + player._crouching, 40, 110);
		context.fillText('pvY: ' + player._vY, 40, 130);
	  	
	  	//reset dash
	  	//context.setLineDash([]);
	  	context.restore();
}

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){

	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	//get elements from the HTML
	//grid = document.querySelector('#grid');
	//messageText = document.querySelector('#message');

	//canvas.onmousemove = HandleMouseMove;
	//canvas.onmousedown = HandleCanvasMouseClick;
	//document.onmouseup = HandleMouseUp;
	document.addEventListener("keydown", HandleKeyDown);
	document.addEventListener("keyup", HandleKeyUp);

	//run setup
    Setup();
});

function HandleKeyDown(e){
	switch(e.keyCode){
		case 37:
			//LEFT
			leftPressed = true;
		break;
		case 39:
			//RIGHT
			rightPressed = true;
		break;
		case 38:
			//UP
			player.jump();
		break;
		case 40:
			//DOWN
			player.crouch();
		break;
		case 32:
			//SPACE
			player.jump();
		break;
	}
}
function HandleKeyUp(e){
	switch(e.keyCode){
		case 37:
			//LEFT
			leftPressed = false;
		break;
		case 39:
			//RIGHT
			rightPressed = false;
		break;
		case 38:
			//UP
		break;
		case 40:
			//DOWN
			player.unCrouch();
		break;
		case 32:
			//SPACE
		break;
	}
}