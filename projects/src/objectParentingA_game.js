class Game{
	constructor(){

		//- objects that are not parented to any other object:
		//		- positioned relative ot the canvas (TL corner)
		//		- rotation is in the context rotation (set in draw for the object)
		//		- scale is in the context scale (set in draw for the object)

		//- objects that are parented to another object:
		//		- axis are rotated to match the parent object
		//		- positioning is relative to the parent's origin, assuming the rotation was flattened back to normal
		//		- scale will be cumulative (objects scale factors will be multiplied with those above it in the tree)

		this.clearOnRender = true;

		//all must extend the GameObject class
		this.controlObj = new Rect({_w: 100, _h: 10, _x: canvas.width /2, _y: canvas.height /2, _rot: 0 * Math.PI / 180});

		this.nonParentedObjects = [];

		var obj;
		var subObj;

		//center marker (stationary)
		obj = new Circle({_radius: 2, _x: canvas.width /2, _y: canvas.height /2});
		this.nonParentedObjects.push(obj);

		//this is basically an empty container (just showing a tiny dot)
		//	to hold a ring of other circles around it
		obj = new Circle({_radius: 1, _x: 100});

		//setting a distance from center that the ring should be
		var distFromCenter = 30;

		//holders for the calculated X/Y RELATIVE positions of each ring element
		var ringX, ringY;

		//loop through 8 equal directions around the point
		for(var deg = 0; deg < 360; deg += 45){
			console.log('deg: ' + deg);

			//calculate the X/Y positions RELATIVE to the center of the ring
			//(this will be the LOCAL position and will be added to the parent once they are child-ed)
			ringX = distFromCenter * Math.cos(deg * Math.PI /180);
			ringY = distFromCenter * Math.sin(deg * Math.PI /180);
			console.log('ringPos: ' + ringX + ', ' + ringY);

			//create the object
			subObj = new Circle({_radius: 2, _x: ringX, _y: ringY, _rot: deg * Math.PI /180, _sX: 1});
			console.log(subObj);
			//add it to the empty
			obj.addChild(subObj);
		}


			//TESTING
			/*var deg = 90;

			//calculate the X/Y positions RELATIVE to the center of the ring
			//(this will be the LOCAL position and will be added to the parent once they are child-ed)
			ringX = distFromCenter * Math.cos(deg * Math.PI /180);
			ringY = distFromCenter * Math.sin(deg * Math.PI /180);
			console.log('ringPos: ' + ringX + ', ' + ringY);

			//create the object
			subObj = new Circle({_radius: 2, _x: ringX, _y: ringY, _rot: deg * Math.PI /180, _sX: 1});
			console.log(subObj);
			//add it to the empty
			obj.addChild(subObj);*/




		console.log('empty children: ' + obj.children.length);

		this.controlObj.addChild(obj);

		

	}


	//NOTE: delta time is coming from the game loop
	update = (_deltaTime) =>{
		//console.log('game update');

		//change control object over time
		//this.controlObj.x += (Math.random() * 100 -50) * _deltaTime; 
		//this.controlObj.y += (Math.random() * 100 -50) * _deltaTime; 

this.controlObj.rotate(  (90 * _deltaTime) * Math.PI /180  ); 

		//console.log(this.controlObj.children[0].rotation);

this.controlObj.children[0].rotate(   (90 * _deltaTime) * Math.PI /180   ); 

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
		
		//DEBUG TEXT

		context.beginPath();
		context.fillStyle = 'white';
		context.font = '12px Arial';
		context.fillText('Control Obj Pos: ' + Math.round(this.controlObj.position.x) + ', ' + Math.round(this.controlObj.position.y), 10,20);
		context.fillText('Control Obj Scale: ' + Math.round(this.controlObj.scale.x) + ', ' + Math.round(this.controlObj.scale.y), 10,40);
		context.fillText('Control Obj Rot: ' + Math.round(this.controlObj.rotation), 10,60);
		context.fillText('Control Obj LOCAL Pos: ' + Math.round(this.controlObj.localPosition.x) + ', ' + Math.round(this.controlObj.localPosition.y), 10,80);
		context.fillText('Control Obj LOCAL Scale: ' + Math.round(this.controlObj.localScale.x) + ', ' + Math.round(this.controlObj.localScale.y), 10,100);
		context.fillText('Control Obj LOCAL Rot: ' + Math.round(this.controlObj.localRotation), 10,120);
		context.fillText('Control Obj DISTANCE VECTOR: ' + Math.round(this.controlObj.vectorDistance), 10,140);

		context.fillText('empty Pos: ' + Math.round(this.controlObj.children[0].position.x) + ', ' + Math.round(this.controlObj.children[0].position.y), 10,canvas.height - 140);
		context.fillText('empty Scale: ' + Math.round(this.controlObj.children[0].scale.x) + ', ' + Math.round(this.controlObj.children[0].scale.y), 10,canvas.height - 120);
		context.fillText('empty Rot: ' + Math.round(this.controlObj.children[0].rotation), 10,canvas.height - 100);
		context.fillText('empty LOCAL Pos: ' + Math.round(this.controlObj.children[0].localPosition.x) + ', ' + Math.round(this.controlObj.children[0].localPosition.y), 10,canvas.height - 80);
		context.fillText('empty LOCAL Scale: ' + Math.round(this.controlObj.children[0].localScale.x) + ', ' + Math.round(this.controlObj.children[0].localScale.y), 10,canvas.height - 60);
		context.fillText('empty LOCAL Rot: ' + Math.round(this.controlObj.children[0].localRotation), 10,canvas.height - 40);
		context.fillText('empty DISTANCE VECTOR: ' + Math.round(this.controlObj.children[0].vectorDistance), 10,canvas.height - 20);

		context.fillText('firstRing Pos: ' + Math.round(this.controlObj.children[0].children[1].position.x) + ', ' + Math.round(this.controlObj.children[0].children[1].position.y), canvas.width /2, canvas.height - 140);
		context.fillText('firstRing Scale: ' + Math.round(this.controlObj.children[0].children[1].scale.x) + ', ' + Math.round(this.controlObj.children[0].children[1].scale.y), canvas.width /2,canvas.height - 120);
		context.fillText('firstRing Rot: ' + Math.round(this.controlObj.children[0].children[1].rotation), canvas.width /2,canvas.height - 100);
		context.fillText('firstRing LOCAL Pos: ' + Math.round(this.controlObj.children[0].children[1].localPosition.x) + ', ' + Math.round(this.controlObj.children[0].children[1].localPosition.y), canvas.width /2,canvas.height - 80);
		context.fillText('firstRing LOCAL Scale: ' + Math.round(this.controlObj.children[0].children[1].localScale.x) + ', ' + Math.round(this.controlObj.children[0].children[1].localScale.y), canvas.width /2,canvas.height - 60);
		context.fillText('firstRing LOCAL Rot: ' + Math.round(this.controlObj.children[0].children[1].localRotation), canvas.width /2,canvas.height - 40);
		context.fillText('firstRing DISTANCE VECTOR: ' + Math.round(this.controlObj.children[0].children[1].vectorDistance), canvas.width /2,canvas.height - 20);
		

		//_____________________
		context.restore();
	}
}

