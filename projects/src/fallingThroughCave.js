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

let colsWide;
const minOpenCols = 3;

const pVertScreenUnitOffset = 3;

let vAdjustment;

const segmentsBeforeChange = 3;
const startingLeft = 6;
const startingRight = 6

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

const minElementWidth = 1;

//TODO: cave offset (will be the same as the "playerDepthIntoCave", but
//		it will be adjusted for the units that have been removed from the array... 
//		they go off the top of the screen)

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

	colsWide = Math.floor(canvas.width / gridUnit);
	console.log('colsWide: ', colsWide);

	//clear out any data in caveRows array
	caveRows = [];

	var rowsOnScreen = Math.ceil(canvas.height / gridUnit);

	playerDepthIntoCave = pVertScreenUnitOffset * gridUnit;

	vAdjustment = playerDepthIntoCave;

	var row;
	var openSpacesLeft;

	for(var pce = 0; pce < segmentsBeforeChange; pce++){
		row = new Object();
		row.l = startingLeft;
		row.r = startingRight;
		caveRows.push(row);
	}

	for(var ce = 0; ce < rowsOnScreen - segmentsBeforeChange; ce++){
		row = new Object();
		//for this row, calculate the remaining open cols (leaving the minimum required open)
		openSpacesLeft = colsWide - (caveRows[caveRows.length -1].l + caveRows[caveRows.length -1].r) - minOpenCols;
		//if we still have open spaces to be added
		if(openSpacesLeft > 0){
			//check for this already being at minimum left size
			if(caveRows[caveRows.length -1].l > minElementWidth){
				//could get bigger OR smaller, choose from all three options
				row.l = caveRows[caveRows.length -1].l + DownSameUp();
			}
			else{
				//can get bigger or stay the same
				row.l = caveRows[caveRows.length -1].l + SameUp();
			}
		}
		else{
			//no open spaces left

			//check for this already being at minimum left size
			if(caveRows[caveRows.length -1].l > minElementWidth){
				//could get bigger OR smaller, choose from all three options
				row.l = caveRows[caveRows.length -1].l + DownSame();
			}
			else{
				//can't get bigger or smaller, stay the same
				//DO NOTHING
			}

		}

		//recalc open spaces left (now that Left has been adjusted)
		//TODO: have the left adjustement step update the openSpacesLeft var so this isn't needed)
		openSpacesLeft = colsWide - (caveRows[caveRows.length -1].l + caveRows[caveRows.length -1].r) - minOpenCols;
		//if we still have open spaces to be added
		if(openSpacesLeft > 0){
			//check for this already being at minimum left size
			if(caveRows[caveRows.length -1].r > minElementWidth){
				//could get bigger OR smaller, choose from all three options
				row.r = caveRows[caveRows.length -1].r + DownSameUp();
			}
			else{
				//can get bigger or stay the same
				row.r = caveRows[caveRows.length -1].r + SameUp();
			}
		}
		else{
			//no open spaces left

			//check for this already being at minimum left size
			if(caveRows[caveRows.length -1].r > minElementWidth){
				//could get bigger OR smaller, choose from all three options
				row.r = caveRows[caveRows.length -1].r + DownSame();
			}
			else{
				//can't get bigger or smaller, stay the same
				//DO NOTHING
			}

		}

		caveRows.push(row);
	}

	console.log('rowsOnScreen: ' + rowsOnScreen);



	//setup left/right key input handlers

	gameLoop = GameLoop({
	  update: function(dt) {

	  	playerDepthIntoCave += pMoveY;

	  	if(playerDepthIntoCave - vAdjustment >= gridUnit){
	  		vAdjustment += gridUnit;

	  		//remove first caveRow
	  		caveRows.shift();

	  		//add a new cave row
	  		row = new Object();

			//for this row, calculate the remaining open cols (leaving the minimum required open)
			openSpacesLeft = colsWide - (caveRows[caveRows.length -1].l + caveRows[caveRows.length -1].r) - minOpenCols;

			//if we still have open spaces to be added
			if(openSpacesLeft > 0){
				//check for this already being at minimum left size
				if(caveRows[caveRows.length -1].l > minElementWidth){
					//could get bigger OR smaller, choose from all three options
					row.l = caveRows[caveRows.length -1].l + DownSameUp();
				}
				else{
					//can get bigger or stay the same
					row.l = caveRows[caveRows.length -1].l + SameUp();
				}
			}
			else{
				//no open spaces left

				//check for this already being at minimum left size
				if(caveRows[caveRows.length -1].l > minElementWidth){
					//could get bigger OR smaller, choose from all three options
					row.l = caveRows[caveRows.length -1].l + DownSame();
				}
				else{
					//can't get bigger or smaller, stay the same
					//DO NOTHING
				}

			}

			//recalc open spaces left (now that Left has been adjusted)
			//TODO: have the left adjustement step update the openSpacesLeft var so this isn't needed)
			openSpacesLeft = colsWide - (caveRows[caveRows.length -1].l + caveRows[caveRows.length -1].r) - minOpenCols;
			//if we still have open spaces to be added
			if(openSpacesLeft > 0){
				//check for this already being at minimum left size
				if(caveRows[caveRows.length -1].r > minElementWidth){
					//could get bigger OR smaller, choose from all three options
					row.r = caveRows[caveRows.length -1].r + DownSameUp();
				}
				else{
					//can get bigger or stay the same
					row.r = caveRows[caveRows.length -1].r + SameUp();
				}
			}
			else{
				//no open spaces left

				//check for this already being at minimum left size
				if(caveRows[caveRows.length -1].r > minElementWidth){
					//could get bigger OR smaller, choose from all three options
					row.r = caveRows[caveRows.length -1].r + DownSame();
				}
				else{
					//can't get bigger or smaller, stay the same
					//DO NOTHING
				}

			}

			caveRows.push(row);
	  	}

	  },
	  render: function() {

	  	//draw cave rows
	  	var rowY;

	  	for(var row = 0; row < caveRows.length; row++){
			rowY = row * gridUnit - playerDepthIntoCave + vAdjustment;
			context.save();
			context.beginPath();
			context.fillStyle = 'grey';
			//draw left element
			context.fillRect(0,rowY, caveRows[row].l * gridUnit, gridUnit);
			//draw right element
			context.fillRect(canvas.width - (caveRows[row].r * gridUnit),rowY, caveRows[row].r * gridUnit, gridUnit);
			context.restore();
	  	}


	  	//PLAYER IS ALWAYS DRAWN AT THE SAME POINT ON THE SCREEN (Y), 
	  	//	but, can move in the X axis
	  	//(the cave moves opposite the intended players "falling")
	  	context.save();
		context.beginPath();
		context.fillStyle = 'green';
		//draw player circle
		context.arc(canvas.width /2, pVertScreenUnitOffset * gridUnit, gridUnit /2, 0, Math.PI * 2);
		context.fill();
		context.restore();

		//write out the length of the caveRows array
		context.save();
		context.fillStyle = 'white';
		context.font = '20px sans-serif';
		context.fillText('caveRows in array: ' + caveRows.length, 10, 20);
		context.fillText('playerDepthIntoCave: ' + playerDepthIntoCave, 10, 40);
		context.fillText('vAdjustment: ' + vAdjustment, 10, 60);
		context.restore();

		//gameLoop.stop();
	  }
	});

	gameLoop.start();
}

Setup();

//picks a random int between 0-2
//(using this to choose decrease, staty the same, or increase)
function DownSameUp(){
	var ran = Math.random();
	if(ran < .33333){
		return -1;
	}
	else if(ran > .66666){
		return 1;
	}
	else{
		return 0;
	}
}

function SameUp(){
	var ran = Math.random();
	if(ran < .5){
		return 0;
	}
	else{
		return 1;
	}
}

function DownSame(){
	var ran = Math.random();
	if(ran < .5){
		return -1;
	}
	else{
		return 0;
	}
}