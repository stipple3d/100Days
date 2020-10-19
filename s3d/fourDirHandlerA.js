class FourDirHandler{
	constructor(){
		//hold all the registered keys that are pressed (in order)
		this.dirHistory = [];

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
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'ArrowDown': 
						if(!this.downArrowPressed){
							this.downArrowPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'ArrowLeft': 
						if(!this.leftArrowPressed){
							this.leftArrowPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'ArrowRight': 
						if(!this.rightArrowPressed){
							this.rightArrowPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'w': 
						if(!this.wPressed){
							this.wPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'a': 
						if(!this.aPressed){
							this.aPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 's': 
						if(!this.sPressed){
							this.sPressed = true;
							this.dirHistory.unshift(e.key);
						}
					break;
					case 'd': 
						if(!this.dPressed){
							this.dPressed = true;
							this.dirHistory.unshift(e.key);
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

			if(this.registeredKeys.includes(e.key)){
				switch(e.key){
					case 'ArrowUp': 
						if(this.upArrowPressed){
							this.upArrowPressed = false;
						}
					break;
					case 'ArrowDown': 
						if(this.downArrowPressed){
							this.downArrowPressed = false;
						}
					break;
					case 'ArrowLeft': 
						if(this.leftArrowPressed){
							this.leftArrowPressed = false;
						}
					break;
					case 'ArrowRight': 
						if(this.rightArrowPressed){
							this.rightArrowPressed = false;
						}
					break;
					case 'w': 
						if(this.wPressed){
							this.wPressed = false;
						}
					break;
					case 'a': 
						if(this.aPressed){
							this.aPressed = false;
						}
					break;
					case 's': 
						if(this.sPressed){
							this.sPressed = false;
						}
					break;
					case 'd': 
						if(this.dPressed){
							this.dPressed = false;
						}
					break;
				}

				//TODO: find index of matching item in dirHist array
				this._foundIndex = this.dirHistory.findIndex(key => key == e.key);
				//TODO: remove that index from array (if found)
				if(this._foundIndex != -1)
					this.dirHistory.splice(this._foundIndex, 1);
			}
		};
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