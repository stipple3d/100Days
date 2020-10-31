class Game{
	constructor(){

		this.clearOnRender = true;

		//NOTES
		//- all drawing (whether relative to the 'viewport' or the 'world'
		//		is drawn RELATIVE to the CANVAS )
		//- the viewport X/Y/W/H exist almost exclusively to determine what to draw
		//		(everything still draws itself relateive to the WORLD, offset by the CANVAS offset)
		//- WORLD X/Y is THE X/Y
		//(all canvas and viewport are relative to the world +/- an offset value)

		//DEFINE WORLD MAP (from data or randomly)
		this.world = new WorldMap();

		//DEFINE PLAYER (set strating world position)
		this.player = new Player((gameData.startIndexX * gameData.tileSize) + (gameData.tileSize /2), (gameData.startIndexY * gameData.tileSize) + (gameData.tileSize /2));

		//DEFINE CAMERA (set to follow player w/ adjustment X/Y depending on what point player's pos is 
		//						defined as, center, tl, etc...)
		this.camera = new Camera();
		this.camera.setTarget(this.player);

		//TODO: set canvas offset (world coords) relative to current camera center point
		this.canvasOffset = new Vector2D(this.camera.pos.x - gameData.vpCenterOnCanvasX, this.camera.pos.y - gameData.vpCenterOnCanvasY);//Vector2D

		this.input = new GameInputA();
	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		
		//TODO: adjust player postion (input, or completing existing directions)
		this.player.update(_deltaTime);
		//TODO: adjust camera, including viewport (to follow player, easing?)
		this.camera.update(_deltaTime);
		//TODO: adjust canvas offset (to center on the camera EXACTLY, camera is always in the center, no easing)
		this.canvasOffset.x = this.camera.pos.x - gameData.vpCenterOnCanvasX;
		this.canvasOffset.y = this.camera.pos.y - gameData.vpCenterOnCanvasY;
	}

	render = () =>{
		//console.log('renderRunning');
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			context.clearRect(0, 0, canvas.width, canvas.height);
		}

		context.save();
		//_____________________
		//draw elements

		//NOTE: all WORLD elements are drawn relative to their world coordinates, 
		//		adjusting for the canvasOffset (which is already updated each frame)
		this.world.render();

		this.player.render();

		//NOTE: UI elements are just drawn directly relative to the canvas
		this.camera.render();

		//DEBUG TEXT

		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);*/

		//_____________________
		context.restore();
	}

	mouseClickAt = function(_x, _y){

		console.log('mouseClick: canvasOffset: ' + this.canvasOffset.x + ', ' + this.canvasOffset.y);
		if(!this.player.moving){
			//if the player is not already there, set this as player's target
			this.player.setTarget(_x + this.canvasOffset.x, _y + this.canvasOffset.y);
		}
	}

	mouseMoveTo = function(_x, _y){

		console.log('mousemove: canvasOffset: ' + this.canvasOffset.x + ', ' + this.canvasOffset.y);

		//TODO: calculate, validate and store the cursor Row and Col 
		//		(that tile will be shown highlighted during render)

		var row = Math.floor((_y + this.canvasOffset.y) / gameData.tileSize);
		var col = Math.floor((_x + this.canvasOffset.x) / gameData.tileSize);
		
		if(row <0 || row > gameData.tilesHigh -1 ||
			col <0 || col > gameData.tilesWide -1){
			//invalid location
			this.world.cursorRow = undefined;
			this.world.cursorCol = undefined;
		}
		else{
			this.world.cursorRow = row;
			this.world.cursorCol = col;
		}
		
	}

}

class WorldMap{
	constructor(){
		this.mapRows;
		this.loadMap();

		this.cursorRow = undefined;
		this.cursorCol = undefined;
	}

	render = function(){

		//TODO: instad of this, validate the tile being clicked on as a 
		//		walkable neighbor of the current player tile?

		//check that the draw bounds are valid (don't attempt to draw index values that are outside of the map)
		var topInd = Math.floor(game.camera.getTopVpBounds() / gameData.tileSize);
		if(topInd < 0)
			topInd = 0;
		var leftInd = Math.floor(game.camera.getLeftVpBounds() / gameData.tileSize);
		if(leftInd < 0)
			leftInd = 0;
		var bottomInd = Math.floor(game.camera.getBottomVpBounds() / gameData.tileSize);
		if(bottomInd > gameData.tilesHigh -1)
			bottomInd = gameData.tilesHigh -1;
		var rightInd = Math.floor(game.camera.getRightVpBounds() / gameData.tileSize);
		if(rightInd > gameData.tilesWide -1)
			rightInd = gameData.tilesWide -1;

		for(var row = topInd; row <= bottomInd; row++){
			for(var col = leftInd; col <= rightInd; col++){
				this.mapRows[row][col].draw();
			}
		}
	}

