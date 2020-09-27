class PathfindingGameA{
	//TODO: create a base class for ALL games and extend this from that class
	//		(specifically to work with the 's3dGameLoop')
	constructor(){

		//canvas 600 x 400
		
		//**** global Constants
		this.mapTilesWide = 10;
		this.mapTilesHigh = 10;

		this.clearOnRender = true;

		//calc the size of each tile in the map
		this.mapTileWidth = canvas.width / this.mapTilesWide;
		this.mapTileHeight = canvas.height / this.mapTilesHigh;

		//let movingRow, movingCol;
		//let direction;
		//let moveDirs;
		//let processingCol, processingRow;
		//let pathComplete;
		//let movesComplete;

		//let completeWaitRemaining;

		this.moveAlongSolution = false;

		this.state = 'init';

		//*********THESE ARE SET UP IN INIT
		this.mapTileWidth;
		this.mapTileHeight;
		this.mapRows; //true = path, false = wall
		this.startRow; 
		this.startCol;
		this.targetRow;
		this.targetCol;

		//---- Pathfinding vars ---- 
		//TODO: OPEN SET
		//TODO: CLOSED SET


	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{

		if(this.state == 'init'){
			this.initLevel();
			this.state = 'pathfinding';
		}
		else if(this.state == 'pathfinding'){
			
			//TODO: take a pathfinding "STEP" each update
			//		until path is found

			/*if(this.moveAlongSolution){
				this.state = 'move';
			}
			else{
				this.state = 'complete';
			}*/
		}
		else if(this.state == 'move'){
			this.state = 'complete';
		}
		else if(this.state == 'complete'){
			
		}
		else{
			console.log('invalid state detected');
		}
	}

	render = () =>{
		//console.log('renderRunning');
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		//console.log(context);
		context.save();
		//_____________________
		//draw elements

		if(this.state == 'init'){
			
		}
		else if(this.state == 'pathfinding'){

			for(var row = 0; row < this.mapRows.length; row++){
				for(var col = 0; col < this.mapRows[row].length; col++){

					context.beginPath();

					//draw walls

					if(this.mapRows[row][col] == 0){//wall
						context.fillStyle = 'black';
					}
					else if(this.mapRows[row][col] == 1){//open
						context.fillStyle = 'white';
					}
					else if(this.mapRows[row][col] == 2){//start
						context.fillStyle = 'cyan';
					}
					else if(this.mapRows[row][col] == 3){//target
						context.fillStyle = 'blue';
					}
					else if(this.mapRows[row][col] == 4){//CLOSED SET
						context.fillStyle = 'red';
					}
					else if(this.mapRows[row][col] == 5){//OPEN SET
						context.fillStyle = 'green';
					}
					
					context.rect(col * this.mapTileWidth, row * this.mapTileHeight, this.mapTileHeight, this.mapTileHeight);
					context.fill();

				}
			}
			
		}
		else if(this.state == 'move'){
			
		}
		else if(this.state == 'complete'){
			
		}
		else{
			console.log('invalid state detected');
		}

		//_____________________
		context.restore();
	}

	initLevel = function(){

		//init the mapRows as an empty array
		this.mapRows = []; //open (1), wall (0)

		var curIndex = 0
		var openTiles = [];

		//loop through and create a 2D array for the map
		for(var row = 0; row < this.mapTilesHigh; row++){
			this.mapRows[row] = [];
			for(var col = 0; col < this.mapTilesWide; col++){
				if(data[curIndex] == 0){//WALL
					this.mapRows[row][col] = data[curIndex];
				}
				else{//OPEN
					this.mapRows[row][col] = data[curIndex];
					//in additon to passing in the tile data
					//	add it to the openTiles array
					openTiles.push(curIndex);					
				}

				curIndex ++;
			}
		}

		var dataIndexChosen;

		//select a random opnTile from the array for the start point
		var startIndexInOpenTiles = Math.floor(Math.random() * openTiles.length);
		dataIndexChosen = openTiles[startIndexInOpenTiles];

		//determine the row/col for start tile and save that info in the vars
		this.startRow = Math.floor(dataIndexChosen / this.mapTilesWide);
		this.startCol = dataIndexChosen - (this.startRow * this.mapTilesWide);

		//set startIndex as startPoint (2)
		this.mapRows[this.startRow][this.startCol] = 2;

		//remove the start point from the array
		openTiles.splice(startIndexInOpenTiles, 1);

		//select a random open tile from teh array for the target
		var targetIndexInOpenTiles = Math.floor(Math.random() * openTiles.length);
		dataIndexChosen = openTiles[targetIndexInOpenTiles];
		

		//determine the row/col for start tile and save that info in the vars
		this.targetRow = Math.floor(dataIndexChosen / this.mapTilesWide);
		this.targetCol = dataIndexChosen - (this.targetRow * this.mapTilesWide);

		//set startIndex as targetpoint (3)
		this.mapRows[this.targetRow][this.targetCol] = 3;


		//TODO: setup pathfinding nodes/sets/etc, (so that pathfinding is ready to 
		//		process a step on the next update)

		//TODO: add starting point as first node in the CLOSED set
		//TODO: add all neighbors of start point into the OPEN set
		//		(populating them with f/g/h costs as they are added)

		//*** leave it at this point. Each step starts with choosing the 
		//		best tile from those in OPEN set

	}

	pathfindingStep = function(){

		//create open set (the set of nodes to be evaluated)
		//create closed set (the set of nodes already evaluated)

		//loop
			//current = node in OPEN with the lowest fCost
			//remove current from OPEN
			//add current to CLOSED

			//if current is the target node (path has been found)
			//return (after storing the result)

			//for each neightbor of the current node
			//if neighbor is not walkable or neighbor is in CLOSED
				//skip to next neighbor

			//if new path to neighbor is shorter OR neighbor is not in OPEN
				//set fCost of neighbor
				//set parent of neighbor to current
				//if neightbor is not in OPEN
					//add neighbor to open











	}
}

const data = 
[0,0,0,0,0,0,0,0,0,0,
0,1,1,0,0,1,1,1,1,0,
0,0,1,1,0,1,0,0,1,0,
0,0,1,1,0,1,0,0,1,0,
0,1,0,1,1,1,1,1,1,0,
0,1,1,1,0,0,0,1,0,0,
0,0,1,1,1,1,0,1,0,0,
0,1,1,0,0,1,0,1,0,0,
0,1,1,0,1,1,1,1,0,0,
0,0,0,0,0,0,0,0,0,0];
