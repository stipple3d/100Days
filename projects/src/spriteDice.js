class SpriteDice{
	constructor(_sheet, _sCols, _sRows, _x, _y, _w, _h, _initVal = 1){

		this.x = _x;
		this.y = _y;
		this.w = _w;
		this.h = _h;

		this.spritesheet = _sheet;
		this.sRows = _sRows;
		this.sCols = _sCols;

		this.value = _initVal;
		this.shakeValue = 1;

		this.positions = [];

		this.shaking =false;

		var obj;
		for(var row = 0; row < this.sRows; row++){
			for(var col = 0; col < this.sCols; col++){
				obj = new Object();
				obj.x = col * this.w;
				obj.y = row * this.h;
				this.positions.push(obj);
			}
		}

		console.log(this.positions);
	}

	newRandom = function(){
		this.value = Math.round(Math.random() * 5) +1;
	}
	newRandomShake = function(){
		this.shakeValue = Math.round(Math.random() * 5) +1;
	}

	setValue = function(val){
		this.value = val;
	}

	beginShake = function(){
		this.shaking = true;
	}

	endShake = function(){
		this.shaking = false;
	}

	update = function(){
		if(this.shaking){
			this.newRandomShake();
		}
	}

	draw = function(){
		//catch possibility of no positions being defined
		if(this.positions.length <= 0)
			return;

		//else, continue drawing
		context.save();
		if(this.shaking){
			context.globalAlpha = .2;
			context.drawImage(this.spritesheet, this.positions[this.shakeValue -1].x , this.positions[this.shakeValue -1].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
		}
		else{
			context.globalAlpha = 1;
			context.drawImage(this.spritesheet, this.positions[this.value -1].x , this.positions[this.value -1].y ,this.w ,this.h, this.x, this.y, this.w, this.h);
		}
		context.restore();
	}
}