	loadMap = function(){
		var curIndex = 0;
		this.mapRows = [];
		for(var row = 0; row < gameData.tilesHigh; row++){
			this.mapRows[row] = [];
			for(var col = 0; col < gameData.tilesWide; col++){
				this.mapRows[row][col] = new MapTile(row, col, curIndex);
				curIndex ++;
			}
		}
	}
}

class MapTile{
	constructor(_r, _c, _dataIndex){
		this.row = _r;
		this.col = _c;
		//calculate world coords 
		//(doesn't change, only is adjusted by the canvas offset values)
		this.x = this.col * gameData.tileSize;
		this.y = this.row * gameData.tileSize;

		//TODO: do we need this, or just grab the value?
		//this.dataIndex = _dataIndex;

		this.dataValue = gameData.data[_dataIndex];

	}

	draw = function(){
		
		context.save();
		context.beginPath();
		if(this.dataValue == 1){
			context.fillStyle = '#8a954b';
		}
		else{
			context.fillStyle = '#336699';
		}
		
		context.rect(this.x - game.canvasOffset.x +1, this.y - game.canvasOffset.y +1, gameData.tileSize -2, gameData.tileSize -2);

		if(game.world.cursorRow == this.row &&
			game.world.cursorCol == this.col){
			context.strokeStyle = 'white';
			context.lineWidth = 4;
			context.stroke();
		}

		context.fill();
		context.restore();

	}
}

class Player{
	constructor(_x, _y){
		this.pos = new Vector2D(_x, _y);

		this.moving = false;
		this.targetPos = new Vector2D();
	}

	update = function(_dt){
		if(this.moving){
			if(Math.abs(this.pos.x - this.targetPos.x) < 4 && Math.abs(this.pos.y - this.targetPos.y) < 1){
				this.pos.x = this.targetPos.x;
				this.pos.y = this.targetPos.y;
				this.moving = false;
			}
			else{
				this.pos.x += (this.targetPos.x - this.pos.x) * 0.08;
				this.pos.y += (this.targetPos.y - this.pos.y) * 0.08;
			}
			


		}
	}

	render = function(){

		//draw a rectangle directly centered in the canvas 
		//(no adjusting to world, this is basically a UI element)
		context.save();
		context.beginPath();
		context.fillStyle = 'green';
		context.strokeStyle = 'green';
		context.arc(this.pos.x - game.canvasOffset.x, this.pos.y - game.canvasOffset.y, gameData.tileSize /3, 0, Math.PI *2);
		if(this.moving)
			context.stroke();
		else
			context.fill();
		context.restore();

	}

	setTarget = function(_x, _y){
		console.log('player: setTarget: ' + _x + ', ' + _y);
		this.targetPos.x = _x;
		this.targetPos.y = _y;
		this.moving = true;
	}
}

class Camera{
	constructor(_worldX = 0, _worldY = 0){

		//position of the camera in world coords (center of the viewport)
		this.pos = new Vector2D(_worldX, _worldY);

		//viewportSize
		this.viewWidth = gameData.vpWidth;
		this.viewHeight = gameData.vpHeight;

		this.targetObject;
		this.followOffest;
		this.following = false;
	}

	getLeftVpBounds = function(){return this.pos.x - this.viewWidth /2;}
	getRightVpBounds = function(){return this.pos.x + this.viewWidth /2;}
	getTopVpBounds = function(){return this.pos.y - this.viewHeight /2;}
	getBottomVpBounds = function(){return this.pos.y + this.viewHeight /2;}


	update = function(_dt){

		if(this.following){
			//TODO: follow the target object each frame
			this.pos.x = this.targetObject.pos.x;
			this.pos.y = this.targetObject.pos.y;
		}

	}

	render = function(){

		//draw a rectangle directly centered in the canvas 
		//(no adjusting to world, this is basically a UI element)
		context.save();
		context.beginPath();
		context.strokeStyle = 'red';
		context.rect(gameData.vpCenterOnCanvasX - (this.viewWidth /2), gameData.vpCenterOnCanvasY - (this.viewHeight /2), this.viewWidth, this.viewHeight);
		context.stroke();

		context.beginPath();
		context.moveTo(gameData.vpCenterOnCanvasX - 32, gameData.vpCenterOnCanvasY);
		context.lineTo(gameData.vpCenterOnCanvasX + 32, gameData.vpCenterOnCanvasY);
		//context.stroke();
		context.moveTo(gameData.vpCenterOnCanvasX, gameData.vpCenterOnCanvasY - 32);
		context.lineTo(gameData.vpCenterOnCanvasX, gameData.vpCenterOnCanvasY + 32);
		context.stroke();
		context.restore();

	}

	setTarget = function(_followTarget, _followOffsetH = 0, _followOffsetV = 0){
		this.targetObject = _followTarget;
		this.followOffest = new Vector2D(_followOffsetH, _followOffsetV);
		this.pos.x = this.targetObject.pos.x;
		this.pos.y = this.targetObject.pos.y;
		this.following = true;
	}

	setCenter = function(_x, _y){
		this.pos.x = _x;
		this.pos.y = _y;
	}
}