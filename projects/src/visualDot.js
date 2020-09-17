class visualDot{
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.radius = r;
	}
	draw = function(){
		context.beginPath();
		//context.fillStyle = 'white';
		context.strokeStyle = 'grey';
		context.lineWidth = 2;
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		//context.fill();
		context.stroke();
		context.closePath();
	}
}
