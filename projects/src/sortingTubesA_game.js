class Game{
	constructor(){

		this.clearOnRender = true;

		this.levelIndex = 0;
		this.tubes = [];

		this.startX = 100;
		this.tubeWidth = 40;
		this.tubePadding = 3;
		this.spaceBetween = 50;

		this.inputHandler = new CanvasGameInputA();

		//this.levelSetup();

		this.selectedSourceIndex = undefined;


	}

	levelSetup = function(){
		
		this.tubes = [];

		for(var t = 0; t < gameData.levels[this.levelIndex].numTubes; t++){
			//console.log('x: ' + (t *(this.spaceBetween + this.tubeWidth) )+ this.startX);
			this.tubes[t] = new Tube(  {xPos: (t *(this.spaceBetween + this.tubeWidth) )+ this.startX, yPos: 100 } );
			if(t < gameData.levels[this.levelIndex].numColors)
				this.tubes[t].fillWithColor(t);
		}
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

		for(var t = 0; t < this.tubes.length; t++){
			this.tubes[t].draw();
		}

		//DEBUG TEXT

		context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('selectedSourceIndex: ' + this.selectedSourceIndex, 10,20);
		//context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);

		//_____________________
		context.restore();
	}

	mouseClickAt = function(_x, _y){

		// console.log('mouseClick: canvasOffset: ' + this.canvasOffset.x + ', ' + this.canvasOffset.y);
		

		//check if the mouse click (on the canvas) is over one of the 
		//tube objects

		for(var t = 0; t < this.tubes.length; t++){
			if(_x >= this.tubes[t].x &&
				_x <= this.tubes[t].x + this.tubes[t].width &&
				_y >= this.tubes[t].y &&
				_y <= this.tubes[t].y + this.tubes[t].height){

				if(t == this.selectedSourceIndex){
					//current source selected again, deselect it and clear 
					//source index value
					this.selectedSourceIndex = undefined;
					this.tubes[t].toggleActive();
				}
				else{
					//not the current selected source

					//if there is a source, move the source ball
					if(this.selectedSourceIndex != undefined){
						if(this.tubes[t].hasRoom()){
							//make sure the destination tube is not full
							var movingValue = this.tubes[this.selectedSourceIndex].getSourceValue();
							var destinationTopValue = this.tubes[t].getTopValue();

							if(movingValue != undefined && (movingValue == destinationTopValue || destinationTopValue == undefined)){
								//if there is a vlaue to move, move it
								this.tubes[t].addBall(movingValue);
								//remove the ball from the source before clearing source index
								this.tubes[this.selectedSourceIndex].removeSourceBall();
								//and clear selected and make the previous source not active
								this.tubes[this.selectedSourceIndex].active = false;
								this.selectedSourceIndex = undefined;
							}

							//else, no value, ignore the click

							
						}
						else{
							//destination tube is full, ignore click 

							//TODO: play a "denied" sounce?
						}
						
					}
					else{
						//else make this the source
						this.selectedSourceIndex = t;
						this.tubes[t].toggleActive();
					}

					

					
				}

				//break out of the loop since we have found a tube in the click
				//area already
				return;

			}
		}

	}

	mouseMoveTo = function(_x, _y){

		console.log('mousemove: canvasOffset: ' + this.canvasOffset.x + ', ' + this.canvasOffset.y);

		
		
	}

}

class Tube{
	constructor({xPos=0, yPos=0, numColors=2, cap=5, style=0} = {}){
		this.x = xPos;
		this.y = yPos;
		this.colors = numColors;
		this.capacity = cap;
		this.styleIndex = style;
		this.width = game.tubeWidth + (game.tubePadding *2);
		this.height = game.tubeWidth * (this.capacity + 0.5);



		this.active = false;

		//holds the contents of the balls in the tube 
		//(from the BOTTOM UP)
		this.contents = [];

		//console.log(this);
	}

	hasRoom = function(){
		
		if(this.contents.length < this.capacity)
			return true;
		else
			return false;
		
	}

	addBall = function(_val){
		
		this.contents.push(_val);
		
	}

	removeSourceBall = function(){
		
		this.contents.length = this.contents.length -1;
		
	}

	getSourceValue = function(){
		
		if(this.active){
			return this.contents[this.contents.length -1];
		}
		else{
			return undefined;
		}
		
	}

	getTopValue = function(){
		
		if(this.contents.length >0){
			return this.contents[this.contents.length -1];
		}
		else{
			return undefined;
		}
		
	}

	fillWithColor = function(_colorIndex){
		
		for(var b = 0; b < this.capacity; b++){
			this.contents.push(_colorIndex);
		}
		
	}

	toggleActive = function(){

		if(this.contents.length >0)
			this.active = !this.active;
		
	}

	update = function(_dt){
		
		
	}

	draw = function(){
		context.save();
		//_____________________
		//draw elements

		context.beginPath();
		context.strokeStyle = 'grey';
		context.lineWidth = 2;
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();

		for(var b = 0; b < this.contents.length; b++){
			context.beginPath();
			context.fillStyle = gameData.colors[this.contents[b]];
			if(this.active && b == this.contents.length -1){
				context.arc(this.x + (this.width /2), this.y, game.tubeWidth /2, 0, Math.PI *2);
			}
			else{
				context.arc(this.x + (this.width /2), this.y + this.height - (b * game.tubeWidth) - game.tubeWidth/2, game.tubeWidth /2, 0, Math.PI *2);
			}
			context.fill();
		}
		




		//_____________________
		context.restore();
		
	}


	
}