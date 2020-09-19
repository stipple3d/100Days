class BarLoader extends Loader{
	constructor(_startingValue, _targetValue, _maxW, _h, _minW = 0, _x = 0, _y = 0){
		super(_startingValue, _targetValue, _x, _y);

		//SUPER SETUP
		/*this.startingValue = _startingValue;
		this.targetValue = _targetValue;
		this.totalValueToLoad = this.targetValue - this.startingValue;
		this.currentValue = startingValue;
		this.valueRemainingToLoad = this.totalValueToLoad;
		this.percComplete = (this.currentValue - this.startingValue) / this.totalValueToLoad;
		this.loadingComplete = false;*/

		//EXTENDED CONSTRUCTOR VARS/SETUP
		this.maxWidth = _maxW;
		this.minWidth = _minW;//not used currently TODO: use in progress width c
		this.height = _h;
		this.x = _x;
		this.y = _y;

		//Defaults for lines/colors
		this.drawBgLine = false;
		this.bgLineThickness;
		this.bgLineColor;

		this.drawProgressLine = false;
		this.progressLineThickness;
		this.progressLineColor;

		this.drawBgFill = false;
		this.bgColor;

		//progress fill is always drawn (only mandatory visual)
		this.progressColor = 'red';

		this.progressWidth;

		//TODO: opacity options?

		//TODO: add padding inside of the BG 
		//		(this will add a possible line around the "target" in addition to the outer "bg" border line)
	}
	/*updateLoader = function(_currentValue){
		//super will update all values based on new value and mark loading as complete if appropriate
		updateValue(_currentValue);

		//ADDITIONAL PROCESSING
		

		console.log('progressWidth: ', this.progressWidth);

	}*/
	drawLoader = function(){

		//calculate progress width
		this.progressWidth = this.maxWidth * this.percComplete;

		context.save();
		context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#333';
		context.fillText(Math.floor(this.percComplete * 100) + ' %', this.x + this.maxWidth + 15, this.y + 12);
		context.restore();
		//context.fillText("pos: " + this.x + ', ' + this.y, 200, 80);
		//context.fillText(this.valueRemainingToLoad + ' / ' + this.totalValueToLoad, 200, 110);
		//context.fillText("progressWidth: " + this.progressWidth, 200, 140);
		//context.fillText("progressColor: " + this.progressColor, 200, 170);

		/*if(!this.drawProgressLine && !this.drawBgFill && !this.drawBgLine){

			context.fillText("only bg", 200, 200);
		}*/


		//draw BG FILL (if requested)
		if(this.drawBgFill){
			context.save();
			context.beginPath();
			context.rect(this.x, this.y, this.maxWidth, this.height);
			context.fillStyle = this.bgColor;
			context.fill();
			context.restore();
		}

		//draw progress bar

		context.save();
		context.beginPath();

		//define progress rect
		context.rect(this.x, this.y, this.progressWidth, this.height);

		//define  & stroke line (if requested)
		if(this.drawProgressLine){
			context.strokeStyle = this.progressLineColor;
			context.lineWidth = this.progressLineThickness;
			context.stroke();
		}

		//always fill progress rect (required)
		context.fillStyle = this.progressColor;
		context.fill();		
		context.restore();

		//draw bg outline (if requested)
		context.save();
		context.beginPath();
		context.rect(this.x, this.y, this.maxWidth, this.height);
		context.strokeStyle = this.bgLineColor;
		context.lineWidth = this.bgLineThickness;
		context.stroke();
		context.restore();

	}
	setProgressLine = function(_thickness, _color){
		this.drawProgressLine = true;
		this.progressLineThickness = _thickness;
		this.progressLineColor = _color;
	}
	setBgLine = function(_thickness, _color){
		this.drawBgLine = true;
		this.bgLineThickness = _thickness;
		this.bgLineColor = _color;
	}
	setProgressColor = function(_color){
		this.progressColor = _color;
	}
	setBgColor = function(_color){
		this.drawBgFill = true;
		this.bgColor = _color;
	}
}