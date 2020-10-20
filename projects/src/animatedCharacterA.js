class AnimatedCharacterWalkerA{
	constructor(_sheet, _sCols, _sRows, _x, _y, _w, _h, _defaultIndex = 0){
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;

		this.spritesheet = _sheet;
		this.sRows = _sRows;
		this.sCols = _sCols;

		this.index = _defaultIndex;

		this.frames = [];
		//fill frames array with ALL the frames in the spritesheet
		var obj;
		for(var row = 0; row < this.sRows; row++){
			for(var col = 0; col < this.sCols; col++){
				obj = new Object();
				obj.x = col * this.w;
				obj.y = row * this.h;
				this.frames.push(obj);
			}
		}
		//animations will be added implicitly later
		this.animations = [];
		this.currentAnimIndex;//index of the animation that matches the current dir
		this.animationFrameIndex;//just the index frmae count INSIDE the current animation (for looping process)

		this.dir = '';

		//this.updatesPerFrame = 10;//6 frames per second
		//this.updatesUntilNextTick;
		this.movementPerFrame = 8;

		this.sizeMultiplier = 4;
	}

	addAnimation = function(_name, _frames){
		var anim = new Object();
		anim.name = _name;
		anim.frames = _frames;
		this.animations.push(anim);
	}

	update = function(_currentDir){

		if(this.dir != _currentDir){

			//set the incoming new direction
			this.dir = _currentDir;

			//loop through the animations and find the one that matches the current dir
			var animFound = false;
			for(var a = 0; a < this.animations.length; a++){
				if(this.animations[a].name == this.dir){
					//mark that we found a matching animation
					animFound = true;
					//store the index of this animation (in the animations array)
					this.currentAnimIndex = a;
					//start the current animation on its first frame
					this.animationFrameIndex = 0;
					//pull and store that first index of the current animation as the index from the sprite sheet we are currently drawing
					this.index = this.animations[this.currentAnimIndex].frames[this.animationFrameIndex];

					break;
				}
			}

			//setup new direction animation/movement
			switch(_currentDir){
				case 'up' :
					this.y -= this.movementPerFrame;
					if(this.y < 0)
						this.y = 0;
					break;
				case 'down' :
					this.y += this.movementPerFrame;
					if(this.y > canvas.height - this.h * this.sizeMultiplier)
						this.y = canvas.height - this.h * this.sizeMultiplier;
					break;
				case 'left' :
					this.x -= this.movementPerFrame;
					if(this.x < -15 * this.sizeMultiplier)
						this.x = -15 * this.sizeMultiplier;
					break;
				case 'right' :
					this.x += this.movementPerFrame;
					if(this.x > canvas.width - this.w * this.sizeMultiplier + (15* this.sizeMultiplier))
						this.x = canvas.width - this.w * this.sizeMultiplier + (15* this.sizeMultiplier);
					break;
				default :
					break;
			}

			
		}
		else{

			if(this.dir != ''){
				//increment the current animation frame index (for the current animation)
				this.animationFrameIndex ++;
				//if we have reached the end of the animation, loop back to the start
				if(this.animationFrameIndex > this.animations[this.currentAnimIndex].frames.length -1){
					this.animationFrameIndex = 0;
				}
				//pull and store the current index of the current animation as the index from the sprite sheet we are currently drawing
				this.index = this.animations[this.currentAnimIndex].frames[this.animationFrameIndex];
			}

			//TODO: move the player in the correct direction

			switch(_currentDir){
				case 'up' :
					this.y -= this.movementPerFrame;
					if(this.y < 0)
						this.y = 0;
					break;
				case 'down' :
					this.y += this.movementPerFrame;
					if(this.y > canvas.height - this.h * this.sizeMultiplier)
						this.y = canvas.height - this.h * this.sizeMultiplier;
					break;
				case 'left' :
					this.x -= this.movementPerFrame;
					if(this.x < -15 * this.sizeMultiplier)
						this.x = -15 * this.sizeMultiplier;
					break;
				case 'right' :
					this.x += this.movementPerFrame;
					if(this.x > canvas.width - this.w * this.sizeMultiplier + (15* this.sizeMultiplier))
						this.x = canvas.width - this.w * this.sizeMultiplier + (15* this.sizeMultiplier);
					break;
				default :
					break;
			}
		}
	}

	draw = function(){
		/*if(this.dir == '' || this.animations.length <= 0){
			//draw current index from the sheet
			context.save();
			context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
			context.restore();
		}
		else{
			context.save();
			switch(){
				case 'up' :
					context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
					break;
				case 'down' :
					context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
					break;
				case 'left' :
					context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
					break;
				case 'right' :
					context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
					break;
				default :
					context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
					break;
			}
			context.restore();
		}*/

		//TODO: test, does this cover ever case, since the changes/checks are happening in update
		context.save();
		context.drawImage(this.spritesheet, this.frames[this.index].x , this.frames[this.index].y ,this.w ,this.h, this.x, this.y, this.w * this.sizeMultiplier, this.h * this.sizeMultiplier);
		context.restore();
	}
}