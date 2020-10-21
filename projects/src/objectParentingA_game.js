class Game{
	constructor(){

		this.clearOnRender = true;

		//all must extend the GameObject class
		this.controlObj = new Rect({_w: 100, _h: 10, _x: canvas.width /2, _y: canvas.height /2, _rot: 0 * Math.PI / 180, _sX: 1, sY: 1});

		this.nonParentedObjects = [];

		var obj;
		var subObj;

		obj = new Circle({_radius: 2, _x: canvas.width /2, _y: canvas.height /2});
		this.nonParentedObjects.push(obj);

		obj = new Circle({_radius: 1, _x: 100});

		for(var deg = 0; deg < 360; deg += 45){
			subObj = new Circle({_radius: 2, _x: 30, _y: 0, _rot: deg * Math.PI / 180, _sX: 10});
			obj.addChild(subObj);
		}

		this.controlObj.addChild(obj);

		

	}


	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		//console.log('game update');

		//change control object over time
		//this.controlObj.x += (Math.random() * 100 -50) * _deltaTime; 
		//this.controlObj.y += (Math.random() * 100 -50) * _deltaTime; 

		//this.controlObj.rotation += (180 * _deltaTime) * Math.PI /180; 
		console.log(this.controlObj.children[0].rotation);
		this.controlObj.children[0].localRot += (90 * _deltaTime) * Math.PI /180; 
		this.controlObj.update(_deltaTime);

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

		this.controlObj.render();

		for(var np = 0; np < this.nonParentedObjects.length; np++){
			this.nonParentedObjects[np].render();
		}


		//testing cumulative drawing (rot/position)
		context.beginPath();
		context.strokeStyle = 'yellow';
		//context.moveTo(canvas.width /2, canvas.height /2);
		
		/*context.translate(canvas.width /2, canvas.height /2);
		context.moveTo(0, 0);
		context.lineTo(100, 0);
		context.translate(100,0);
		context.rotate(45 * Math.PI /180);
		context.moveTo(0, 0);
		context.lineTo(100, 0);
		context.translate(100,0);
		context.rotate(45 * Math.PI /180);
		context.moveTo(0, 0);
		context.lineTo(100, 0);
		context.stroke();*/

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
	constructor({_x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1} = {}){

		this.position = new Vector2D(_x, _y);
		//this.x = _x;
		//this.y = _y;
		this.rotation = _rot;
		this.scale = new Vector2D(_sX, _sY);
		//this.sX = _sX;
		//this.sY = _sY;

		//LOCAL 'relative' values (within the parent, if there is one)
		// (these do not change, unless explicitly modified, ie: they are not 
		//	updated as the parent moves, that is 'current/actual' values held
		//	in the main X/Y/ROT/SCALE values)

		//	(if there is no parent, these are not used?)

		//	(They are just the fallback of what the initial values were when the object was created)
		this.localPosition = new Vector2D(_x, _y);
		this.vectorDistance = Math.sqrt((_x * _x) + (_y * _y));
		
		//this.localX = _x;
		//this.localY = _y;
		this.localRot = _rot;
		this.localScale = new Vector2D(_sX, _sY);
		//this.localScaleX = _sX;
		//this.localScaleY = _sY;

		//TODO: anchor point
		//TODO: velocity X/Y
		//TODO: rotChange, scaleX/Y change (over time, auto updating)

		this.children = [];
		this.parent = undefined;

		//TODO: cumulative scale & rotation values from the chain of parents
		//		(each update, the object needs to have a cumulative scale and rotation 
		//			value that DOES NOT INCLUDE ITS VALUE)
		//		(it can then detrmine its current scale X/Y and current internal scale
		//		AND its X/Y relative to the parent (based on its rotation relative to the parent???))

		//TODO: test chains of rotation, translate, rotation, translate, etc to see how the X/Y coords might 
		//		be passed down the child chain?

		//FOLLOWING UPDATED DURING UPDATE (drawing is simple after that)
		//worldX worldY (actual world postion)
		//currentRot, currentScaleX, currentScaleY (parents scale/rot added to this objects')

	}

	update = function(_deltaTime){
		//CHANGE this object
		this.change(_deltaTime);
		//update children()
		for(var c = 0; c < this.children.length; c++){
			this.children[c].update(_deltaTime);
		}
	}

	render = function(){
		//draw this object
		this.draw();
		//render children
		for(var c = 0; c < this.children.length; c++){
			this.children[c].render();
		}
	}

	addChild = function(_go){
		this.children.push(_go);
		_go.setParent(this);
	}

	setParent = function(_go){
		this.parent = _go;
		console.log('pos(before): ' + this.position.x + ', ' + this.position.y);
		console.log('vectorDistance: ' + this.vectorDistance);
		console.log('parentRot: ' + this.parent.rotation);
		console.log('Parentpos(before): ' + this.parent.position.x + ', ' + this.parent.position.y);

		//set initial values relative to the parent object
		this.rotation = this.parent.rotation + this.localRot;

		this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.rotation);
		this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.rotation);
		console.log('pos(after): ' + this.position.x + ', ' + this.position.y);
		
		this.scale.x = this.parent.scale.x * this.localScale.x;
		this.scale.y = this.parent.scale.y * this.localScale.y;
	}

	//CHANGE and DRAW are implementation level methods
	//overwrite them to change/draw as needed
	change = function(_deltaTime){}
	draw = function(){}
}

