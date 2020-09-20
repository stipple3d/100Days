let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

//static data for the l/r segments of the cave
let caveRows = [
{l: 6, r: 6},
{l: 5, r: 7},
{l: 4, r: 8},
{l: 4, r: 7},
{l: 5, r: 6},
{l: 6, r: 5},
{l: 5, r: 6},
{l: 4, r: 7},
{l: 3, r: 8},
{l: 2, r: 9},
{l: 1, r: 10},
{l: 2, r: 9},
{l: 3, r: 8},
{l: 4, r: 7},
{l: 5, r: 6},
{l: 6, r: 5},
{l: 7, r: 4},
{l: 8, r: 3},
{l: 9, r: 2},
{l: 10, r: 1},
{l: 9, r: 2},
{l: 8, r: 3},
{l: 7, r: 4}
];

const gridUnit = 30;//pixels per grid unit

const pVertScreenUnitOffset = 3;

//const segmentsBeforeChange = 4;
//const minOpeningUnits = 4;

//we will show all cave segments (vertical slices) that the player is 
//in line with (how many will depend on sizes).
//--the folowing above/below vars determin how many other segments we are drawing
//	in addition to the minimum
const segmentsToShowAbove = 0;
const segmentsToShowBelow = 0;

//this will determine the offset between the player and the cave 
//(we can determine what caveElements are potentially interacting with
//	the player from this and the basic settings)
let playerDepthIntoCave = 0;//pixels

let pMoveY;
let pMoveX;

class CaveElement{
	constructor(_x = 0, _y = 0){
		this.x = _x;
		this.y = _y;
		this.unitsWide = 0;
	}
}

function Setup(){

	pMoveX = 0;
	pMoveY = gridUnit / 30;

	//setup left/right key input handlers

	gameLoop = GameLoop({
	  update: function(dt) {

	  	playerDepthIntoCave += pMoveY;

	  },
	  render: function() {

	  	var rowY;

	  	for(var row = 0; row < caveRows.length; row++){
			rowY = row * gridUnit + (pVertScreenUnitOffset * gridUnit) - playerDepthIntoCave;
			context.save();
			context.beginPath();
			context.fillStyle = 'grey';
			//draw left element
			context.fillRect(0,rowY, caveRows[row].l * gridUnit, gridUnit);
			//draw right element
			context.fillRect(canvas.width - (caveRows[row].r * gridUnit),rowY, caveRows[row].r * gridUnit, gridUnit);
			context.restore();
	  	}

	  	context.save();
		context.beginPath();
		context.fillStyle = 'green';
		//draw player circle
		context.arc(canvas.width /2, pVertScreenUnitOffset * gridUnit, gridUnit /2, 0, Math.PI * 2);
		context.fill();
		context.restore();
	  }
	});

	gameLoop.start();
}

Setup();

//picks a random int between 0-2
//(using this to choose decrease, staty the same, or increase)
function randomOfThree(){
	var ran = Math.random();
	if(ran < .33333){
		return 0;
	}
	else if(ran > .66666){
		return 2;
	}
	else{
		return 1;
	}
}