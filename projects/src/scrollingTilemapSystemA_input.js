class GameInputA{
	constructor(){

		//****** EVENTS

		//TODO: consider listener on the document/window mouseMove (also?)
		//		(if the mouse/touch leaves the canvas we will lose control,
		//			and then pick it back up on return. Might be better if 
		//			drags we tracked anywhere and constrained?)
		canvas.onmousemove = this.handleCanvasMouseMove;
		canvas.onmousedown = this.handleCanvasMouseDown;
		//document.onmouseup = this.handleDocMouseUp;

		//we only track and pass the on the mouse position if we are in the middle of a 
		//drag or other similar event
		//this.trackingMouse = false;

		this.canvasMouseX = undefined;
		this.canvasMouseY = undefined;

	}

	handleCanvasMouseMove = (e) =>{
		this.canvasMouseX = event.offsetX;
		this.canvasMouseY = event.offsetY;
	}

	handleCanvasMouseDown = (e) =>{
		e.preventDefault();
		game.mouseClickAt(this.canvasMouseX, this.canvasMouseY);
	}

	/*handleDocMouseUp = (e) =>{
		
	}*/
}