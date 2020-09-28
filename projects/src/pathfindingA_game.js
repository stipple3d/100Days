class PathfindingGameA{
	//TODO: create a base class for ALL games and extend this from that class
	//		(specifically to work with the 's3dGameLoop')
	constructor(){

		//canvas 600 x 600
		
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
		this.diagonal = false;
		
		//arrays for OPEN and CLOSED sets
		this.openSet = [];
		this.closedSet = [];

		this.solutionPath = [];
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

			if(this.openSet.length > 0){
				//call function to run a pathfinding step
				this.pathfindingStep();
			}
			else{
				//NO SOLUTION: TARGET WAS NOT FOUND AND WE ARE OUT OF OPTIONS
				console.log('NO SOLUTION');
			}

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

			//draw BG tiles (walls, walkable tiles are not drawn)
			for(var row = 0; row < this.mapRows.length; row++){
				for(var col = 0; col < this.mapRows[row].length; col++){
					//call draw on each node
					this.mapRows[row][col].draw();
				}
			}

			//draw something in the start tile
			context.beginPath();
			context.strokeStyle = '#8ac80b';
			context.rect(this.startCol * this.mapTileWidth + 4, this.startRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw something in the target tile
			context.beginPath();
			context.strokeStyle = 'red';
			context.rect(this.targetCol * this.mapTileWidth + 4, this.targetRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw circles in all of the OPEN set spots
			if(this.openSet.length > 0){
				for(var i = 0; i < this.openSet.length; i++){
					context.beginPath();
					context.fillStyle = '#8ac80b';
					context.arc(this.openSet[i].col * this.mapTileWidth + (this.mapTileWidth /2), 
								this.openSet[i].row * this.mapTileHeight + (this.mapTileHeight /2),
								this.mapTileWidth /4, 0, Math.PI *2);
					context.fill();
				}

			}

			//draw circles in all of the CLOSED set spots
			if(this.closedSet.length > 0){
				for(var i = 0; i < this.closedSet.length; i++){
					context.beginPath();
					context.fillStyle = 'red';
					context.arc(this.closedSet[i].col * this.mapTileWidth + (this.mapTileWidth /2), 
								this.closedSet[i].row * this.mapTileHeight + (this.mapTileHeight /2),
								this.mapTileWidth /4, 0, Math.PI *2);
					context.fill();
				}
			}

		}
		else if(this.state == 'move'){
			//draw BG tiles (walls, walkable tiles are not drawn)
			for(var row = 0; row < this.mapRows.length; row++){
				for(var col = 0; col < this.mapRows[row].length; col++){
					//call draw on each node
					this.mapRows[row][col].draw();
				}
			}

			//draw something in the start tile
			context.beginPath();
			context.strokeStyle = '#8ac80b';
			context.rect(this.startCol * this.mapTileWidth + 4, this.startRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw something in the target tile
			context.beginPath();
			context.strokeStyle = 'red';
			context.rect(this.targetCol * this.mapTileWidth + 4, this.targetRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw path lines
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.startCol * this.mapTileWidth + (this.mapTileWidth /2), this.startRow * this.mapTileHeight + (this.mapTileHeight /2));
			
			for(var p = 0; p < this.solutionPath.length; p++){
				context.lineTo(this.solutionPath[p].col * this.mapTileWidth + (this.mapTileWidth /2), this.solutionPath[p].row * this.mapTileHeight + (this.mapTileHeight /2));
			}
			//context.endPath();
			context.stroke();
		}
		else if(this.state == 'complete'){

			//draw BG tiles (walls, walkable tiles are not drawn)
			for(var row = 0; row < this.mapRows.length; row++){
				for(var col = 0; col < this.mapRows[row].length; col++){
					//call draw on each node
					this.mapRows[row][col].draw();
				}
			}

			//draw something in the start tile
			context.beginPath();
			context.strokeStyle = '#8ac80b';
			context.rect(this.startCol * this.mapTileWidth + 4, this.startRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw something in the target tile
			context.beginPath();
			context.strokeStyle = 'red';
			context.rect(this.targetCol * this.mapTileWidth + 4, this.targetRow * this.mapTileHeight + 4, this.mapTileWidth - 8, this.mapTileHeight - 8);
			context.stroke();

			//draw path lines
			context.beginPath();
			context.strokeStyle = '#777';
			context.lineWidth = 2;
			context.moveTo(this.startCol * this.mapTileWidth + (this.mapTileWidth /2), this.startRow * this.mapTileHeight + (this.mapTileHeight /2));
			
			for(var p = 0; p < this.solutionPath.length; p++){
				context.lineTo(this.solutionPath[p].col * this.mapTileWidth + (this.mapTileWidth /2), this.solutionPath[p].row * this.mapTileHeight + (this.mapTileHeight /2));
			}
			//context.endPath();
			context.stroke();

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

		//vars to save a running index value & 
		//an array to store all the tileIndex values 
		//of just the walkable tiles
		var curIndex = 0
		var walkableTiles = [];

		//loop through and create a 2D array for the map
		for(var row = 0; row < this.mapTilesHigh; row++){
			this.mapRows[row] = [];
			for(var col = 0; col < this.mapTilesWide; col++){

				//create a new pathfinding node in each place in the array
				//pass in (_dataValue, _r, _c, _tWidth, _tHeight)
				this.mapRows[row][col] = new PathfindingNode(data[curIndex], row, col, this.mapTileWidth, this.mapTileHeight);

				if(data[curIndex] == 1){
					//also add this INDEX of this tile to the walkableTiles collection
					walkableTiles.push(curIndex);
				}

				curIndex ++;
			}
		}

		//loop back through the map and have each node find its neighbors
		for(var row = 0; row < this.mapTilesHigh; row++){
			for(var col = 0; col < this.mapTilesWide; col++){
				this.mapRows[row][col].findNeighbors(this.mapRows, false);
			}
		}

		var dataIndexChosen;

		//select a random opnTile from the array for the start point
		var startIndexInOpenTiles = Math.floor(Math.random() * walkableTiles.length);
		dataIndexChosen = walkableTiles[startIndexInOpenTiles];

		//determine the row/col for start tile and save that info in the vars
		this.startRow = Math.floor(dataIndexChosen / this.mapTilesWide);
		this.startCol = dataIndexChosen - (this.startRow * this.mapTilesWide);

		console.log(this.startRow + ', ' + this.startCol);

		//set startIndex as startPoint (2)
		// CHANGE: this.mapRows[this.startRow][this.startCol] = 2;

		//remove the start point from the array
		walkableTiles.splice(startIndexInOpenTiles, 1);

		//select a random open tile from teh array for the target
		var targetIndexInOpenTiles = Math.floor(Math.random() * walkableTiles.length);
		dataIndexChosen = walkableTiles[targetIndexInOpenTiles];

		//determine the row/col for start tile and save that info in the vars
		this.targetRow = Math.floor(dataIndexChosen / this.mapTilesWide);
		this.targetCol = dataIndexChosen - (this.targetRow * this.mapTilesWide);

		//set startIndex as targetpoint (3)
		// CHANGE: this.mapRows[this.targetRow][this.targetCol] = 3;

		//initialize OPEN and CLOSED sets as empty arrays
		//*** create open set (the set of nodes to be evaluated)
		this.openSet = [];
		//*** create closed set (the set of nodes already evaluated)
		this.closedSet = [];

		//add the start tile to the OPEN set (and set its G/H?)
		//NOTE: the REFs are being passed into OPEN/CLOSED arrays
		//		(so they are the SAME instances that live in the mapRows 2D array)
		this.openSet.push(this.mapRows[this.startRow][this.startCol]);
	}

	pathfindingStep = function(){

		console.log('running parthfinding step');

		//FIRST THING IN EACH LOOP IS TO FIND THE NODE IN THE OPEN SET
		//WITH THE LOWEST 'F'

		//start index as the first in the open set
		//this will get updated with better ones if the F value of the one
		//being compared to the current best has a lower F
		var indexOfBest = 0;
		console.log('fTest: ' + this.openSet[0].getF());

		for(var i = 0; i < this.openSet.length; i++){
			if(this.openSet[i].getF() < this.openSet[indexOfBest].getF()){
				//F of current idex is better than the current best
				indexOfBest = i;
			}
		}

		//****current = node in OPEN with the lowest fCost
		//store the ref to the actual NODE object from open set 
		//(and in turn the mapRows array)
		var currentNode = this.openSet[indexOfBest];

		//***** add current to CLOSED
		//add currentNode to the closed array
		this.closedSet.push(currentNode);

		//remove currentNode from the open array
		//***** remove current from OPEN
		//NOTE: does not change the Node in the mapRows array, 
		//		NOR, does it change the ref stored in 'currentNode'
		//		since that ultimately points to the mapRows array
		this.openSet.splice(indexOfBest, 1);

		//console.log(currentNode); //this still works

		//if current is the target node (path has been found)
		//return (after storing the result)
		if(currentNode.row == this.targetRow &&
			currentNode.col == this.targetCol){
			//WE HAVE FOUND THE TARGET

			console.log('----- TARGET FOUND ! ----- ');

			//store resulting path
			this.solutionPath = [];

			var temp = currentNode;

			this.solutionPath.push(temp);

			while(temp.parent){
				this.solutionPath.push(temp.parent);
				temp = temp.parent;
			}

			//reverse solution array
			this.solutionPath.reverse();

			//switch to move state
			this.state = 'move';

			return;

		}
		/*else{
			console.log('target not found');
		}*/


		//for each neightbor of the current node
		for(var n = 0; n < currentNode.walkableNeighborNodes.length; n++){

			//*** skip any Nodes that are already in the CLOSED set or that
			//		are not walkable
			if(!this.closedSet.includes(currentNode.walkableNeighborNodes[n])){
				//we have already checked the walkability of the neighbor tile 
				//(as it wouldn't be in 'walkableNeighbors' if it wasn't)

				//neighbor is not in OPEN
				if(!this.openSet.includes(currentNode.walkableNeighborNodes[n])){

					//set fCost of neighbor
					//TODO: adjust the distance being added if we are using diagonals
					currentNode.walkableNeighborNodes[n].g = currentNode.g + 1;
					currentNode.walkableNeighborNodes[n].h = HeuristicCalc(currentNode.walkableNeighborNodes[n], this.mapRows[this.targetRow][this.targetCol]);

					//set parent of neighbor to current
					currentNode.walkableNeighborNodes[n].parent = currentNode;

					//add neighbor to open
					this.openSet.push(currentNode.walkableNeighborNodes[n]);
				}
				//TODO: adjust the distance being added if we are using diagonals
				else if(currentNode.g + 1 < currentNode.walkableNeighborNodes[n].g){
					//if the neighbor is already in open, but this path would be shorter
					//than the best one it has found previously

					//set fCost of neighbor
					//TODO: adjust the distance being added if we are using diagonals
					currentNode.walkableNeighborNodes[n].g = currentNode.g + 1;
					currentNode.walkableNeighborNodes[n].h = HeuristicCalc(currentNode.walkableNeighborNodes[n], this.mapRows[this.targetRow][this.targetCol]);

					//set parent of neighbor to current
					currentNode.walkableNeighborNodes[n].parent = currentNode;
				}		

			}
		}
		

		











	}
}

function HeuristicCalc(nodeA, nodeB){
	return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
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

class PathfindingNode{
	constructor(_dataValue, _r, _c, _tWidth, _tHeight){

		if(_dataValue == 0)
			this.walkable = false;
		else if(_dataValue == 1)
			this.walkable = true;
		else
			console.log('PathfindingNode: invalid data detected');

		//TODO: do we need the node to know its row/col?
		this.row = _r;
		this.col = _c;

		this.tileWidth = _tWidth;
		this.tileHeight = _tHeight;

		this.g = 0;
		this.h = 0;
		
		this.padding = 1;

		this.walkableNeighborNodes = [];

		this.debugDirs = '';

		this.parent = undefined;
	}

	getF = function(){
		return this.g + this.h;
	}

	findNeighbors = function(_map, diag){

		this.walkableNeighborNodes = [];

		//if thie node is not walkable, it should not be in any list, 
		//so it doesn't need to know its neighbors
		if(this.walkable){

			//add TLUD neighbors if they are in bounds and walkable

			//UP
			if(this.row > 0 && _map[this.row -1][this.col].walkable){
				this.debugDirs = this.debugDirs.concat('U');
				this.walkableNeighborNodes.push(_map[this.row -1][this.col]);
			}

			//DOWN
			if(this.row < _map.length -1 && _map[this.row +1][this.col].walkable){
				this.debugDirs = this.debugDirs.concat('D');
				this.walkableNeighborNodes.push(_map[this.row +1][this.col]);
			}

			//LEFT
			if(this.col > 0 && _map[this.row][this.col -1].walkable){
				this.debugDirs = this.debugDirs.concat('L');
				this.walkableNeighborNodes.push(_map[this.row][this.col -1]);
			}

			//RIGHT
			if(this.col < _map[0].length -1 && _map[this.row][this.col +1].walkable){
				this.debugDirs = this.debugDirs.concat('R');
				this.walkableNeighborNodes.push(_map[this.row][this.col +1]);
			}

			//ADD diagonals if requested
			if(this.diagonals){
				//ADD 4 diagonals to neightbors as well
			}
		}


	}

	draw = function(){		

		//draw walls

		if(!this.walkable){//open
			context.beginPath();
			context.fillStyle = '#444';//wall
			context.rect(this.col * this.tileWidth + this.padding, this.row * this.tileHeight + this.padding, this.tileWidth - (this.padding *2), this.tileHeight - (this.padding *2));
			context.fill();
		}
		//TODO: do not draw the open tiles (background), 
		//		(they will have colors/shapes drawn in based on status
		//		of pathfinding)
		/*else if(this.walkable){//open
			context.fillStyle = 'white';
		}*/

		context.beginPath();
		context.fillStyle = 'white';
		context.fillText(this.debugDirs, this.col * this.tileWidth +15, this.row * this.tileHeight +15);
		context.fill();
	}
}
