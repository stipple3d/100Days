class SimplePlatformerPlayerA{
	constructor(_x, _y, _w, _h, _xS, _jf, _g = .5){
		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;
		this.xSpeed = _xS;
		this.jumpForce = _jf;
		this.gravity = _g;

		this._grounded = false;
		this._jumping = false;
		this._falling = false;

		this.crouches = false;
		this.crouchHeight;
		this._crouching = false;

		this._vX = 0;
		this._vY = 0;
	}

	isGrounded = function(){
		return this._grounded;
	}

	jump = function(){
		if(this._grounded){
			console.log('jumping');
			this._vY += this.jumpForce;
			this._grounded = false;
		}
	}

	crouch = function(){
		if(this._grounded && this.crouches){
			this._crouching = true;
		}
	}

	unCrouch = function(){
		if(this.crouches){
			this._crouching = false;
		}
	}

	enableCrouching = function(_ch){
		this.crouches = true;
		this._crouching = false;
		this.crouchHeight = _ch;
	}

	update = function(_lp, _rp){
		//FOR NOW, assuming we know about the array of blocks to check against
		//TODO: pass a ref in or do this another way?

		if(_rp && !_lp){
			//only right pressed, apply right force
			this._vX = this.xSpeed;
		}
		else if(_lp && !_rp){
			//only left pressed, apply left force
			this._vX = -this.xSpeed;
		}

		if(this._grounded){
			//apply a friction percentage
			this._vX *= .9;
		}
		else{
			//console.log('not grounded, applying gravity');
			//not grounded, apply gravity
			this._vY += this.gravity;
			if(this._vY > 9.81){
				this._vY = 9.81;
			}
		}

		this.x += this._vX;
		this.y += this._vY;

		//this._grounded = false;
		//check collisions with all blocks in the scene
		for(var b = 0; b < blocks.length; b++){
			if(this.x > blocks[b].x && this.x < blocks[b].x + blocks[b].w &&
				this.y > blocks[b].y && this.y < blocks[b].y + blocks[b].h){
					
					//only find new ground IF we are falling (not going up)
					if(this._vY > 0){
						//console.log('landed on : ' + b + ' , ' + this._vY);
						this.y = blocks[b].y;
						this._grounded = true;
						this._vY = 0;
						//console.log('landed on : ' + b);
						break;
					}
					
			}
		}

		//zero out speeds for next frame
		//(these might get adjusted by a jump between now and then)
		this._vX = 0;
		//this._vY = 0;

	}

	draw = function(){
		context.save();
		context.beginPath();
		context.fillStyle = '#8ac80b';
		if(this.crouches && this._crouching)
			context.rect(this.x - this.w /2, this.y - this.crouchHeight, this.w, this.crouchHeight);
		else
			context.rect(this.x - this.w /2, this.y - this.h, this.w, this.h);
		context.fill();

		context.beginPath();
	  	context.fillStyle = 'red';
	  	context.arc(this.x, this.y, 1, 0, Math.PI *2);
	  	context.fill();

		context.restore();
	}
}