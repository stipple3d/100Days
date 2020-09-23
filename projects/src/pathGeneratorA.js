let { init, GameLoop } = kontra;
let { canvas, context } = init();

//**** global Constants
const mapTilesWide = 10;
const mapTilesHigh = 10;
const minPathTiles = 6;
const maxPathTiles = 20;

//**** global vars
let gameLoop;
let state;
let mapTileWidth, mapTileHeight;
let mapRows; //true = path, false = wall
let playerStartRow, playerStartCol;
let goalRow, goalCol;
let movingRow, movingCol;
let direction;
let moveDirs;
let processingCol, processingRow;
let pathComplete;

let movesComplete;

let completeWaitRemaining;

function InitPath(){

	pathComplete = false;

	//init map full of false values for each row/col in a 2D array
	mapRows = [];
	for(var row = 0; row < mapTilesHigh; row++){
		mapRows[row] = [];
		for(var col = 0; col < mapTilesWide; col++){
			mapRows[row][col] = false;	
		}
	}

	//pick a random start row/col (not on edges)
	playerStartRow = (Math.floor(Math.random() * (mapTilesHigh -2))) +1;
	playerStartCol = (Math.floor(Math.random() * (mapTilesWide -2))) +1;

	//mark starting point true in mapRows array
	mapRows[playerStartRow][playerStartCol] = true;	

	//init moveDirs array
	moveDirs = [];

	//init processing row/col (to match player start row/col)
	processingCol = playerStartCol;
	processingRow = playerStartRow;

	//NOTE: picking first direction will happen next frame
}

