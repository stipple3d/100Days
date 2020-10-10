class Game{
	constructor(){

		this.clearOnRender = true;

		//TODO: constrain radio buttons 
		//			- 4DIR
		//			- 8DIR
		//			- 360 DEG

		this.input = new CanvasGameInputA();

		this.input.addButton('A');
		this.input.addButton('B');
		this.input.addButton('C');
		this.input.addButton('D');

		this.input.addStick('L');


	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		this.input.update();
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

		this.input.render();

		//DEBUG TEXT

		context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);
		




		//_____________________
		context.restore();
	}
}