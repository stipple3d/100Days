class GridLines{
	constructor(worldGridX = 0, worldGridY = 0, hSpacing = 100, vSpacing = 100, lineColor = '#999', lineThickness = 0.05){
		this.x = worldGridX;
		this.y = worldGridY;
		this.hSpacing = hSpacing;
		this.vSpacing = vSpacing;
		this.lineColor = lineColor;
		this.lineThickness = lineThickness;
		this.vMin = 0;
		this.vMax = canvas.height;
		this.hMin = 0;
		this.hMax = canvas.width;
	}
	update = function(){

	}
	draw = function(){
		
		//draw starting vertical line at X pos
		this.verticalLineAt(this.x);

		//starting one hor spacing to the LEFT, draw lines to the LEFT until we are off the canvas
		var currentX = this.x - this.hSpacing;

		//draw lines to the left of the grid x pos until we are off the canvas
		while(currentX > 0){
			//draw a vertical line
			this.verticalLineAt(currentX);

			//subtract a spacing from the currentX
			currentX -= this.hSpacing;
		}

		//starting one hor spacing to the RIGHT, draw lines to the RIGHT until we are off the canvas
		currentX = this.x + this.hSpacing;

		//draw lines to the left of the grid x pos until we are off the canvas
		while(currentX < canvas.width){
			//draw a vertical line
			this.verticalLineAt(currentX);

			//add a spacing to the currentX
			currentX += this.hSpacing;
		}

		//draw starting vertical line at X pos
		this.horizontalLineAt(this.y);

		//starting one vert spacing ABOVE, draw lines ABOVE until we are off the canvas
		var currentY = this.y - this.vSpacing;

		//draw lines to the left of the grid x pos until we are off the canvas
		while(currentY > 0){
			//draw a horizontal line
			this.horizontalLineAt(currentY);

			//subtract a spacing from the currentY
			currentY -= this.vSpacing;
		}

		//starting one vert spacing BELOW, draw lines BELOW until we are off the canvas
		currentY = this.y + this.vSpacing;

		//draw lines to the left of the grid x pos until we are off the canvas
		while(currentY < canvas.height){
			//draw a horizontal line
			this.horizontalLineAt(currentY);

			//subtract a spacing from the currentY
			currentY += this.vSpacing;
		}

		
	}
	horizontalLineAt = function(vY){
		context.strokeStyle = this.lineColor;
		context.lineWidth = this.lineThickness;
		context.moveTo(this.hMin, vY);
		context.lineTo(this.hMax, vY);
		context.stroke();
	}
	verticalLineAt = function(hX){
		context.strokeStyle = this.lineColor;
		context.lineWidth = this.lineThickness;
		context.moveTo(hX, this.vMin);
		context.lineTo(hX, this.vMax);
		context.stroke();
	}
}