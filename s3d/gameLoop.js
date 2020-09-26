class s3dGameLoop{
	constructor(_fps = 60, _renderCallback, _updateCallback){

		//requested FPS for the gameLoop
		this.fps = _fps

		//rendering callback is technically optional
		//(but if there is neither a rendering or update,
		//nothing will happen and the processing will be wasted)
		this.renderCB = _renderCallback;

		//update callback is optional
		this.updateCB = _updateCallback;

		//accumulated time starts at zero
		this.accTime = 0;
		this.lastTime;
		//translate the requested FPS to SECONDS (per frame) between UPDATES (not renders)
		//from here this is "deltaTime"
		this.dt = 1 / this.fps; // for 60 FPS, this will be 1/60 = .0166666r

		//ref to the 'requestAnimationFrame' (for use in canceling it on a stop call)
		this.raf;

		this.updated = false;

		//NOTE: 'time' is coming from the requestAnimationFrame (event?)
		//		(it will be ms since the game was loaded)
		this.processFrame = (time) => {
			//add the time since last update to accumulated time counter 
			//(converted to seconds, to match our this.dt var units)
			this.accTime += (time - this.lastTime) /1000;

			//console.log('rafTime: ' + time + ', last: ' + this.lastTime);

			while(this.accTime >= this.dt){

				//TODO: run update callback
				if(this.updateCB != undefined){
					this.updateCB(this.dt);//passing out DeltaTime in the update
				}
				//console.log('update: ' + this.updateCB);

				//decrement the accumulated time counter by the value of deltaTime
				this.accTime -= this.dt;

				//mark that we updated in this processFrame
				this.updated = true;
			}

			//if we updated, we should also render this processFrame
			if(this.updated){

				//TODO: run the render callback
				if(this.renderCB != undefined){
					this.renderCB();
				}
				//console.log('render: ' +  this.renderCB);

				//mark the updated flag as false again for the next process frame
				this.updated = false;
			}

			//store this processFrame's time as the last time
			this.lastTime = time;

			//run function to request a frame again
			this.requestAFrame();
		}

		this.startLoop = function(){
			//set the time we are starting the loop as the 
			//previous time (so it will not try to process all the frames
			//since it was stopped in the next frame)
			this.lastTime = window.performance.now();
			//run function to request a frame again
			this.requestAFrame();
		}

		this.requestAFrame = function(){
			//calls and stores a requestanimationframe
			this.raf = window.requestAnimationFrame(this.processFrame);
		}

		this.stopLoop = function(){
			//cancel the stored requestanimationframe
			window.cancelAnimationFrame(this.raf);
		}
	}
}