class Game{
	constructor(){

		this.clearOnRender = true;

		//TODO: dot matrix or points on a grid at the center
		//TODO: 2nd position for each of those dot matrix points
		//TODO: on/off status for the dot matrix grid (forming a shape)
		//TODO: each dot matrix point is animated out to the 2nd poition (ring around?)
		//TODO: returns to the grid into a different shape?

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


		//DEBUG TEXT

		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);*/
		




		//_____________________
		context.restore();
	}
}