function Setup(){
	state = 'init';

	//canvas size does not vary, so tileW/H can be calculated once here
	mapTileWidth = canvas.width / mapTilesWide;
	mapTileHeight = canvas.height / mapTilesHigh;

	gameLoop = GameLoop({
		fps: 8,
	  update: function(dt) {

	  	if(state == 'init'){
	  		//initialize all path vars (get ready for a clean path generation)

	  		InitPath();

	  		//go to genPath state (on first update run)
	  		state = 'genPath';
	  	}
	  	else if(state == 'genPath'){

	  		//check if path generation is complete
	  		if(moveDirs.length >= maxPathTiles){

	  			//we completed the path last frame, go to moveState now
	  			if(pathComplete){
				//go to the move state (where the player will be shown moving through the path)
	  				movesComplete = 0;
	  				movingRow = playerStartRow;
	  				movingCol = playerStartCol;
	  				state = 'move';
	  			}
	  			else{
	  				pathComplete = true;
	  			}

	  			//return to not do anything else until next frame
	  			return;
	  		}

	  		//select next direction
	  		if(moveDirs.length > 0){
	  			var newDir = GetNewValidDirection(moveDirs[moveDirs.length -1]);
	  		}
	  		else{
	  			var newDir = GetNewValidDirection('');
	  		}
	  		//console.log(newDir);

	  		//check for being stuck
	  		if(newDir == 'noDirs'){
					//TODO: check if we have a long enough path to be complete
	  				if(moveDirs.length < maxPathTiles){
	  					//we are stuck, re-init the path generation
	  					InitPath();
	  				}
	  				else{
	  					//we have enough path points to be done, 
	  					//NOTE: should not get here
	  					//alert('path done, but still stuck?');
	  				}
	  		}
	  		else{
	  			switch(newDir){
		  			case 'left' :
		  				processingCol -= 1;
		  			break;
		  			case 'right' :
		  				processingCol += 1;
		  			break;
		  			case 'up' :
		  				processingRow -= 1;
		  			break;
		  			case 'down' :
		  				processingRow += 1;
		  			break;
		  			default :
		  			break;

		  		}
		  		moveDirs.push(newDir);
		  		mapRows[processingRow][processingCol] = true;
	  		}

	  		

	  		//NOTE: map will be drawn with the new path shown and completion will 
	  		//		checked next frame

	  	}
	  	else if(state == 'move'){
	  		//console.log('moveState');
	  		if(movesComplete >= moveDirs.length){
	  			completeWaitRemaining = 12;
	  			state = 'complete';
	  		}
	  		else{
	  			//moves remaining
	  			switch(moveDirs[movesComplete]){
		  			case 'left' :
		  				movingCol -= 1;
		  			break;
		  			case 'right' :
		  				movingCol += 1;
		  			break;
		  			case 'up' :
		  				movingRow -= 1;
		  			break;
		  			case 'down' :
		  				movingRow += 1;
		  			break;
		  			default :
		  			break;

		  		}
		  		movesComplete ++;
	  		}
	  	}
	  	else if(state == 'complete'){
	  		//iteracte a timer to show complete message for a few seconds and then 
	  		//go to init state (which will re-init the generation preocess)
	  		completeWaitRemaining --;
	  		if(completeWaitRemaining < 0){
	  			//timer is over, set state to init
	  			//init state will re-init the path generation
	  			state = 'init';

	  		}
	  	}
	  	else{
	  		
	  	}

	  },
	  render: function() {
	  	
	  	if(state == 'init'){
	  		context.save();
			context.beginPath();
			context.font = "20px sans-serif";
			context.fillStyle = '#999';
			context.fillText('INIT STATE...', canvas.width /2, canvas.height /2);
			context.restore();
	  	}
	  	else if(state == 'genPath'){

	  		//draw walls/path
	  		for(var row = 0; row < mapRows.length; row++){
	  			for(var col = 0; col < mapRows[row].length; col++){
	  				if(!mapRows[row][col]){
	  					//wall
	  					context.save();
						context.beginPath();
						context.fillStyle = '#333';
						context.fillRect(col * mapTileWidth +1, row * mapTileHeight +1, mapTileWidth -2, mapTileHeight -2);
						context.restore();
	  				}
	  			}
	  		}

	  		//draw moves
	  		context.save();
			context.beginPath();
			context.strokeStyle = '#555';

			var curX = playerStartCol * mapTileWidth  + (mapTileWidth /2);
			var curY = playerStartRow * mapTileHeight + (mapTileHeight /2);

			context.moveTo(curX, curY);

			for(var i = 0; i < moveDirs.length; i++){
				switch(moveDirs[i]){
					case 'left' :
		  				curX -= mapTileWidth;
		  			break;
		  			case 'right' :
		  				curX += mapTileWidth;
		  			break;
		  			case 'up' :
		  				curY -= mapTileHeight;
		  			break;
		  			case 'down' :
		  				curY += mapTileHeight;
		  			break;
		  			default :
		  			break;
				}
				context.lineTo(curX, curY);
			}

			context.stroke();
			context.restore();

	  		//TODO: draw player
	  		context.save();
			context.beginPath();
			context.strokeStyle = '#8ac80b';
			context.arc(playerStartCol * mapTileWidth  + (mapTileWidth /2), playerStartRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
			context.stroke();
			context.restore();

	  		//if path complete, draw goal too
	  		if(pathComplete){
	  			context.save();
				context.beginPath();
				context.strokeStyle = 'red';
				context.arc(processingCol * mapTileWidth  + (mapTileWidth /2), processingRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
				context.stroke();
				context.restore();
	  		}

	  		//draw status of path generation (progress bar?)
	  		context.save();
			context.beginPath();
			context.font = "20px sans-serif";
			context.fillStyle = '#999';
			context.fillText('GENERATING PATH: ' + moveDirs.length + ' / ' + maxPathTiles, 50, canvas.height - 20);
			context.restore();
	  	}
	  	else if(state == 'move'){
	  		//draw walls/path
	  		for(var row = 0; row < mapRows.length; row++){
	  			for(var col = 0; col < mapRows[row].length; col++){
	  				if(!mapRows[row][col]){
	  					//wall
	  					context.save();
						context.beginPath();
						context.fillStyle = '#333';
						context.fillRect(col * mapTileWidth +1, row * mapTileHeight +1, mapTileWidth -2, mapTileHeight -2);
						context.restore();
	  				}
	  			}
	  		}

	  		context.save();
			context.beginPath();
			context.strokeStyle = '#555';

			var curX = playerStartCol * mapTileWidth  + (mapTileWidth /2);
			var curY = playerStartRow * mapTileHeight + (mapTileHeight /2);

			context.moveTo(curX, curY);

			for(var i = 0; i < moveDirs.length; i++){
				switch(moveDirs[i]){
					case 'left' :
		  				curX -= mapTileWidth;
		  			break;
		  			case 'right' :
		  				curX += mapTileWidth;
		  			break;
		  			case 'up' :
		  				curY -= mapTileHeight;
		  			break;
		  			case 'down' :
		  				curY += mapTileHeight;
		  			break;
		  			default :
		  			break;
				}
				context.lineTo(curX, curY);
			}

			context.stroke();
			context.restore();

	  		//TODO: draw player
	  		context.save();
			context.beginPath();
			context.fillStyle = '#8ac80b';
			context.arc(movingCol * mapTileWidth  + (mapTileWidth /2), movingRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
			context.fill();
			context.restore();

	  		//draw goal too
	  		context.save();
			context.beginPath();
			context.strokeStyle = 'red';
			context.arc(processingCol * mapTileWidth  + (mapTileWidth /2), processingRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
			context.stroke();
			context.restore();

	  		//draw status of path generation (progress bar?)
	  		context.save();
			context.beginPath();
			context.font = "20px sans-serif";
			context.fillStyle = '#999';
			context.fillText('MOVING...', 50, canvas.height - 20);
			context.restore();
	  	}
	  	else if(state == 'complete'){
	  		//draw walls/path
	  		for(var row = 0; row < mapRows.length; row++){
	  			for(var col = 0; col < mapRows[row].length; col++){
	  				if(!mapRows[row][col]){
	  					//wall
	  					context.save();
						context.beginPath();
						context.fillStyle = '#333';
						context.fillRect(col * mapTileWidth +1, row * mapTileHeight +1, mapTileWidth -2, mapTileHeight -2);
						context.restore();
	  				}
	  			}
	  		}

	  		context.save();
			context.beginPath();
			context.strokeStyle = '#555';

			var curX = playerStartCol * mapTileWidth  + (mapTileWidth /2);
			var curY = playerStartRow * mapTileHeight + (mapTileHeight /2);

			context.moveTo(curX, curY);

			for(var i = 0; i < moveDirs.length; i++){
				switch(moveDirs[i]){
					case 'left' :
		  				curX -= mapTileWidth;
		  			break;
		  			case 'right' :
		  				curX += mapTileWidth;
		  			break;
		  			case 'up' :
		  				curY -= mapTileHeight;
		  			break;
		  			case 'down' :
		  				curY += mapTileHeight;
		  			break;
		  			default :
		  			break;
				}
				context.lineTo(curX, curY);
			}

			context.stroke();
			context.restore();

	  		//TODO: draw player
	  		context.save();
			context.beginPath();
			context.fillStyle = '#8ac80b';
			context.arc(movingCol * mapTileWidth  + (mapTileWidth /2), movingRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
			context.fill();
			context.restore();

	  		//draw goal too
	  		context.save();
			context.beginPath();
			context.strokeStyle = 'red';
			context.arc(processingCol * mapTileWidth  + (mapTileWidth /2), processingRow * mapTileHeight + (mapTileHeight /2), mapTileWidth /2 -2, 0, Math.PI *2);
			context.stroke();
			context.restore();

	  		//draw status of path generation (progress bar?)
	  		context.save();
			context.beginPath();
			context.font = "20px sans-serif";
			context.fillStyle = '#999';
			context.fillText('COMPLETE: ' + completeWaitRemaining + '...', 50, canvas.height - 20);
			context.restore();
	  	}
	  	else{
	  		context.save();
			context.beginPath();
			context.font = "20px sans-serif";
			context.fillStyle = '#999';
			context.fillText('UNEXPECTED STATE', canvas.width /2, canvas.height /2);
			context.restore();
	  	}

	  }
	});

	gameLoop.start();

}

Setup();

function GetNewValidDirection(currentDir = ''){

	//array to store the final values to choose from
	var possibleDirs = [];

	//check left
	if(!mapRows[processingRow][processingCol -1] && processingCol >= 2){
		possibleDirs.push('left');
	}
	//check up
	if(!mapRows[processingRow -1][processingCol] && processingRow >= 2){
		possibleDirs.push('up');
	}
	//check right
	if(!mapRows[processingRow][processingCol +1] && processingCol <= mapTilesWide -3){
		possibleDirs.push('right');
	}
	//check down
	if(!mapRows[processingRow +1][processingCol] && processingRow <= mapTilesHigh -3){
		possibleDirs.push('down');
	}

	if(possibleDirs.length <= 0){
		//we don't have any valid directions to move
		return 'noDirs';
	}
	else{
		//FIXME: this crashes the browser right now. memory issue?

		//add in an equal number of the current direction 
		//(to make it more likly to continue on current path)
		//ONLY, if the current direction is in the options array
		if(currentDir != '' && possibleDirs.includes(currentDir)){
			//console.log('adding extra currentDirs: ' + possibleDirs.length);
			// for(var i = 0; i < possibleDirs.length; i++){
			// 	possibleDirs.push(currentDir);
			// }
		}
		//console.log(possibleDirs);

		return possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
	}

	

}