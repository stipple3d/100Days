class Game{
	constructor(){

		this.clearOnRender = true;

		//TODO: constrain radio buttons 
		//			- 4DIR
		//			- 8DIR
		//			- 360 DEG

		this.input = new CanvasGameInputA();

		this.input.addButton('A', this.aBtnPress, this.aBtnRelease);
		//this.input.addButton('B');
		//this.input.addButton('C');
		//this.input.addButton('D');

		this.input.addStick('L');


		//OBJECT
		this.player = new GameObj(canvas.width /2, canvas.height /2, 20);

	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		this.input.update();

		this.player.update(_deltaTime);
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

		this.input.render();

		this.player.render();

		//DEBUG TEXT

		context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);
		




		//_____________________
		context.restore();
	}

	aBtnPress = () =>{
		//if the player isn't already jumping, start a jump
		if(!this.player.jumping)
			this.player.startJump();
	}
	aBtnRelease = () =>{
		this.player.cancelJump();
	}
}

class GameObj{
	constructor(_x, _y, _size){

		this.x = _x;
		this.y = _y;

		this.size = _size;

		//ax size is 2X the set size
		this.maxSize = this.size *2;

		//size change per call
		this.sizeChange = this.size / 15;

		this._currentSize = this.size;


		this.velocity = 50;//pixels/second

		this._currentStickNormVect = new Vector2D();

		this.jumping = false;

	}

	startJump = function(){
		this.jumping = true;
	}

	cancelJump = function(){
		this.jumping = false;
	}

	update = function(_deltaTime){
		/*console.log(game.input);
		this._currentStickNormVect.x = game.input.normVector.x;
		this._currentStickNormVect.y = game.input.normVector.y;*/

		this._currentStickNormVect = game.input.getStickNormVector('L');
		//console.log(this._currentStickNormVect);
		//console.log(_deltaTime);

		this.x += this._currentStickNormVect.x * this.velocity * _deltaTime;
		this.y += this._currentStickNormVect.y * this.velocity * _deltaTime;


		if(this.jumping){
			//add size and constrain to max size
			this._currentSize += this.sizeChange;
			if(this._currentSize >= this.maxSize){
				//if we hit max, set it to max and cancel jumping
				this._currentSize = this.maxSize;
				this.jumping = false;
			}
		}
		else if(this._currentSize > this.size){
			//not jumping and we are bigger than normal

			//reduce size and constrain to normal
			this._currentSize -= this.sizeChange;
			if(this._currentSize < this.size){
				this._currentSize = this.size;
			}
		}


	}

	render = function(){
		context.save();

		context.beginPath();
		context.fillStyle = 'white';
		context.arc(this.x, this.y, this._currentSize, 0, Math.PI *2);
		context.fill();

		context.beginPath();
		context.fillStyle = 'white';
		context.font = '16px Arial';
		context.fillText('normVectX: ' + this._currentStickNormVect.x, this.x + 10,this.y - 30);
		context.fillText('normVectY: ' + this._currentStickNormVect.y, this.x + 10,this.y - 10);
		
		context.restore();
	}
}