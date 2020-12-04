//REF to the gameLoop
let gameLoop;

//refs to the menu and play divs
//('scene' containers, for display visability purposes)
let menuDiv, playDiv;

//refs to the specific buttons/elements of the 'scenes'
let menuButtons;
let stateDisplay;
let playCurrentSaveIndexDisplay;
let playUpButton, playerDownButton, playValue;

//ref to the instance of the asset manager
let assetMgr;

//state value, starts as waiting for dom
let state = 'waitingForDOM';

//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	// canvas = document.getElementById("gameCanvas");
	// context = canvas.getContext("2d");

	//grab refs to all HTML elements
	stateDisplay = document.getElementById("stateDisplay");
	stateDisplay.innerHTML = 'state: ' + state;

	//run setup
	Setup();
});

function Setup(){
	console.log('Setup running');
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
	console.log('Update is running');
	if(state == 'loadingAssets'){
		//console.log('Update -loadingAssets- is running');
		if(assetMgr.loadingComplete)
			state = 'loadingComplete';
	}
}

Render = () =>{

	//nothing is rendered? (everything is input event based?)

	/*if(state == 'loadingAssets'){


		
	}


	else if(state == 'loadingComplete'){


		

	}*/

}