class Game{
	constructor(){

		this.clearOnRender = true;

		//TODO:
		//	- figure out how to programatically draw a color HUE range display?
		//	- test what "adding a certain amount of a color" would have on the 
		//		overall color. What colors would make good "components" to add?
		//	- test system for moving an object around into "addition bins" that 
		//		add a certain color over time. When outside that color fades over
		//		time?
		//	- test system for "required color" areas


		this.HueDisplayBar = new HueDisplayBar({_x: 10, _y: 10});

		this.collector = new ColorCollector({_x: canvas.width /2, _y: canvas.height /2, _startR: 0, _startG: 0,_startB: 0});

		this.collectionZones = [];
		var cz;

		//RED (0 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + 200, _y: canvas.height /2, _startR: 255, _startG: 0,_startB: 0});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//GREEN (120 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 -100, _y: canvas.height /2 + 173, _startR: 0, _startG: 255,_startB: 0});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//BLUE (240 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + -100, _y: canvas.height /2 - 173, _startR: 0, _startG: 0,_startB: 255});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//YELLOW (50 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + 100, _y: canvas.height /2 + 173, _startR: 255, _startG: 255,_startB: 0});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//ORANGE (30 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + 173, _y: canvas.height /2 + 100, _startR: 255, _startG: 170,_startB: 0});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//MAGENTA (300 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + 100, _y: canvas.height /2 - 173, _startR: 255, _startG: 0,_startB: 255});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//RED-PINK (330 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 + 173, _y: canvas.height /2 - 100, _startR: 255, _startG: 0,_startB: 170});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//LIME GREEN (90 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2, _y: canvas.height /2 + 200, _startR: 170, _startG: 255,_startB: 0});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//PURPLE (270 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2, _y: canvas.height /2 - 200, _startR: 170, _startG: 0,_startB: 255});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//CYAN (180 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 - 200, _y: canvas.height /2, _startR: 0, _startG: 255,_startB: 255});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//SLIGHTLY BLUE GREEN (150 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 - 173, _y: canvas.height /2 + 100, _startR: 0, _startG: 255,_startB: 170});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		//LIGHT BLUE (210 HUE DEGREES)
		cz = new ColorCollectionZone({_x: canvas.width /2 - 173, _y: canvas.height /2 - 100, _startR: 0, _startG: 170,_startB: 255});
		cz.trackObject(this.collector);
		this.collectionZones.push(cz);
		
	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		
		this.HueDisplayBar.update(_deltaTime);

		//NOTE: process collector movement first, to have accurate 
		//		collision detection for zones' calls to add Color correctly
		this.collector.update(_deltaTime);

		for(var cz = 0; cz < this.collectionZones.length; cz++){
			this.collectionZones[cz].update(_deltaTime);
		}
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


		//TODO: draw a hue display bar (with arrow shoing the current setting)
		this.HueDisplayBar.draw();

		for(var cz = 0; cz < this.collectionZones.length; cz++){
			this.collectionZones[cz].draw();
		}

		this.collector.draw();

		//_____________________
		context.restore();
	}

}

class HueDisplayBar{
	constructor({_x = 0, _y = 0, _startValue = 0, _w = 300, _h = 30} = {}){
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
		this.value = _startValue;

		this.gradient = context.createLinearGradient(0, 0, this.w, 0);
		this.gradient.addColorStop(0, "red");
		this.gradient.addColorStop(0.17, "yellow");
		this.gradient.addColorStop(0.33, "green");
		this.gradient.addColorStop(0.5, "cyan");
		this.gradient.addColorStop(0.67, "blue");
		this.gradient.addColorStop(0.83, "magenta");
		this.gradient.addColorStop(1, "red");

		this.yValuePadding = 2;
		this.valueX = (this.value /360) * this.w + this.x;
		this.valueY = this.y + this.h + this.yValuePadding;
	}

	update = function(_dt){
		this.value ++;
		if(this.value > 360)
			this.value -= 360;

		this.valueX = (this.value /360) * this.w + this.x;
	}

	draw = function(){
		
		context.save();
		//_____________________
		//draw elements

		//draw gradient rect with border
		context.beginPath();
		context.strokeStyle = 'white';
		context.fillStyle = this.gradient;
		context.rect(this.x, this.y, this.w, this.h);
		context.fill();
		context.stroke();

		//draw current indicator
		context.beginPath();
		context.strokeStyle = 'white';
		context.fillStyle = 'red';
		//start at point on bottom edge of rect at correct point % of total
		context.moveTo(this.valueX, this.valueY);

		context.lineTo(this.valueX + 10, this.valueY + 20);
		context.lineTo(this.valueX - 10, this.valueY + 20);
		context.closePath();
		context.fill();
		context.stroke();

		//_____________________
		context.restore();


	}
}

