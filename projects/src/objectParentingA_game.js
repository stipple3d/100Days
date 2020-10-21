class Game{
	constructor(){

		this.clearOnRender = true;

		//all must extend the GameObject class
		this.controlObj = new Rect(10,10,canvas.width /2, canvas.height /2, 45 * Math.PI / 180, 10,1);

		this.nonParentedObjects = [];

		var obj;

		obj = new Circle(2,canvas.width /2, canvas.height /2);
		this.nonParentedObjects.push(obj);

		for(var deg = 0; deg <= 360; deg += 45){
			obj = new Circle(2, 30, 0, deg * Math.PI / 180);
			this.controlObj.addChild(obj);
		}
	}

	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		//console.log('game update');

		//change control object over time
		//this.controlObj.x += (Math.random() * 100 -50) * _deltaTime; 
		//this.controlObj.y += (Math.random() * 100 -50) * _deltaTime; 
		this.controlObj.rotation += ((Math.random() * 180) * _deltaTime) * Math.PI /180; 
		//this.controlObj.update(_deltaTime);

		for(var np = 0; np < this.nonParentedObjects.length; np++){
			this.nonParentedObjects[np].update(_deltaTime);
		}
	}

	render = () =>{
		//console.log('renderRunning');
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			context.clearRect(0, 0, canvas.width, canvas.height);
		}

		context.save();
		//_____________________
		//draw elements

		this.controlObj.draw();

		for(var np = 0; np < this.nonParentedObjects.length; np++){
			this.nonParentedObjects[np].draw();
		}

		//DEBUG TEXT

		/*context.beginPath();
		context.fillStyle = 'white';
		context.font = '20px Arial';
		context.fillText('CanvasMouseX: ' + this.input.canvasMouseX, 10,20);
		context.fillText('CanvasMouseY: ' + this.input.canvasMouseY, 10,50);*/

		//_____________________
		context.restore();
	}
}

//2D game object class with parenting ability
class GameObject{
	constructor(_x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1){
		this.x = _x;
		this.y = _y;
		this.rotation = _rot;
		this.sX = _sX;
		this.sY = _sY;

		this.children = [];
		this.parent = undefined;

		//TODO: ANCHOR LOCATION
	}

	/*update = (_deltaTime) =>{
		
	}

	render = () =>{
		
	}*/

	update = function(_deltaTime){
		
	}

	draw = function(){
		
	}

	drawChildren = function(){
		console.log('numChildren: ' + this.children.length);
		for(var c = 0; c < this.children.length; c++){
			this.children[c].draw();
		}
	}

	addChild = function(_go){
		this.children.push(_go);
		_go.setParent(this);
	}

	setParent = function(_go){
		this.parent = _go;
	}
}

class Circle extends GameObject{
	constructor(_radius, _x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1){
		//INHERTITED FROM GAME OBJECT
		/*this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.sX = 1;
		this.sY = 1;
		this.children = [];
		this.parent = undefined;*/
		super(_x, _y, _rot, _sX, _sY);


		//CIRCLE SPECIFIC 
		this.radius = _radius;


	}

	/*update = (_deltaTime) =>{
		
	}

	render = () =>{
		
	}*/

	update = function(_deltaTime){
		
	}

	draw = function(){

		context.save();
		context.beginPath();
		context.fillStyle = 'white';
		if(this.parent != undefined){
			context.translate(this.parent.x, this.parent.y);
			context.rotate(this.parent.rotation);
			context.scale(this.parent.sX, this.parent.sY);context.fillRect(this.x, this.y, this.width * this.sX, this.height * this.sY);
		}
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.scale(this.sX, this.sY);
		context.arc(0,0, this.radius, 0, Math.PI *2);
		context.fill();

		context.restore();

		this.drawChildren();

	}
}

class Rect extends GameObject{
	constructor(_w, _h, _x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1){
		//INHERTITED FROM GAME OBJECT
		/*this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.sX = 1;
		this.sY = 1;
		this.children = [];
		this.parent = undefined;*/
		super(_x, _y, _rot, _sX, _sY);


		//CIRCLE SPECIFIC 
		this.width = _w;
		this.height = _h;

	}

	/*update = (_deltaTime) =>{
		
	}

	render = () =>{
		
	}*/

	update = function(_deltaTime){
		
	}

	draw = function(){
		console.log('control rot: ' + this.rotation);
		context.save();
		context.beginPath();
		context.fillStyle = 'red';
		if(this.parent != undefined){
			context.translate(this.parent.x, this.parent.y);
			context.rotate(this.parent.rotation);
			context.scale(this.parent.sX, this.parent.sY);context.fillRect(this.x, this.y, this.width * this.sX, this.height * this.sY);
		}
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.scale(this.sX, this.sY);
		context.fillRect(0,0, this.width, this.height);
		context.restore();

		this.drawChildren();
	}
}