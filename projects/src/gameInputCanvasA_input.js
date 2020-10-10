class CanvasGameInputA{
	constructor(){

		//****** BUTTONS
		this.activeBtns = [];

		//****** PADS
		this.activePads = [];

		//****** STICKS
		this.activeSticks = [];

		//****** EVENTS

		//TODO: consider listener on the document/window mouseMove (also?)
		//		(if the mouse/touch leaves the canvas we will lose control,
		//			and then pick it back up on return. Might be better if 
		//			drags we tracked anywhere and constrained?)
		canvas.onmousemove = this.handleCanvasMouseMove;
		canvas.onmousedown = this.handleCanvasMouseDown;
		document.onmouseup = this.handleDocMouseUp;

		//we only track and pass the on the mouse position if we are in the middle of a 
		//drag or other similar event
		this.trackingMouse = false;
		//these are the objects that have requested updates on mouseMove
		this.trackingRequests = [];

		this.canvasMouseX = undefined;
		this.canvasMouseY = undefined;

		

	}

	handleCanvasMouseMove = (e) =>{
		
		this.canvasMouseX = event.offsetX;
		this.canvasMouseY = event.offsetY;
	}

	handleCanvasMouseDown = (e) =>{
		for(var b = 0; b < this.activeBtns.length; b++){
			this.activeBtns[b].registerNewMouseDown(this.canvasMouseX, this.canvasMouseY);
		}
		for(var p = 0; p < this.activePads.length; p++){
			this.activePads[p].registerNewMouseDown(this.canvasMouseX, this.canvasMouseY);
		}
		for(var s = 0; s < this.activeSticks.length; s++){
			this.activeSticks[s].registerNewMouseDown(this.canvasMouseX, this.canvasMouseY);
		}
	}

	handleDocMouseUp = (e) =>{
		for(var b = 0; b < this.activeBtns.length; b++){
			this.activeBtns[b].registerMouseUp();
		}
		for(var p = 0; p < this.activePads.length; p++){
			this.activePads[p].registerMouseUp();
		}
		for(var s = 0; s < this.activeSticks.length; s++){
			this.activeSticks[s].registerMouseUp();
		}
	}

	update = function(){

		//TODO: is there any reason to be updating all the time, or 
		//		should this just be mouseMove? 

		for(var b = 0; b < this.activeBtns.length; b++){
			this.activeBtns[b].update();
		}
		for(var p = 0; p < this.activePads.length; p++){
			this.activePads[p].update();
		}
		for(var s = 0; s < this.activeSticks.length; s++){
			this.activeSticks[s].update();
		}
	}

	render = function(){
		for(var b = 0; b < this.activeBtns.length; b++){
			this.activeBtns[b].render();
		}
		for(var p = 0; p < this.activePads.length; p++){
			this.activePads[p].render();
		}
		for(var s = 0; s < this.activeSticks.length; s++){
			this.activeSticks[s].render();
		}
	}

	addButton = function(_id, _cb){

		var btn;

		switch(_id){
			case 'A' :
				btn = new InputButton(_id, canvas.width - 220, canvas.height - 120, 100, 100);
			break;
			case 'B' :
				btn = new InputButton(_id, canvas.width - 120, canvas.height - 170, 100, 100);
			break;
			case 'C' :
				btn = new InputButton(_id, canvas.width - 320, canvas.height - 170, 100, 100);
			break;
			case 'D' :
				btn = new InputButton(_id, canvas.width - 220, canvas.height - 220, 100, 100);
			break;
		}

		this.activeBtns.push(btn);
		btn.activateButton();//TODO: pass in the callback(s) for the button

	}

	getButtonDown = function(_id){

	}

	addPad = function(_id){
		
	}

	getPadDirection = function(){

	}

	getPadX = function(){
		
	}
	getPadY = function(){
		
	}

	addStick = function(_id){
		var stick;

		switch(_id){
			case 'L' :
				stick = new InputStick(_id, 160, canvas.height - 160, 100, 40);
			break;
			case 'R' :
				stick = new InputStick(_id, canvas.width - 160, canvas.height - 160, 200, 80);
			break;
		}

		this.activeSticks.push(stick);
		stick.activateStick();//TODO: pass in the callback(s) for the button
	}

	getStickDirection = function(){
		
	}

	getStickX = function(){
		
	}
	getStickY = function(){
		
	}

	
}

class InputButton{
	constructor(_ID = 'A', _x = 0, _y = 0, _w = 100, _h = 100){

		this.x = _x;
		this.y = _y;

		this.w = _w;
		this.h = _h;

		//COLORS
		//S#D GREEN : 8ac80b
		//LIGHTER : ABED26
		//DARKER : 4e7401

		this.bgFillColor = '';
		this.bgLineColor = '#555';
		this.buttonFillColor = '#8ac80b';
		this.buttonLineColor = '#4e7401';
		this.textFilLColor = '#4e7401';

		this.ID = _ID;

		this.pressed = false;

		this.cb_onPress;
		this.cb_onRelease;

		this.active = false;

	}

