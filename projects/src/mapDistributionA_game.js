class Game{
	constructor(){

		this.clearOnRender = true;

		//holder for all points on the map 
		//(ignoring zones once they are used to create the correct distribution)
		this.pointsOnMap = [];

		//collect the zones (just for display in testing)
		this.zones = [];

		this.generateWorld();

		//select starting zone
		this.currentPoint = Math.floor(Math.random() * this.pointsOnMap.length);

		//TODO: zones as containters, each holding the points within them 
		//		(acts as a quadtree-ish/ chunk-based system that only loads the 
		//		info around the player)

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

		context.save();
		//_____________________
		//draw elements

		//console.log('render');

		//TODO: draw zones (testing)
		for(var z = 0; z < this.zones.length; z++){
			//console.log('render zone');
			context.beginPath();
			context.fillStyle = '#336699';
			context.rect(this.zones[z].x +1, this.zones[z].y +1, this.zones[z].w -2, this.zones[z].h -2);
			context.fill();
		}
		

		//TODO: draw points on map
		for(var p = 0; p < this.pointsOnMap.length; p++){
			//console.log('render zone');
			context.beginPath();
			
			if(p == this.currentPoint){
				context.fillStyle = 'red';
				context.arc(this.pointsOnMap[p].x, this.pointsOnMap[p].y, 2, 0, Math.PI *2);
				context.fill();
			}
			else{
				context.strokeStyle = 'white';
				context.arc(this.pointsOnMap[p].x, this.pointsOnMap[p].y, 1, 0, Math.PI *2);
				context.stroke();
			}
			
		}

		//TODO: stop loop? (with for input to regenerate?)


		//DEBUG TEXT

		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);*/

		//_____________________
		context.restore();
	}

	generateWorld = function(){
		//console.log('generateWorld');
		 var zoneWidth = Math.round(canvas.width / gameData.zonesWide);
		 var zoneheight = Math.round(canvas.height / gameData.zonesHigh);
		 var targetCount;

		 for(var col = 0; col < gameData.zonesWide; col++){
		 	for(var row = 0; row < gameData.zonesHigh; row++){
		 		targetCount = Math.floor(Math.random() * (gameData.maxPerZone - gameData.minPerZone + 1) + gameData.minPerZone);
		 		//Math.floor(Math.random() * (max - min + 1) + min);
		 		this.fillZone(col * zoneWidth, row * zoneheight, zoneWidth, zoneheight, targetCount);
		 	}	
		 }
	}

	fillZone = function(_zoneX, _zoneY, _zoneWidth, _zoneHeight, _targetCount){
			
		//create a zone object and store it in the zones array (for testing)
		var zone = {};
		zone.x = _zoneX;
		zone.y = _zoneY;
		zone.w = _zoneWidth;
		zone.h = _zoneHeight;
		this.zones.push(zone);
		//console.log(zone);

		var minX = _zoneX + gameData.zoneEdgeBuffer;
		var maxX = _zoneX + _zoneWidth - gameData.zoneEdgeBuffer;
		var minY = _zoneY + gameData.zoneEdgeBuffer;
		var maxY = _zoneY + _zoneHeight - gameData.zoneEdgeBuffer;

		var zonesToFill = _targetCount;

		var x, y;

		while(zonesToFill > 0){
			//select a random X/Y in the buffer range
			x = Math.floor(Math.random() * (maxX - minX + 1) + minX);
		 	y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

		 	//TODO: check it for distance to others in the zone/map
		 	//TODO: check that is not already a point in the map (even if distance isn't a thing)

		 	//for now, just push it to the array and decrement the count
		 	this.pointsOnMap.push(new Vector2D(x,y));
		 	zonesToFill --;
		}

	}
}