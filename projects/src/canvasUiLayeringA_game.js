class Game{
	constructor(){

		this.clearOnRender = true;

		
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


		

		//_____________________
		context.restore();
	}

}