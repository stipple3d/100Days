

//ref to the table that will show the loot items
let lootTable;

const lootData = [
	{name: 'gold', value: 100},
	{name: 'diamond', value: 1},
	{name: 'pickaxe', value: 10},
	{name: 'potion', value: 30},
	{name: 'shield', value: 10},
	{name: 'drink', value: 40},
	{name: 'food', value: 50},
	{name: 'torch', value: 10}
];

let valueTotal;

const iterations = 500;

let iterationDisplay;


//HTML event listener
document.addEventListener("DOMContentLoaded", function(){
	//get elements from the HTML
	lootTable = document.getElementById('lootTable');
	iterationDisplay = document.getElementById('iterations');
	
	//run game setup
    SetupGame();
});

function SetupGame(){

	//show iterations in display
	iterationDisplay.innerHTML = "ITERATIONS: " + iterations;

	//clear the value total
	valueTotal = 0;

	//add header row
	var rowEntry;
	var entry;

	//populate table cells and iterate values to total
	for(var lti = 0; lti < lootData.length; lti++){
		//create item row
		rowEntry = lootTable.insertRow(lti +1);

		//create cols in the row
		entry = rowEntry.insertCell(0);
		entry.innerHTML = lootData[lti].name;

		entry = rowEntry.insertCell(1);
		entry.innerHTML = lootData[lti].value;

		entry = rowEntry.insertCell(2);
		entry.innerHTML = 'TBD';

		entry = rowEntry.insertCell(3);
		entry.innerHTML = 'TBD';

		//add to the value total
		valueTotal += lootData[lti].value;

	}

	//update expected cells now that we have values TOTAL
	for(var lti = 0; lti < lootData.length; lti++){
		lootTable.rows[lti+1].cells[2].innerHTML = Math.round(  iterations * ( lootData[lti].value / valueTotal )  );
	}

	//run iterations
	var resultsArray = new Array(lootData.length);
	resultsArray.fill(0);

	//console.log(valueTotal);
	var result;

	for(var i = 0; i < iterations; i++){
		result = selectLoot();
		if(selectLoot != undefined){
			//iterate the count in the matching index of the results array
			//(to the index selected by the selectLoot function)
			resultsArray[result] ++;
		}
	}

	//show results
	for(var lti = 0; lti < lootData.length; lti++){
		lootTable.rows[lti+1].cells[3].innerHTML = resultsArray[lti];
	}
}

function selectLoot(){
	var ranValue = Math.floor(     Math.random() * (valueTotal)     ) +1;

	var currentMin;
	var currentMax;

	for(var i = 0; i < lootData.length; i++){
		//update min/max
		if(i == 0){
			currentMin = 1;
			currentMax = lootData[i].value;
		}
		else{
			//min is one more than the previous max
			currentMin = currentMax +1;
			//remove the one we added from the new min and add this items value
			currentMax = currentMin -1 + lootData[i].value;
		}

		//check if the ranValue is in this item's range
		if(ranValue >= currentMin && ranValue <= currentMax){
			//return matching index as soon as one is found
			return i;
		}
	}

	//if we get here there was no match
	console.log('selectLoot did not find a match');
	return undefined;

}