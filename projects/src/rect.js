class Rect{
	constructor(width = 10, height = 10, xPos = 0, yPos = 0, fillColor = 'grey', strokeColor = 'grey', lineThickness = 1, cornerRadius = 0, evenCorners = true){
		this.x = xPos;
		this.y = yPos;
		this.width = width;
		this.height = height;
		this.cornerRadius = cornerRadius;
		this.evenCorners = evenCorners;
		this.fillColor = fillColor;
		this.strokeColor = strokeColor;
		this.lineThickness = lineThickness;
	}
	update = function(){

	}
	draw = function(){
		if(this.evenCorners && this.cornerRadius <= 0){
			//no rounded corners, draw a regular rect
			context.fillStyle = this.fillColor;
			context.strokeStyle = this.strokeColor;
			context.lineWidth = this.lineThickness;
			context.beginPath();
			context.moveTo(this.x, this.y);
			context.lineTo(this.x + this.width, this.y);
			context.lineTo(this.x + this.width, this.y + this.height);
			context.lineTo(this.x, this.y + this.height);
			context.closePath();
			context.fill();
			context.stroke();
		}
		else if(this.evenCorners){
			
			//even rounded corners, draw a regular rect with even rounded corners
			context.fillStyle = this.fillColor;
			context.strokeStyle = this.strokeColor;
			context.lineWidth = this.lineThickness;
			context.beginPath();
			//move to start of the top line
			context.moveTo(this.x, this.y + this.cornerRadius);
			context.arc(this.x + this.cornerRadius, this.y + this.cornerRadius, this.cornerRadius, Math.PI, 1.5 * Math.PI);
			context.lineTo(this.x + this.width - this.cornerRadius, this.y);
			context.arc(this.x + this.width - this.cornerRadius, this.y + this.cornerRadius, this.cornerRadius, 1.5 * Math.PI, 0);
			context.lineTo(this.x + this.width, this.y + this.height - this.cornerRadius);
			context.arc(this.x + this.width - this.cornerRadius, this.y + this.height - this.cornerRadius, this.cornerRadius, 0, 0.5 * Math.PI);
			context.lineTo(this.x + this.cornerRadius, this.y + this.height);
			context.arc(this.x + this.cornerRadius, this.y + this.height - this.cornerRadius, this.cornerRadius, 0.5 * Math.PI, Math.PI);
			
			context.closePath();
			context.fill();
			context.stroke();		
		}

		/*context.beginPath();
		.fillStyle = cGrd;
		context.arc(300, 300, 100, 0, 2 * Math.PI);
		context.fill();
		context.stroke();
		context.closePath();*/
	}
}