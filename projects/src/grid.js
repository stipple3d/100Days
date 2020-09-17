class GridManager{
	constructor(){
		this.gridCells = [];

		for(var row = 0; row < gridRows; row++){
			this.gridCells[row] = [];
			for(var col = 0; col < gridCols; col++){
				if(row == 0 && col == 0){
					this.gridCells[row][col] = new GridCell(row, col, true);
				}
				else{
					this.gridCells[row][col] = new GridCell(row, col);
				}
			}
		}

		//run updateGrid for the first time after a set interval
		setInterval(() =>{
			for(var row = 0; row < this.gridCells.length; row++){
			for(var col = 0; col < this.gridCells[row].length; col++){
				this.gridCells[row][col].updateCell();
			}}}, 20);
	}
}

class GridCell{
	constructor(ri, ci, setup = false){
		this.rowIndex = ri;
		this.colIndex = ci;

		this.minOpacity = 0;
		this.opacity = this.minOpacity;
		this.on = false;
		this.opacityDecreasePerFrame = 0.01;

		this.cellDiv = document.createElement('div');
		this.cellDiv.className = '';
		//this.cellDiv.innerHTML = this.colIndex + ', ' + this.rowIndex;
		grid.appendChild(this.cellDiv);
		this.cellDiv.style.opacity = this.minOpacity;

		if(setup == true){
			//this.cellDiv.style.width = gridCellWidth.toString() + 'px';
			//this.cellDiv.style.height = gridCellHeight.toString() + 'px';
		}

		this.cellDiv.addEventListener("mouseenter",() =>{
			messageText.innerHTML = this.colIndex + ', ' + this.rowIndex;
			//this.cellDiv.classList.add('highlighted');
			this.cellDiv.className = 'highlighted';
			this.on = true;
			this.opacity = 1;
			this.cellDiv.style.opacity = this.opacity;
		});
		this.cellDiv.addEventListener("mouseleave",() =>{
			//this.cellDiv.classList.remove('highlighted');
			//this.cellDiv.className = '';
			this.on = false;

		});
	}

	updateCell = function(){
		if(!this.on){
			//OFF
			if(this.opacity > this.minOpacity){
				//HAS OPACITY TO BE REMOVED
				this.opacity -= this.opacityDecreasePerFrame;
				this.cellDiv.style.opacity = this.opacity;
			}
			else{
				//AT OR BELOW MIN OPACITY
				if(this.cellDiv.className == 'highlighted'){
					console.log('needing to unHighlight');
					//STILL HIGHLIGHTED, NEED TO TURN OFF
					this.cellDiv.className = '';
					//ALSO, MAKE SURE opacity is exactly at min
					this.opacity = this.minOpacity;
					this.cellDiv.style.opacity = this.opacity;
				}
			}
		}
		//IF ON, DO NOTHING
	}
	
}