//2D game object class with parenting ability
class GameObject{
	constructor({_x = 0, _y = 0, _rot = 0, _sX = 1, _sY = 1} = {}){

		//actual calculated canvas position
		this.position = new Vector2D(_x, _y);
		//current cumulative rotation
		this.rotation = _rot;
		//current cumulative scale factor
		this.scale = new Vector2D(_sX, _sY);

		//These are the values we want the object to have relative to the parent (if there is one)
		//position within the world or the parent	
		this.localPosition = new Vector2D(_x, _y);
		//distance of the local Position vector (for use in finding rotated position)
		//TODO: recalc this if the local position is changed
		this.vectorDistance = Math.sqrt((_x * _x) + (_y * _y));
		//rotation change within the parent (or in the world if not)
		this.localRotation = _rot;
		//additional scale factor to be multiplied with any coming from parents
		this.localScale = new Vector2D(_sX, _sY);

		//TODO: anchor point
		//TODO: velocity X/Y
		//TODO: rotChange, scaleX/Y change (over time, auto updating)

		this.children = [];
		this.parent = undefined;

		//LOCAL 'relative' values (within the parent, if there is one)
		// (these do not change, unless explicitly modified, ie: they are not 
		//	updated as the parent moves, that is 'current/actual' values held
		//	in the main X/Y/ROT/SCALE values)

		//	(if there is no parent, these are not used?)

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
		console.log('GO adding child');
		this.children.push(_go);
		_go.setParent(this);
	}

	setParent = function(_go){
		//set parent
		this.parent = _go;
		//run function to update calculations
		this.updateCalcs();
	}

	rotate = function(_rads){
		if(this.parent != undefined){
			this.localRotation += _rads;
			this.rotation = this.parent.rotation + this.localRotation;
		}
		else{
			this.localRotation += _rads;
			this.rotation = this.localRotation;
		}
	}

	updateCalcs = function(){
		//console.log('pos(before): ' + this.position.x + ', ' + this.position.y);
		//console.log('vectorDistance: ' + this.vectorDistance);
		//console.log('parentRot: ' + this.parent.rotation);
		//console.log('Parentpos(before): ' + this.parent.position.x + ', ' + this.parent.position.y);
		

		//*****************************************
		//FIXME: Somehwere in here or in the drawing for the shapes, the secondary angle/distance offset
		//			is being lost. Possibly because we don't want to add it to the position/rotation for
		//			positioning or it adds the relative position twice. We do want to add it for the drawing
		//			in the 2nd step? Just guessing...

		//			also possible I am translating to the wrong center (one parent back in the stack)
		//			to draw???
		//*****************************************


		//first find this object's position relative to the parent's position in the PARENT'S coord system
		this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.parent.rotation);
		this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.parent.rotation);
		//console.log('pos(after): ' + this.position.x + ', ' + this.position.y);

		//then, add this objects local rotation to the parent's rotation
		//(this then acts as this object's coord system, if it has children)
		this.rotation = this.parent.rotation + this.localRotation;
		
		//factor the local scale with the parent's scale factor
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

			this.updateCalcs();

			//calculate the X position
			// (parentX + localPosition.x @ parent's current rotation angle), same for Y


			/*this.rotation = this.parent.rotation + this.localRotation;
			this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.rotation);
			this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.rotation);
			this.scale.x = this.parent.scale.x * this.localScale.x;
			this.scale.y = this.parent.scale.y * this.localScale.y;*/
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

			this.updateCalcs();

			//calculate the X position
			// (parentX + localPosition.x @ parent's current rotation angle), same for Y


			/*this.rotation = this.parent.rotation + this.localRotation;
			this.position.x = this.parent.position.x + this.vectorDistance * Math.cos(this.rotation);
			this.position.y = this.parent.position.y + this.vectorDistance * Math.sin(this.rotation);
			this.scale.x = this.parent.scale.x * this.localScale.x;
			this.scale.y = this.parent.scale.y * this.localScale.y;*/
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