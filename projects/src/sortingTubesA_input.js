class CanvasGameInputA{
	constructor(){

		//****** EVENTS

		//TODO: consider listener on the document/window mouseMove (also?)
		//		(if the mouse/touch leaves the canvas we will lose control,
		//			and then pick it back up on return. Might be better if 
		//			drags we tracked anywhere and constrained?)
		canvas.onmousemove = this.handleCanvasMouseMove;
		canvas.onmousedown = this.handleCanvasMouseDown;
		document.onmouseup = this.handleDocMouseUp;


		this.canvasMouseX = undefined;
		this.canvasMouseY = undefined;

	}

	handleCanvasMouseMove = (e) =>{
		
		this.canvasMouseX = e.offsetX;
		this.canvasMouseY = e.offsetY;

	}

	handleCanvasMouseDown = (e) =>{
		e.preventDefault();
		this.canvasMouseX = e.offsetX;
		this.canvasMouseY = e.offsetY;
		console.log(this.canvasMouseX + ', ' + this.canvasMouseY);

		game.mouseClickAt(this.canvasMouseX, this.canvasMouseY);
	}

	handleDocMouseUp = (e) =>{
		
	}

	update = function(_dt){

		
	}

	render = function(){
		
	}

}