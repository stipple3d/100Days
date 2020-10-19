class EightDirHandler{
	constructor(){
		//hold all the registered keys that are pressed (in order)
		this.horDirHistory = [];
		this.vertDirHistory = [];

		this.registeredKeys = [];
		//flags are primarily to make sure keys are not registered more than once
		this.arrowsActive = false;
		this.wasdActive = false;
		//TODO: other directional keysets to support?

		//holder for results of findIndex tests on key release
		this._foundIndex = -1;

		//these flags are just to prevent repeats keep the array clean
		this.upArrowPressed = false;
		this.downArrowPressed = false;
		this.leftArrowPressed = false;
		this.rightArrowPressed = false;
		this.wPressed = false;
		this.aPressed = false;
		this.sPressed = false;
		this.dPressed = false;

		//event handlers for press and release
		document.onkeydown = (e) =>{
			/*if(e.repeat)
				return;*/
			/*if(this.registeredKeys.includes(e.key)){
				this.dirHistory.unshift(e.key);
			}	*/		

			if(this.registeredKeys.includes(e.key)){
				switch(e.key){
					case 'ArrowUp': 
						if(!this.upArrowPressed){
							this.upArrowPressed = true;
							this.vertDirHistory.unshift(e.key);
						}
					break;
					case 'ArrowDown': 
						if(!this.downArrowPressed){
							this.downArrowPressed = true;
							this.vertDirHistory.unshift(e.key);
						}
					break;
					case 'ArrowLeft': 
						if(!this.leftArrowPressed){
							this.leftArrowPressed = true;
							this.horDirHistory.unshift(e.key);
						}
					break;
					case 'ArrowRight': 
						if(!this.rightArrowPressed){
							this.rightArrowPressed = true;
							this.horDirHistory.unshift(e.key);
						}
					break;
					case 'w': 
						if(!this.wPressed){
							this.wPressed = true;
							this.vertDirHistory.unshift(e.key);
						}
					break;
					case 'a': 
						if(!this.aPressed){
							this.aPressed = true;
							this.horDirHistory.unshift(e.key);
						}
					break;
					case 's': 
						if(!this.sPressed){
							this.sPressed = true;
							this.vertDirHistory.unshift(e.key);
						}
					break;
					case 'd': 
						if(!this.dPressed){
							this.dPressed = true;
							this.horDirHistory.unshift(e.key);
						}
					break;
				}
			}
		};

		document.onkeyup = (e) =>{
			/*if(this.registeredKeys.includes(e.key)){
				//TODO: find index of matching item in dirHist array
				this._foundIndex = this.dirHistory.findIndex(key => key == e.key);
				//TODO: remove that index from array (if found)
				if(this._foundIndex != -1)
					this.dirHistory.splice(this._foundIndex, 1);
			}	*/

			var axis = '';

			if(this.registeredKeys.includes(e.key)){
				switch(e.key){
					case 'ArrowUp': 
						if(this.upArrowPressed){
							this.upArrowPressed = false;
							axis = 'v';
						}
					break;
					case 'ArrowDown': 
						if(this.downArrowPressed){
							this.downArrowPressed = false;
							axis = 'v';
						}
					break;
					case 'ArrowLeft': 
						if(this.leftArrowPressed){
							this.leftArrowPressed = false;
							axis = 'h';
						}
					break;
					case 'ArrowRight': 
						if(this.rightArrowPressed){
							this.rightArrowPressed = false;
							axis = 'h';
						}
					break;
					case 'w': 
						if(this.wPressed){
							this.wPressed = false;
							axis = 'v';
						}
					break;
					case 'a': 
						if(this.aPressed){
							this.aPressed = false;
							axis = 'h';
						}
					break;
					case 's': 
						if(this.sPressed){
							this.sPressed = false;
							axis = 'v';
						}
					break;
					case 'd': 
						if(this.dPressed){
							this.dPressed = false;
							axis = 'h';
						}
					break;
				}

				if(axis == 'h'){
					//TODO: find index of matching item in dirHist array
					this._foundIndex = this.horDirHistory.findIndex(key => key == e.key);
					//TODO: remove that index from array (if found)
					if(this._foundIndex != -1)
						this.horDirHistory.splice(this._foundIndex, 1);
				}
				else{
					//TODO: find index of matching item in dirHist array
					this._foundIndex = this.vertDirHistory.findIndex(key => key == e.key);
					//TODO: remove that index from array (if found)
					if(this._foundIndex != -1)
						this.vertDirHistory.splice(this._foundIndex, 1);
				}

				
			}
		};
	}

	getDirection = function(){
		//NO HOR OR VERT KEYS PRESSED
		if(this.horDirHistory.length == 0 && this.vertDirHistory.length == 0){
			return '';
		}
		//ONLY HOR KEY PRESSED
		else if(this.vertDirHistory.length == 0){
			switch(this.horDirHistory[0]){
				case 'w' : return 'n'; break;
				case 'a' : return 'w'; break;
				case 's' : return 's'; break;
				case 'd' : return 'e'; break;
				case 'ArrowUp' : return 'n'; break;
				case 'ArrowLeft' : return 'w'; break;
				case 'ArrowDown' : return 's'; break;
				case 'ArrowRight' : return 'e'; break;
			}
		}
		//ONLY VERT KEY PRESSED
		else if(this.horDirHistory.length == 0){
			switch(this.vertDirHistory[0]){
				case 'w' : return 'n'; break;
				case 'a' : return 'w'; break;
				case 's' : return 's'; break;
				case 'd' : return 'e'; break;
				case 'ArrowUp' : return 'n'; break;
				case 'ArrowLeft' : return 'w'; break;
				case 'ArrowDown' : return 's'; break;
				case 'ArrowRight' : return 'e'; break;
			}
		}
		//BOTH HOR AND VERT KEYS PRESSED
		else{
			if(this.vertDirHistory[0] == 'w' || this.vertDirHistory[0] == 'ArrowUp'){
				if(this.horDirHistory[0] == 'a' || this.horDirHistory[0] == 'ArrowLeft')
					return 'nw';
				else if(this.horDirHistory[0] == 'd' || this.horDirHistory[0] == 'ArrowRight')
					return 'ne';
			}
			else if(this.vertDirHistory[0] == 's' || this.vertDirHistory[0] == 'ArrowDown'){
				if(this.horDirHistory[0] == 'a' || this.horDirHistory[0] == 'ArrowLeft')
					return 'sw';
				else if(this.horDirHistory[0] == 'd' || this.horDirHistory[0] == 'ArrowRight')
					return 'se';
			}
		}
	}

	activateArrows = function(){
		if(!this.arrowsActive){
			this.arrowsActive = true;
			this.registeredKeys.push('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight');
		}
	}
	activateWASD = function(){
		if(!this.wasdActive){
			this.wasdActive = true;
			this.registeredKeys.push('w', 'a', 's', 'd');
		}
	}

	//TODO: deactivate methods (remove registered keys and flag false)
}