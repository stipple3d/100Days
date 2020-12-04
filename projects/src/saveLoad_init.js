//REF to the gameLoop
let gameLoop;

/*//refs to the menu and play divs
//('scene' containers, for display visability purposes)
let menuDiv, playDiv;

//refs to the specific buttons/elements of the 'scenes'
let menuButtons;*/

let stateDisplay;
let currentSaveIndexDisplay;

let upButton, downButton, value;

let messageDisplay;

//ref to the instance of the asset manager
let assetMgr;

//state value, starts as waiting for dom
let state = 'waitingForDOM';

let currentSaveIndex;

let upPressed, downPressed, playPressed, savePressed;

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	// canvas = document.getElementById("gameCanvas");
	// context = canvas.getContext("2d");

	//grab refs to all HTML elements
	stateDisplay = document.getElementById("stateDisplay");
	stateDisplay.innerHTML = 'state: ' + state;

	currentSaveIndexDisplay = document.getElementById("saveIndexDisplay");
	currentSaveIndexDisplay.style.display = "none";

	upButton = document.getElementById("upBtn");
	upButton.style.display = "none";

	downButton = document.getElementById("downBtn");
	downButton.style.display = "none";

	value = document.getElementById("value");
	value.style.display = "none";

	messageDisplay = document.getElementById("message");
	messageDisplay.style.display = "block";

	//run setup
	Setup();
});

function Setup(){
	//console.log('Setup running');
	 //init/store an instance of the gameLoop in the Global REF
	gameLoop = new s3dGameLoop(60, Render, Update);

	assetMgr = new AssetManager();

	assetMgr.addToQueue('data', 'https://stipple3d.github.io/100Days/data/storeForProjects/ff1TestA/savesA.json', 'playerSaves');
	//assetMgr.addToQueue('image', 'images/8x8-softBaseA-LowUpsize.png', 'baseTiles');
	//assetMgr.addToQueue('image', 'images/8x8-softSandA-LowUpsize.png', 'sandTiles');

	state = 'loadingAssets';
	stateDisplay.innerHTML = 'state: ' + state;

	//start loop
	gameLoop.startLoop();

	assetMgr.loadAssets();
}

//NOTE: delta time is coming from the game loop
Update = (_deltaTime) =>{
	//console.log('Update is running');
	if(state == 'loadingAssets'){
		//console.log('Update -loadingAssets- is running');
		if(assetMgr.loadingComplete){
			state = 'menu';
			stateDisplay.innerHTML = 'state: ' + state;
			console.log(assetMgr.data[0].data.saves);

			//if there are saves, create a button for each
			if(assetMgr.data[0].data.saves.length > 0){
				currentSaveIndex = 0;
				currentSaveIndexDisplay.style.display = "block";
				currentSaveIndexDisplay.innerHTML = 'currentSaveIndex: ' + currentSaveIndex;
				value.innerHTML = currentSaveIndex + '(' + assetMgr.data[0].data.saves[currentSaveIndex].testValue + ')';
				upButton.style.display = "inline";
				upButton.innerHTML = ' >';
				downButton.style.display = "inline";
				downButton.innerHTML = '< ';
				value.style.display = "inline";
				messageDisplay.innerHTML = 'select a save and then press < P > to play';

				//init key handlers
				upPressed = false;
				downPressed = false;
				document.addEventListener("keydown", KeyDownHandler);
				document.addEventListener("keyup", KeyUpHandler);
			}
		}
	}
	/*else if(state == 'menu'){

	}*/
}

Render = () =>{

	//nothing is rendered? (everything is input event based?)

	/*if(state == 'loadingAssets'){


		
	}


	else if(state == 'loadingComplete'){


		

	}*/

}

KeyDownHandler = (e) =>{
	//console.log(e.key);
	if(e.key == 'ArrowRight' && !upPressed){
		//increment & loop value (based on menu/play state)
		if(state == 'menu'){
			currentSaveIndex ++;

			if(currentSaveIndex >= assetMgr.data[0].data.saves.length)
				currentSaveIndex = 0;

			currentSaveIndexDisplay.innerHTML = 'currentSaveIndex: ' + currentSaveIndex;
			value.innerHTML = currentSaveIndex + '(' + assetMgr.data[0].data.saves[currentSaveIndex].testValue + ')';
				
		}
		else if(state == 'play'){
			assetMgr.data[0].data.saves[currentSaveIndex].testValue ++;
			value.innerHTML = assetMgr.data[0].data.saves[currentSaveIndex].testValue;
		}

		upPressed = true;
	}
	else if(e.key == 'ArrowLeft' && !downPressed){

		if(state == 'menu'){
			currentSaveIndex --;

			if(currentSaveIndex < 0)
				currentSaveIndex = assetMgr.data[0].data.saves.length -1;

			currentSaveIndexDisplay.innerHTML = 'currentSaveIndex: ' + currentSaveIndex;
			value.innerHTML = currentSaveIndex + '(' + assetMgr.data[0].data.saves[currentSaveIndex].testValue + ')';
				
		}
		else if(state == 'play'){
			assetMgr.data[0].data.saves[currentSaveIndex].testValue --;
			value.innerHTML = assetMgr.data[0].data.saves[currentSaveIndex].testValue;
		}

		downPressed = true;
	}
	else if(e.key == 'p' && !playPressed){
		playPressed = true;

		value.innerHTML = assetMgr.data[0].data.saves[currentSaveIndex].testValue;

		messageDisplay.innerHTML = 'modify value, then press < S > to save';

		state = 'play';
	}
	else if(e.key == 's' && !savePressed){
		savePressed = true;
		console.log('save press heard');
		/*value.innerHTML = assetMgr.data[0].data.saves[currentSaveIndex].testValue;

		messageDisplay.innerHTML = 'modify value, then press < S > to save';
*/
		state = 'save';

		messageDisplay.innerHTML = 'SAVING .....';

		assetMgr.startDataSave(0);
	}
}
KeyUpHandler = (e) =>{
	if(e.key == 'ArrowRight')
		upPressed = false;
	else if(e.key == 'ArrowLeft')
		downPressed = false;
	else if(e.key == 'p')
		playPressed = false;
	else if(e.key == 's')
		savePressed = false;
}