	registerNewMouseDown = function(_x, _y){
		if(_x >= this.x && _x <= this.x + this.w &&
			_y >= this.y && _y <= this.y + this.h){
			this.pressed = true;
		}
	}

	registerMouseUp = function(){
		if(this.pressed){
			this.pressed = false;
		}
	}

	update = function(){

	}

	render = function(){

		if(!this.active)
			return;
		
		context.save();
		//_____________________
		//draw elements

		//BG
		if(this.bgFillColor != ''){
			if(this.bgLineColor != ''){
				//FILL and LINE
				context.beginPath();
				context.fillStyle = this.bgFillColor;
				context.strokeStyle = this.bgLineColor;
				context.setLineDash([10, 10]);
				context.rect(this.x,this.y,this.w,this.h);
				context.fill();
				context.stroke();
			}
			else{
				//FILL ONLY
				context.beginPath();
				context.fillStyle = this.bgFillColor;
				context.rect(this.x,this.y,this.w,this.h);
				context.fill();
			}
		}
		else if(this.bgLineColor != ''){
			//LINE ONLY
			context.beginPath();
			context.strokeStyle = this.bgLineColor;
			context.setLineDash([10, 10]);
			context.rect(this.x,this.y,this.w,this.h);
			context.stroke();
		}

		//remove dashes from linestyle
		context.setLineDash([]);

		//BUTTON
		if(this.buttonFillColor != ''){
			if(this.buttonLineColor != ''){
				//FILL and LINE
				context.beginPath();
				context.fillStyle = this.buttonFillColor;
				context.strokeStyle = this.buttonLineColor;
				context.arc(this.x + this.w /2,this.y + this.h /2,this.w /4,0, Math.PI *2);
				context.fill();
				context.stroke();
			}
			else{
				//FILL ONLY
				context.beginPath();
				context.fillStyle = this.buttonFillColor;
				context.arc(this.x + this.w /2,this.y + this.h /2,this.w /4,0, Math.PI *2);
				context.fill();
			}
		}
		else if(this.bgLineColor != ''){
			//LINE ONLY
			context.beginPath();
			context.strokeStyle = this.buttonLineColor;
			context.arc(this.x + this.w /2,this.y + this.h /2,this.w /4,0, Math.PI *2);
			context.stroke();
		}

		//BUTTON TEXT
		if(this.textFilLColor != ""){
			context.beginPath();
			context.fillStyle = this.textFilLColor;
			context.font = (this.w /3) + "px Arial";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(this.ID, this.x + this.w /2, this.y + this.h /2);
			
		}

		if(this.pressed){
			context.beginPath();
			context.fillStyle = 'white';
			context.font = "20px Arial";
			context.textAlign = "left";
			context.textBaseline = "top";
			if(this.ID == 'A')
				context.fillText(this.ID + ' BUTTON DOWN', canvas.width /2, canvas.height /2);
			if(this.ID == 'B')
				context.fillText(this.ID + ' BUTTON DOWN', canvas.width /2, canvas.height /2 + 30);
			if(this.ID == 'C')
				context.fillText(this.ID + ' BUTTON DOWN', canvas.width /2, canvas.height /2 + 60);
			if(this.ID == 'D')
				context.fillText(this.ID + ' BUTTON DOWN', canvas.width /2, canvas.height /2 + 90);
		}

		//_____________________
		context.restore();
	}

	activateButton = function(_cbPress = undefined, _cbRelease = undefined){

		this.cb_onPress = _cbPress;
		this.cb_onRelease = _cbRelease;
		this.active = true;
	}
}

class InputStick{
	constructor(_ID = 'L', _x = 0, _y = 0, _bgR = 200, _stickR = 100){

		this.x = _x;
		this.y = _y;

		this.bgRadius = _bgR;
		this.stickRadius = _stickR;

		//COLORS
		//S#D GREEN : 8ac80b
		//LIGHTER : ABED26
		//DARKER : 4e7401

		this.bgFillColor = '';
		this.bgLineColor = '#555';
		this.stickFillColor = '#8ac80b';
		this.stickLineColor = '#4e7401';

		this.ID = _ID;

		this.dragging = false;

		this.cb_onPress;
		this.cb_onRelease;

		this.active = false;

		this.stickX = this.x;
		this.stickY = this.y;

		this.stickDistFromCenter;

		this.stickAngle;


	}

