class Game{
	constructor(){

		this.clearOnRender = true;

		this.levelIndex = 0;
		this.tubes = [];

		this.startX = 100;
		this.tubeWidth = 20;
		this.spaceBetween = 20;

		this.levelSetup();

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

		this.active = false;

		//holds the contents of the balls in the tube 
		//(from the BOTTOM UP)
		this.contents = [];

		//console.log(this);
	}

	fillWithColor = function(_colorIndex){
		
		for(var b = 0; b < this.capacity; b++){
			this.contents.push(_colorIndex);
		}
		
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
		context.rect(this.x, this.y, 20, 110);
		context.stroke();

		for(var b = 0; b < this.contents.length; b++){
			context.beginPath();
			context.fillStyle = gameData.colors[this.contents[b]];
			context.arc(this.x + 10, this.y + 100 - (b * 20), 10, 0, Math.PI *2);
			context.fill();
		}
		




		//_____________________
		context.restore();
		
	}


	
}