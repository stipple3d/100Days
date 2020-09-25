let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

const controlAreaW = canvas.width - 20;
const controlAreaH = 140;
const controlAreaX = 10;
const controlAreaY = canvas.height - controlAreaH - 10;
const centerControlAreaX = controlAreaX + (controlAreaW /2);
const maxDistFromCenter = controlAreaW /2;

//mouse position is only tracked when left button is down (or a touch event)
let mouseDownInControlArea;
let mouseX, mouseY;
let controlAreaDisplayX, controlAreaDisplayY;
let mouseDistFromCenterX;

let percOfMaxDist;

let playerX, playerY;
const playerMaxSpeed = 5;
let playerSpeedX;
const playerMaxAcceleration = .1;
const playerFrictionDeceleration = .01;

function Setup(){

	mouseDownInControlArea = false;

	playerX = canvas.width /2;
	playerY = canvas.height /2;

	playerSpeedX = 0;


	gameLoop = GameLoop({
	  update: function(dt) {
	  
	  	if(mouseDownInControlArea){

	  		//NOTE: in this version, leaving the control area with the button down 
	  		//		will NOT remove the control. The display will show around the edge of the box
	  		//		and then snap back as you re-enter the control area

	  		//update relative control area X/Y mouse position
	  		controlAreaDisplayX = mouseX;
	  		controlAreaDisplayY = mouseY;
	  		//constrain the X/Y to be within the control area
	  		if(controlAreaDisplayX < controlAreaX)
	  			controlAreaDisplayX = controlAreaX;
	  		if(controlAreaDisplayX > controlAreaX + controlAreaW)
	  			controlAreaDisplayX = controlAreaX + controlAreaW;
	  		if(controlAreaDisplayY < controlAreaY)
	  			controlAreaDisplayY = controlAreaY;
	  		if(controlAreaDisplayY > controlAreaY + controlAreaH)
	  			controlAreaDisplayY = controlAreaY + controlAreaH;

	  		//update the distance from control center
	  		mouseDistFromCenterX = mouseX - centerControlAreaX;

	  		//calculate the percentage of max distance (pos/neg)
	  		//		that we should apply to the player
	  		percOfMaxDist = mouseDistFromCenterX / maxDistFromCenter;
	  		//constrain between -1 and 1
	  		if(percOfMaxDist < -1)
	  			percOfMaxDist = -1;
	  		if(percOfMaxDist > 1){
	  			percOfMaxDist = 1;
	  		}

	  		//add the set percentage * MAX acceleration as the amount of speed to add
	  		//(this can be pos/neg)
	  		playerSpeedX += percOfMaxDist * playerMaxAcceleration;

	  	}

	  	//apply a frames friction deceleration (opposite the current direction)
  		if(playerSpeedX < 0)
  			playerSpeedX += playerFrictionDeceleration;
  		if(playerSpeedX > 0)
  			playerSpeedX -= playerFrictionDeceleration;

  		//constrain speed to max/zero
  		if(playerSpeedX > playerMaxSpeed)
  			playerSpeedX = playerMaxSpeed;
  		if(playerSpeedX < -playerMaxSpeed)
  			playerSpeedX = -playerMaxSpeed;

  		if(playerSpeedX > -playerFrictionDeceleration && playerSpeedX < playerFrictionDeceleration)
  			playerSpeedX = 0;

  		playerX += playerSpeedX;

  		//if player is bouncing on either side, reverse direction equally for next frame
  		if(playerX > canvas.width - 20 || playerX < 20)
  			playerSpeedX *= -1;

	  },
	  render: function() {

	  	context.save();

	  	//player object
	  	context.beginPath();
	  	context.fillStyle = '#8ac80b';
	  	context.arc(playerX, playerY, 20, 0, Math.PI *2);
	  	context.fill();
	  	
	  	//draw control area (dashed line?)
		context.beginPath();
	  	context.strokeStyle = '#777';
	  	context.setLineDash([10,10]);
	  	//context.fillStyle = '#ccc';
	  	context.rect(controlAreaX, controlAreaY, controlAreaW, controlAreaH);
	  	//context.fill();
	  	context.stroke();
	  	
	  	//reset dash
	  	context.setLineDash([]);

	  	//control area instruction text
	  	context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#777';
		context.fillText('CLICK AND DRAG IN THIS AREA TO CONTROL PLAYER', 35,controlAreaY + controlAreaH /2 + 5);

	  	//circle around mouse/touch point if active in control area
	  	if(mouseDownInControlArea){
	  		context.beginPath();
	  		context.strokeStyle = '#8ac80b';
	  		//context.fillStyle = '#ccc';
	  		context.arc(controlAreaDisplayX, controlAreaDisplayY, 10, 0, Math.PI *2);
	  		//context.fill();
	  		context.stroke();
	  	}
	  	

	  	//debug text
	  	context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#999';
		context.fillText('canMousePos: ' + mouseX + ', ' + mouseY, 30,30);
		context.fillText('SPEED: ' + playerSpeedX, 30,controlAreaY -20);
		if(mouseDownInControlArea){
			context.fillText('DistanceFromControlCenter: ' + mouseDistFromCenterX, 30,60);
			context.fillText('percOfMaxDist: ' + percOfMaxDist, 30,90);
		}
	  	context.restore();

	  }
	});

	gameLoop.start();

}

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){

	//get elements from the HTML
	//grid = document.querySelector('#grid');
	//messageText = document.querySelector('#message');

	canvas.onmousemove = HandleMouseMove;
	canvas.onmousedown = HandleCanvasMouseClick;
	document.onmouseup = HandleMouseUp;

	

	//run setup
    Setup();
});

function HandleMouseMove(){

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
}