class ColorCollector{
	constructor({_x = 0, _y = 0, _startR = 0, _startG = 0, _startB = 0, _radius = 20} = {}){
		this.x = _x;
		this.y = _y;
		this.radius = _radius;
		this.r = _startR;
		this.g = _startG;
		this.b = _startB;

		this.timeUntilChange = 1;

		canvas.addEventListener("mousemove", this.mouseUpdate)

	}

	mouseUpdate = (e) =>{
		//console.log(this);
		this.x = e.offsetX;
		this.y = e.offsetY;
	}

	//NOTE: these RGB values are coming from an update function
	//		(which has access to the _deltaTime of the frame), so 
	//		these values will be adjusted by the _deltaTime and collection
	//		rate already. Simpley add these values as they come in
	addColor = function(_r, _g, _b, _maxR = 255, _maxG = 255, _maxB = 255){

		//only processing values where there is a value to add
		//(ZERO values will be handled by the loss)
		if(_r > 0){
			this.r += _r;
			if(this.r > _maxR)
				this.r = _maxR;
		}
		if(_g > 0){
			this.g += _g;
			if(this.g > _maxG)
				this.g = _maxG;
		}
		if(_b > 0){
			this.b += _b;
			if(this.b > _maxB)
				this.b = _maxB;
		}
		
	}

	update = function(_dt){

		/*this.timeUntilChange -= _dt;
		//console.log('this.timeUntilChange: ' + this.timeUntilChange);
		if(this.timeUntilChange <= 0){
			this.r = Math.floor(Math.random() * 256);
			this.g = Math.floor(Math.random() * 256);
			this.b = Math.floor(Math.random() * 256);

			this.timeUntilChange = 1;
		}*/




		if(this.r > 0){
			this.r -= _dt * gameData.lossRate;
			if(this.r < 0)
				this.r = 0;
		}

		if(this.g > 0){
			this.g -= _dt * gameData.lossRate;
			if(this.g < 0)
				this.g = 0;
		}

		if(this.b > 0){
			this.b -= _dt * gameData.lossRate;
			if(this.b < 0)
				this.b = 0;
		}
		
	}

	draw = function(){
		
		context.save();
		//_____________________
		//draw elements

		//draw gradient rect with border
		context.beginPath();
		context.strokeStyle = 'grey';
		context.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
		context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
		context.fill();
		context.stroke();

		//DEBUG TEXT

		context.beginPath();
		context.fillStyle = 'white';
		context.textAlign = 'right';
		context.font = '20px Arial';
		context.fillText('RGB: ' + Math.floor(this.r) + ', ' + Math.floor(this.g) + ', ' + Math.floor(this.b), canvas.width - 30,30);
		//context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);


		//_____________________
		context.restore();


	}
}

class ColorCollectionZone{
	constructor({_x = 0, _y = 0, _startR = 0, _startG = 0, _startB = 0, _radius = 50} = {}){
		this.x = _x;
		this.y = _y;
		this.radius = _radius;
		this.r = _startR;
		this.g = _startG;
		this.b = _startB;

		this.objectsToTrack = [];

	}

	trackObject = function(_obj){
		
		//TODO: validate incoming object is a "collector"?

		this.objectsToTrack.push(_obj);
		
	}

	update = function(_dt){

		var distBetween, xDiff, yDiff;
		
		//if collection object(s) are in range, add our color to that object
		for(var c = 0; c < this.objectsToTrack.length; c++){
			xDiff = Math.abs(this.x - this.objectsToTrack[c].x);
			yDiff = Math.abs(this.y - this.objectsToTrack[c].y);
			distBetween = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
			//if distance between center points < radiusA + radiusB
			if(distBetween < this.radius + this.objectsToTrack[c].radius){
				this.objectsToTrack[c].addColor((this.r /255) * (_dt * gameData.collectionRate),
												(this.g /255) * (_dt * gameData.collectionRate),
												(this.b /255) * (_dt * gameData.collectionRate),
												this.r, this.g, this.b);
			}
			//console.log('distBetween: ' + distBetween);
		}
		
	}

	draw = function(){
		
		context.save();
		//_____________________
		//draw elements

		//draw gradient rect with border
		context.beginPath();
		context.strokeStyle = 'white';
		context.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
		context.arc(this.x, this.y, this.radius, 0, Math.PI *2);
		context.fill();
		context.stroke();


		//_____________________
		context.restore();


	}
}

