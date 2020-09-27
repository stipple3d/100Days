class SpriteGeneratorA{
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

		//*********THESE ARE SET UP IN INIT
		this.mapTileWidth;
		this.mapTileHeight;
		this.mapRows; //true = path, false = wall
		this.startRow; 
		this.startCol;
		this.targetRow;
		this.targetCol;


	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{

		
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

		

		//_____________________
		context.restore();
	}

	initLevel = function(){

		//init the mapRows as an empty array
		/*this.mapRows = []; //open (1), wall (0)

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
		*/

	}

}