	registerNewMouseDown = function(_x, _y){
		//TODO: if we are already dragging....???

		var distX = _x - this.x;
		var distY = _y - this.y;
		/*var distX = this.x - _x;
		var distY = this.y - _y;*/

		this.stickDistFromCenter = Math.sqrt((distX * distX) + (distY * distY));

		this.stickAngle = Math.atan2(distY, distX);

		if(this.stickDistFromCenter <= this.stickRadius){
			this.stickX = _x;
			this.stickY = _y;
			this.dragging = true;
		}
	}

	registerMouseUp = function(){
		if(this.dragging){
			this.stickX = this.x;
			this.stickY = this.y;
			this.stickDistFromCenter = 0;
			this.dragging = false;
		}
	}

	update = function(){

		if(this.dragging){
			var curX = game.input.canvasMouseX;
			var curY = game.input.canvasMouseY;
			var distX = curX - this.x;
			var distY = curY - this.y;
			/*var distX = this.x - curX;
			var distY = this.y - curY;*/

			this.stickDistFromCenter = Math.sqrt((distX * distX) + (distY * distY));

			this.stickAngle = Math.atan2(distY, distX);


			if(this.stickDistFromCenter <= this.bgRadius){
				this.stickX = curX;
				this.stickY = curY;
			}
			else{

				//CONSTRAIN POSITION OF THE STICK TO MAX DIST IN CURRENT ANGLE
				//(multiply x/y differences by the perc ratio to normalize to amx distance)
				distX *= this.bgRadius / this.stickDistFromCenter;
				distY *= this.bgRadius / this.stickDistFromCenter;

				this.stickX = this.x + distX;
				this.stickY = this.y + distY;

				//CONSTRAIN DISTANCE TO MAX AND 
				this.stickDistFromCenter = this.bgRadius;
			}
		}

	}

	render = function(){

		if(!this.active)
			return;
		
		context.save();
		//_____________________
		//draw elements

		//BG
		if(this.bgFillColor != ''){
			if(this.bgLineColor != ''){
				//FILL and LINE
				context.beginPath();
				context.fillStyle = this.bgFillColor;
				context.strokeStyle = this.bgLineColor;
				context.setLineDash([10, 10]);
				context.arc(this.x,this.y,this.bgRadius,0, Math.PI * 2);
				context.fill();
				context.stroke();
			}
			else{
				//FILL ONLY
				context.beginPath();
				context.fillStyle = this.bgFillColor;
				context.arc(this.x,this.y,this.bgRadius,0, Math.PI * 2);
				context.fill();
			}
		}
		else if(this.bgLineColor != ''){
			//LINE ONLY
			context.beginPath();
			context.strokeStyle = this.bgLineColor;
			context.setLineDash([10, 10]);
			context.arc(this.x,this.y,this.bgRadius,0, Math.PI * 2);
			context.stroke();
		}

		//remove dashes from linestyle
		context.setLineDash([]);

		//STICK
		if(this.stickFillColor != ''){
			if(this.stickLineColor != ''){
				//FILL and LINE
				context.beginPath();
				context.fillStyle = this.stickFillColor;
				context.strokeStyle = this.stickLineColor;
				context.arc(this.stickX,this.stickY,this.stickRadius,0, Math.PI *2);
				context.fill();
				context.stroke();
			}
			else{
				//FILL ONLY
				context.beginPath();
				context.fillStyle = this.stickFillColor;
				context.arc(this.stickX,this.stickY,this.stickRadius,0, Math.PI *2);
				context.fill();
			}
		}
		else if(this.bgLineColor != ''){
			//LINE ONLY
			context.beginPath();
			context.strokeStyle = this.stickLineColor;
			context.arc(this.stickX,this.stickY,this.stickRadius,0, Math.PI *2);
			context.stroke();
		}

		if(this.dragging){
			context.beginPath();
			context.fillStyle = 'white';
			context.font = "20px Arial";
			context.textAlign = "left";
			context.textBaseline = "top";
			if(this.ID == 'L')
				context.fillText(this.ID + ' STICK-DRAGGING: ' + Math.round(this.stickDistFromCenter) + ', ' + this.stickAngle * (180/Math.PI), 50, canvas.height /2);
			if(this.ID == 'R')
				context.fillText(this.ID + ' BUTTON DOWN', 50, canvas.height /2 + 30);

			context.beginPath();
			context.strokeStyle = 'white';
			context.moveTo(this.x, this.y);
			context.lineTo(this.stickX, this.stickY);
			context.stroke();
		}
		
		//_____________________
		context.restore();
	}

	activateStick = function(_cbPress = undefined, _cbRelease = undefined){

		this.cb_onPress = _cbPress;
		this.cb_onRelease = _cbRelease;
		this.active = true;
	}
}