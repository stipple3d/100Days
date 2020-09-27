let canvas, context;
const renderWait = 0.5;

let slider, output;

let pixelMap;
let zoomFactor;

const mirrorDirs = 1;
const debugColors = false;

function Render(){
	
	//console.log('sliderValue: ' + slider.value);

	zoomFactor = slider.value;

	//clear BG
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.save();

	for(var row = 0; row < pixelMap.length; row++){
		for(var col = 0; col < pixelMap[row].length; col++){

			context.beginPath();
			if(debugColors){
				if(pixelMap[row][col] == 0){
					context.fillStyle = 'black';
				}
				else if(pixelMap[row][col] == 1){
					context.fillStyle = 'white';
				}
				else if(pixelMap[row][col] == 2){
					context.fillStyle = 'red';
				}
				else if(pixelMap[row][col] == 3){
					context.fillStyle = 'cyan';
				}
				else if(pixelMap[row][col] == 4){
					context.fillStyle = 'green';
				}
			}
			else{
				if(pixelMap[row][col] == 0){
					context.fillStyle = '#2a2f38';
				}
				else{
					context.fillStyle = '#8ac80b';
				}
			}

			
			
			context.rect(col * zoomFactor, row * zoomFactor, zoomFactor, zoomFactor);
			context.fill();
		}
	}

	context.restore();


	//schedule the next render call
	setTimeout(Render, renderWait * 1000);
}
function Setup(){

	zoomFactor = slider.value;
	
	//we are setting a 16 x 16 pixel generator right now
	//TODO: expand this to larger sizes?
	pixelMap = [];
	for(var row = 0; row < 16; row++){
		pixelMap[row] = [];
		for(var col = 0; col < 16; col++){
			//fill with OFF values


			pixelMap[row][col] = 0;
		

		}
	}

	////////////
	//  WALKERS
	////////////

	//TODO: start a random walker in the TL of the center 4 tiles 
	//		(since it is an even number, there is no "center")

	//TODO: constrain its movement to the TL quadrant & let it wander 
	//		until it has found a set number of tiles to turn to 
	var moverRow = 7;
	var moverCol = 7;

	var countFound = 0;

	var randVal;

	pixelMap[moverRow][moverCol] = 1;

	while(countFound < 14){

		//choose a random value
		randVal = Math.random();

		if(randVal < .5){
			randVal = Math.random();
			//trying to move U/D
			if(randVal < .3333){
				//trying to move U
				if(moverRow -1 >= 0){
					moverRow -= 1;
					if(pixelMap[moverRow][moverCol] == 0){
						pixelMap[moverRow][moverCol] = 1;
						countFound ++;
					}
				}
			}
			else if(randVal > .6666){
				//trying to move D
				if(moverRow +1 <= 7){
					moverRow += 1;
					if(pixelMap[moverRow][moverCol] == 0){
						pixelMap[moverRow][moverCol] = 1;
						countFound ++;
					}
				}
			}
			else{
				//NO MOVE
			}
		}
		else{
			randVal = Math.random();
			//trying to move L/R
			if(randVal < .3333){
				//trying to move L
				if(moverCol -1 >= 0){
					moverCol -= 1;
					if(pixelMap[moverRow][moverCol] == 0){
						pixelMap[moverRow][moverCol] = 1;
						countFound ++;
					}
				}
			}
			else if(randVal > .6666){
				//trying to move R
				if(moverCol +1 <= 7){
					moverCol += 1;
					if(pixelMap[moverRow][moverCol] == 0){
						pixelMap[moverRow][moverCol] = 1;
						countFound ++;
					}
				}
			}
			else{
				//NO MOVE
			}
		}
	}

	if(mirrorDirs == 1){
		//TODO: generate a new BL quadrant shape with a walker
		//		(only mirroring L/R)

		//reset mover start to BL center tile
		moverRow = 8;
		moverCol = 7;

		//reset count found
		countFound = 0;

		pixelMap[moverRow][moverCol] = 2;

		while(countFound < 14){

			//choose a random value
			randVal = Math.random();

			if(randVal < .5){
				randVal = Math.random();
				//trying to move U/D
				if(randVal < .3333){
					//trying to move U
					if(moverRow -1 >= 8){
						moverRow -= 1;
						if(pixelMap[moverRow][moverCol] == 0){
							pixelMap[moverRow][moverCol] = 2;
							countFound ++;
						}
					}
				}
				else if(randVal > .6666){
					//trying to move D
					if(moverRow +1 <= 15){
						moverRow += 1;
						if(pixelMap[moverRow][moverCol] == 0){
							pixelMap[moverRow][moverCol] = 2;
							countFound ++;
						}
					}
				}
				else{
					//NO MOVE
				}
			}
			else{
				randVal = Math.random();
				//trying to move L/R
				if(randVal < .3333){
					//trying to move L
					if(moverCol -1 >= 0){
						moverCol -= 1;
						if(pixelMap[moverRow][moverCol] == 0){
							pixelMap[moverRow][moverCol] = 2;
							countFound ++;
						}
					}
				}
				else if(randVal > .6666){
					//trying to move R
					if(moverCol +1 <= 7){
						moverCol += 1;
						if(pixelMap[moverRow][moverCol] == 0){
							pixelMap[moverRow][moverCol] = 2;
							countFound ++;
						}
					}
				}
				else{
					//NO MOVE
				}
			}
		}

	}

	////////////
	//  MIRRORS
	////////////

	
	if(mirrorDirs != 0){
		if(mirrorDirs == 2){
			//TODO: then mirror the TL to the BL
			for(var row = 0; row < 8; row++){
				for(var col = 0; col < 8; col++){
					if(pixelMap[row][col] == 1)
						pixelMap[15-row][col] = 2;
					//col same
					//mirrowRow = rowLength - 1 (last index in the rows) MINUS row
				}
			}

		}
		//(ALWAYS) then mirror the LEFT to the RIGHT
		for(var row = 0; row < pixelMap.length; row++){
			for(var col = 0; col < 8; col++){
				if(pixelMap[row][col] == 1)
					pixelMap[row][15 - col] = 3;
				else if(pixelMap[row][col] == 2)
					pixelMap[row][15 - col] = 4;
				//row the same
				//mirrowCol = rowLength - 1 (last index in the row) MINUS col
			}
		}
	}
	
	//generate and print output text
	var outString = '';
	for(var row = 0; row < pixelMap.length; row++){
		for(var col = 0; col < pixelMap[row].length; col++){
			if(pixelMap[row][col] == 0)
				outString = outString.concat('0');
			else
				outString = outString.concat('1');
		}
	}
	output.innerHTML = outString;
	console.log(outString);

	//schedule the first render call
	setTimeout(Render, renderWait * 1000);
}
//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");

	slider = document.getElementById("myRange");
	zoomPerc = document.getElementById("demo");
	output = document.getElementById("output");
	
	zoomPerc.innerHTML = 'zoom: ' + slider.value + ' x'; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
	  zoomPerc.innerHTML = 'zoom: ' + this.value + ' x';
	}

    Setup();
});

