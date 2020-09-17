class PointToPointMover{
	constructor(initX = 0, initY = 0, initTargetX = 0, initTargetY = 0, initVel = 3){
		this.x = initX;
		this.y = initY;
		this.targetX = initTargetX;
		this.targetY = initTargetY;
		this.velocity = initVel;//pixels per frame (constant speed)
		//start out not having reached the dest
		this.reachedDest = false;	}
	update = function(){
		var xDif = this.targetX - this.x;
		var yDif = this.targetY - this.y;
		var distanceToCurrentTarget = Math.hypot(xDif, yDif);
		//WILL NEVER OVERSHOOT THE TARGET, 
		//SO IT WILL ALWAYS BE AT EACH "CORNER" FOR AT LEAST ONE FRAME
		if(distanceToCurrentTarget <= this.velocity){
			//going to be at OR overshoot the target this frame
			//make the current X/Y that of the current target
			this.x = this.targetX;
			this.y = this.targetY;
			//mark that we have reached target, 
			//game loop will give us a new target next frame
			this.reachedDest = true;
		}
		else{
			//will still have more to go to target after this frame
			this.x += (xDif * (this.velocity / distanceToCurrentTarget));
			this.y += (yDif * (this.velocity / distanceToCurrentTarget));
		}
	}
	draw = function(){
		context.beginPath();
		context.fillStyle = 'grey';
		context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
		context.fill();
		context.closePath();
	}
}