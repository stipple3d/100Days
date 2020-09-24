class FourDirArrowHandler{
	constructor(){

		this.leftPressed = false;
		this.rightPressed = false;
		this.upPressed = false;
		this.downPressed = false;

		//this.pressedDirections = [];

		this.mostRecentDir = '';

		//TODO: these are accessing the global 'arrowHandler'
		//		instance directly, since the target of the events is the 
		//		document, not the handler
		document.onkeydown = function(e){
			if(e.key == 'ArrowUp'){
				arrowHandler.upPressed = true;
				arrowHandler.mostRecentDir = 'up';
			}
			else if(e.key == 'ArrowDown'){
				arrowHandler.downPressed = true;
				arrowHandler.mostRecentDir = 'down';
			}
			else if(e.key == 'ArrowLeft'){
				arrowHandler.leftPressed = true;
				arrowHandler.mostRecentDir = 'left';
			}
			else if(e.key == 'ArrowRight'){
				arrowHandler.rightPressed = true;
				arrowHandler.mostRecentDir = 'right';
			}
		};

		document.onkeyup = function(e){
			if(e.key == 'ArrowUp'){
				arrowHandler.upPressed = false;
				if(arrowHandler.mostRecentDir == 'up')
					arrowHandler.mostRecentDir = '';
			}
			else if(e.key == 'ArrowDown'){
				arrowHandler.downPressed = false;
				if(arrowHandler.mostRecentDir == 'down')
					arrowHandler.mostRecentDir = '';
			}
			else if(e.key == 'ArrowLeft'){
				arrowHandler.leftPressed = false;
				if(arrowHandler.mostRecentDir == 'left')
					arrowHandler.mostRecentDir = '';
			}
			else if(e.key == 'ArrowRight'){
				arrowHandler.rightPressed = false;
				if(arrowHandler.mostRecentDir == 'right')
					arrowHandler.mostRecentDir = '';
			}
		};

	}

	getDir = function(){

		if(this.mostRecentDir != ''){

			return this.mostRecentDir;
		}
		else{

			//if no most recent is recorded, use basic priority to get a direction from 
			//those currently pressed
			if(this.upPressed)
				return 'up';
			else if(this.downPressed)
				return 'down';
			else if(this.leftPressed)
				return 'left';
			else if(this.rightPressed)
				return 'right';
			else
				return '';
		}
	}

	logDirections = function(){
		context.save();
		context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#999';
		context.fillText('recent: ' + this.mostRecentDir + ', ' + this.upPressed + this.downPressed + this.leftPressed + this.rightPressed, 20, canvas.height -30);
		context.restore();
	}
}