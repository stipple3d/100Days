class Loader{
	constructor(_startingValue, _targetValue){
		this.startingValue = _startingValue;
		this.targetValue = _targetValue;
		this.totalValueToLoad = this.targetValue - this.startingValue;
		this.currentValue = startingValue;
		this.valueRemainingToLoad = this.totalValueToLoad;
		this.percComplete = (this.currentValue - this.startingValue) / this.totalValueToLoad;
		this.loadingComplete = false;
	}
	updateValue = function(_currentValue){
		if(!this.loadingComplete){
			this.currentValue = _currentValue;
			this.valueRemainingToLoad = this.targetValue - this.currentValue;
			this.percComplete = (this.currentValue - this.startingValue) / this.totalValueToLoad;
			if(this.valueRemainingToLoad <= 0){
				//make sure current value is exactly the target (not overshooting)
				this.percComplete = 1;
				this.valueRemainingToLoad = 0;
				this.currentValue = this.targetValue;
				this.loadingComplete = true;
				//TODO: fire an event?
			}
		}
		//console.log(this.currentValue + ', ' + this.percComplete);
	}
	//override to specify drawing
	drawLoader = function(){

	}
}