
let s3dLoop;

let worldContainer;

const tilesWide = 10;
const tilesHigh = 10;

const tileSize = 60;

let playerWorldX = 300;
let playerWorldY = 300;

function Setup(){

	//create SVG in container
	let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	let tile;
	svg.id = 'worldMap';

	//svg.setAttribute('viewbox', '0 0 24 24');
	svg.setAttribute('width', tilesWide * tileSize);
	svg.setAttribute('height', tilesHigh * tileSize);
	svg.setAttribute('viewBox', '100 100 200 200');
	//svg.setAttribute('fill', '#336699');

	for(var r = 0; r < tilesHigh; r++){
		for(var c = 0; c < tilesWide; c++){
			tile = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			tile.setAttribute("class", "worldTile");
			tile.setAttribute("x", c * tileSize);
			tile.setAttribute("y", r * tileSize);
			tile.setAttribute("width", tileSize);
			tile.setAttribute("height", tileSize);
			svg.appendChild(tile);
		}
	}

	worldContainer.appendChild(svg);

	s3dLoop = new s3dGameLoop(8, Render, Update);
	s3dLoop.startLoop();
}
//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	worldContainer = document.getElementById("worldContainer");

    Setup();
});

Update = (_deltaTime) =>{
	console.log('update running');
}

Render = () =>{
	console.log('render running');	
}