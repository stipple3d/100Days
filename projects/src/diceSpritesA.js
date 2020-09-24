let { init, GameLoop } = kontra;
let { canvas, context } = init();

let gameLoop;

let diceImg;

let diceSlots;
const numDiceSlots = 5;
	
let shaking = true;;
let shakeTimeRemaining;

function Preload(){
	//define the dice image
	diceImg = new Image();
	
	//set function to start game loop when the iamge is loaded
	diceImg.onload = function() {
	    // the image is ready
	    Setup();
	};
	//set the image src AFTER the onload function has been defined
	diceImg.src = '../images/set1.png';
}

function Setup(){

	diceSlots = [];
	var newDice;
	for(var ds = 0; ds < numDiceSlots; ds++){
		newDice = new SpriteDice(diceImg, 3,2,ds * (64 +50) + 40,60,64,64);
		newDice.newRandom();
		if(shaking){
			newDice.beginShake();
		}
		diceSlots.push(newDice);
	}
	if(shaking){
		shakeTimeRemaining = 12;
	}

	gameLoop = GameLoop({
		fps: 8,
	  update: function(dt) {

	  	if(shaking){
			shakeTimeRemaining --;
			if(shakeTimeRemaining <= 0){
				for(var ds = 0; ds < diceSlots.length; ds++){
	  				diceSlots[ds].endShake();
	  				shaking = false;
	  				shakeTimeRemaining = 12;
	  			}
			}
			else{
				for(var ds = 0; ds < diceSlots.length; ds++){
	  				diceSlots[ds].update();
	  			}
			}
		}
		else{
			shakeTimeRemaining --;
			if(shakeTimeRemaining <= 0){
				for(var ds = 0; ds < diceSlots.length; ds++){
	  				diceSlots[ds].beginShake();
	  				shaking = true;
	  				shakeTimeRemaining = 12;
	  			}
			}
		}

	  },
	  render: function() {

	  	//context.drawImage(diceImg, 0,0,192,128);
	  	for(var ds = 0; ds < diceSlots.length; ds++){
	  		diceSlots[ds].draw();
	  	}
	  	

	  }
	});

	gameLoop.start();
}

Preload();