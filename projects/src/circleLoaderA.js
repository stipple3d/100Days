class CircleLoader extends Loader{
	constructor(_startingValue, _targetValue, _radius, _x = 0, _y = 0){
		super(_startingValue, _targetValue, _x, _y);

		//TODO: add start and end angles (for more options)

		//SUPER SETUP
		/*this.startingValue = _startingValue;
		this.targetValue = _targetValue;
		this.totalValueToLoad = this.targetValue - this.startingValue;
		this.currentValue = startingValue;
		this.valueRemainingToLoad = this.totalValueToLoad;
		this.percComplete = (this.currentValue - this.startingValue) / this.totalValueToLoad;
		this.loadingComplete = false;*/

		//EXTENDED CONSTRUCTOR VARS/SETUP
		this.radius = _radius;
		//this.minWidth = _minW;//not used currently TODO: use in progress width c
		//this.height = _h;
		this.x = _x;
		this.y = _y;

		//Defaults for lines/colors
		this.drawBgLine = false;
		this.bgLineThickness;
		this.bgLineColor;

		this.progressLineThickness = 1;
		this.progressLineColor = 'red';

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
		//this.progressWidth = this.maxWidth * this.percComplete;

		context.save();
		context.beginPath();
		context.font = "20px sans-serif";
		context.fillStyle = '#333';
		context.fillText(Math.floor(this.percComplete * 100) + ' %', this.x + this.radius + 15, this.y + 12);
		context.restore();

		//draw bg outline (if requested)
		if(this.drawBgLine){
			context.save();
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			context.strokeStyle = this.bgLineColor;
			context.lineWidth = this.bgLineThickness;
			context.stroke();
			context.restore();
		}
		

		//draw progress line (always)

		context.save();
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2) * this.percComplete);
		context.strokeStyle = this.progressLineColor;
		context.lineWidth = this.progressLineThickness;
		context.stroke();
		context.restore();
		
	}
	setProgressLineColor = function(_thickness, _color){
		this.progressLineThickness = _thickness;
		this.progressLineColor = _color;
	}
	setBgLine = function(_thickness, _color){
		this.drawBgLine = true;
		this.bgLineThickness = _thickness;
		this.bgLineColor = _color;
	}
}