class RaycastGameA{
	//TODO: create a base class for ALL games and extend this from that class
	//		(specifically to work with the 's3dGameLoop')
	constructor(){

		//canvas 600 x 600

		this.clearOnRender = true;
		
		this.boundaries = [];
		for(var b = 0; b < data.boundaries.length; b++){
			this.boundaries[b] = new Boundary(	data.boundaries[b].x1,
												data.boundaries[b].y1,
												data.boundaries[b].x2,
												data.boundaries[b].y2);
		}

		//.emitter;
		this.ray = new Ray(100, 300);

	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{

		
			
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


		//draw boundaries
		for(var b = 0; b < this.boundaries.length; b++){
			this.boundaries[b].draw();
		}

		this.ray.draw();

		//_____________________
		context.restore();
	}
}

class Boundary{
	constructor(_x1, _y1, _x2, _y2){
		this.a = new Vector2(_x1, _y1);
		this.b = new Vector2(_x2, _y2);
	}

	draw = function(){

		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		context.lineWidth = 1;


		//context.beginPath();
		context.moveTo(this.a.x, this.a.y);
		context.lineTo(this.b.x, this.b.y);
		context.stroke();

		context.beginPath();
		context.arc(this.a.x, this.a.y, 4, 0, Math.PI *2);
		context.fill();

		context.beginPath();
		context.arc(this.b.x, this.b.y, 4, 0, Math.PI *2);
		context.fill();
	}
}

class Vector2{
	constructor(_x, _y){
		this.x = _x;
		this.y = _y;
	}
}

class Ray{
	constructor(_x, _y){
		this.pos = new Vector2(_x, _y);
		this.dir = new Vector2(1,0);
		this.mag = 100;
	}

	cast = function(_boundary){
		//TODO: formula to determine if the ray intersects the boundary
		//			1) YES or NO
		//			2) if so, what is the point of intersection
	}

	draw = function(){

		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		context.lineWidth = 1;

		//context.beginPath();
		context.moveTo(this.pos.x, this.pos.y);
		context.lineTo(this.pos.x + (this.dir.x * this.mag), this.pos.y + (this.dir.y * this.mag));
		context.stroke();

		context.beginPath();
		context.arc(this.pos.x, this.pos.y, 4, 0, Math.PI *2);
		context.fill();
	}
}

const data = {


boundaries: [
//{x1: 100, y1: 100, x2: 300, y2: 100},
//{x1: 300, y1: 300, x2: 500, y2: 100},
//{x1: 100, y1: 350, x2: 300, y2: 550},
{x1: 500, y1: 100, x2: 500, y2: 500}
]


};