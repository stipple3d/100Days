class MenuSceneGameA{
	//TODO: create a base class for ALL games and extend this from that class
	//		(specifically to work with the 's3dGameLoop')
	constructor(){
		//canvas 600 x 600
		this.clearOnRender = true;

		//LOADING ELEMENTS
		this.loader;
		this.valueAddedPerFrame = 1;
		this.startingValue = 0;
		this.targetValue = 100;
		this.currentValue;

		//MENU ELEMENTS
		this.menuData = [
		{name: 'level 1'},
		{name: 'level 2'},
		{name: 'level 3'},
		{name: 'level 4'}
		];
		this.currentMenuIndex = 0;
		this.menuSelections = [];

		this.menuWait;

		//STATE VAR
		this.state = 'init';
	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{

		if(this.state == 'init'){
			console.log('initLevel running');

			this.loader = new CircleLoader(this.startingValue, this.targetValue, 10, canvas.width /2, canvas.height/2);
			//cLoader.setBgLine(20, '#666');
			this.loader.setProgressLineColor(20, '#8ac80b');

			this.currentValue = this.startingValue;

			this.state = 'loading';
		}
		else if(this.state == 'loading'){

			//check for being done with load at the start of each update
			//(then we add more... 
			//	That way the 100% will show for an update at least)
			if(this.loader.loadingComplete){
				//change state and then return out of loop for this update

				for(var ms = 0; ms < this.menuData.length; ms++){
					this.menuSelections[ms] = new MenuSelection(ms, this.menuData[ms].name, (ms == this.currentMenuIndex), canvas.width /2, (canvas.height /2) + (ms * 70));
				}
				this.menuWait = 20;

				this.state = 'mainMenu';
				return;
			}

			//if we are not done yet...

			//iterate the data before updating the loaders
		  	this.currentValue += this.valueAddedPerFrame;

		  	//constrain value to max
		  	if(this.currentValue > this.targetValue)
		  		this.currentValue = this.targetValue;

		  	//if there is a loader to update, update it
		  	this.loader.updateValue(this.currentValue);
		}
		else if(this.state == 'mainMenu'){
			//console.log('main menu running');

			this.menuWait --;

			if(this.menuWait <= 0){
				//cycle menu selection
				this.menuSelections[this.currentMenuIndex].deactivate();

				this.currentMenuIndex ++;
				if(this.currentMenuIndex >= this.menuSelections.length){
					this.currentMenuIndex = 0;
				}

				this.menuSelections[this.currentMenuIndex].activate();

				//reset wait
				this.menuWait = 20;
			}
		}
		else if(this.state == 'play'){
			
		}
		else if(this.state == 'complete'){
			
		}
		else{
			console.log('invalid state detected');
		}
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

		if(this.state == 'init'){

			context.beginPath();
			context.fillStyle = '#555';
			context.font = "30px Arial";
			context.fillText('initializing ...', canvas.width /2 + 20, canvas.height /2 + 50);
			context.fill();
			
		}
		else if(this.state == 'loading'){

			this.loader.drawLoader();

			context.beginPath();
			context.fillStyle = '#555';
			context.font = "30px Arial";
			context.fillText('LOADING ...', canvas.width /2 + 20, canvas.height /2 + 50);
			context.fill();

		}
		else if(this.state == 'mainMenu'){
			context.beginPath();
			context.fillStyle = '#8ac80b';
			context.font = "60px Arial";
			context.fillText('MAIN MENU', 130, 200);
			context.fill();

			for(var ms = 0; ms < this.menuSelections.length; ms++){
				this.menuSelections[ms].render();
			}
		}
		else if(this.state == 'play'){
			
		}
		else if(this.state == 'complete'){
			
		}
		else{
			console.log('invalid state detected');
		}

		//_____________________
		context.restore();
	}
}

class MenuSelection{
	constructor(_index, _name, _isActive, _x, _y){
		this.x = _x;
		this.y = _y;

		this.menuIndex = _index;
		this.name = _name;

		this.isActive = _isActive;

		this.bgWidth = 200;
		this.bgHeight = 50;

		this.textWidth = 160;

		this.activeScaleFactor = 1.1;

		this._textWidth;
	}

	activate = function(){
		if(!this.isActive)
			this.isActive = true;
	}

	deactivate = function(){
		if(this.isActive)
			this.isActive = false;
	}

	render = function(){

		context.save();

		//BG

		context.beginPath();
		

		if(!this.isActive){
			//NOT ACTIVE
			context.fillStyle = '#333';
			context.rect(this.x - (this.bgWidth /2), this.y - (this.bgHeight /2), this.bgWidth, this.bgHeight);
			context.fill();
		}
		else{
			//ACTIVE
			context.strokeStyle = '#555';
			context.rect(this.x - (this.bgWidth /2), this.y - (this.bgHeight /2), this.bgWidth * this.activeScaleFactor, this.bgHeight);
			context.stroke();

			context.beginPath();
			context.fillStyle = '#777';
			context.arc(this.x - (this.bgWidth /2) - 30, this.y, 8, 0, Math.PI *2);
			context.fill();
		}
		
		

		//TEXT

		context.beginPath();
		context.font = "50px Arial";
		
		if(!this.isActive){
			//NOT ACTIVE
			context.font = "30px Arial";
			context.fillStyle = '#555';
			context.fillText(this.name, this.x - (this.bgWidth /2) + 10, this.y + 12, this.textWidth);

		}
		else{
			//ACTIVE
			context.font = "40px Arial";
			context.fillStyle = '#777';
			context.fillText(this.name, this.x - (this.bgWidth /2) + 30, this.y + 15, this.textWidth * this.activeScaleFactor);
		}

		
		context.fill();

		context.restore();
	}

}