class Circle extends GameObject{
	constructor({_radius, _x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1} = {}){
		
		super({_x, _y, _rot, _sX, _sY});

		//CIRCLE SPECIFIC 
		this.radius = _radius;


	}

	change = function(_deltaTime){
		if(this.parent != undefined){

			//calculate the X position
			// (parentX + localPosition.x @ parent's current rotation angle), same for Y
			this.rotation = this.parent.rotation + this.localRot;
			this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.rotation);
			this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.rotation);
			this.scale.x = this.parent.scale.x * this.localScale.x;
			this.scale.y = this.parent.scale.y * this.localScale.y;
		}
	}

	draw = function(){

		context.save();

		context.beginPath();
		context.fillStyle = 'white';

		/*if(this.parent != undefined){
			context.translate(this.parent.position.x, this.parent.position.y);
			context.rotate(this.parent.rotation);
			context.scale(this.parent.scale.x, this.parent.scale.y);
		}*/

/*
		if(this.parent != undefined){
			context.translate(this.position.x, this.position.y);
		}
		context.translate(this.localPosition.x, this.localPosition.y);*/

context.translate(this.position.x, this.position.y);

		context.rotate(this.rotation);
		context.scale(this.scale.x, this.scale.y);
		context.arc(0,0, this.radius, 0, Math.PI *2);
		context.fill();

		context.restore();

	}
}

class Rect extends GameObject{
	constructor({_w, _h, _x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1} = {}){

		super({_x, _y, _rot, _sX, _sY});

		//RECT SPECIFIC 
		this.width = _w;
		this.height = _h;
	}

	change = function(_deltaTime){
		if(this.parent != undefined){

			//calculate the X position
			// (parentX + localPosition.x @ parent's current rotation angle), same for Y
			this.rotation = this.parent.rotation + this.localRot;
			this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.rotation);
			this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.rotation);
			this.scale.x = this.parent.scale.x * this.localScale.x;
			this.scale.y = this.parent.scale.y * this.localScale.y;
		}
	}

	draw = function(){
		//console.log('control rot: ' + this.rotation);
		context.save();
		context.beginPath();
		context.fillStyle = 'red';

		/*if(this.parent != undefined){
			context.translate(this.parent.position.x, this.parent.position.y);
			context.rotate(this.parent.rotation);
			context.scale(this.parent.scale.x, this.parent.scale.y);
		}*/

	/*	if(this.parent != undefined){
			context.translate(this.position.x, this.position.y);
		}
		context.translate(this.localPosition.x, this.localPosition.y);*/

context.translate(this.position.x, this.position.y);


		context.rotate(this.rotation);
		context.scale(this.scale.x, this.scale.y);
		context.fillRect(0,0, this.width, this.height);
		context.restore();
	}
}