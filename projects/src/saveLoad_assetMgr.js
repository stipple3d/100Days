class AssetManager{
	constructor(){

		//TODO: can these be objects instead of arrays"
		//		- adding an image (for instance) would create a parameter by
		//			the name of the 'refName' and make it equal to the image itself
		//		- benefit: calling images.'refName' will return image
		//					(no need to search through looking for a name match)

		this.images = [];
		this.sounds = [];
		this.data = [];

		this.queue = [];
		this.indexLoading = 0;
		this.totalToLoad = 0;

		this.loadingComplete = false;

		this.dataRequest = undefined;
	}

	addToQueue = function(_type, _path, _refName){
		var a = new Object();
		a.type = _type;
		a.path = _path;
		a.name = _refName;
		this.queue.push(a);
	}

	loadAssets = function(){
		this.totalToLoad = this.queue.length;
		if(this.totalToLoad > 0){
			this.loadingComplete = false;
			this.indexLoading = 0;
			this.startNextAssetLoad();
		}
	}

	startNextAssetLoad = function(){
		switch(this.queue[this.indexLoading].type){
			case 'image':
				//create data object to hold the ref name and the image itself
				var iObj = new Object();
				//set name
				iObj.name = this.queue[this.indexLoading].name;
				//set img as a new Image
				iObj.img = new Image();
				//add the data object to the Images array
				this.images.push(iObj);
				//set the onLoad callback for this image
				this.images[this.images.length -1].img.onload = () => {
				    // the image is ready
				    this.assetLoadComplete();
				};
				//set src to the path for this image into the img in the newly added entry to images array
				this.images[this.images.length -1].img.src = this.queue[this.indexLoading].path;//TODO: possibly need to add '' + to the start of the path ??

			break;
			case 'sound':
				//TODO: is it possible to load an audio file in a similar way to 
				//		the image above (for now, hard-coding the audio element 
				//		into the HTML, which makes having it here not necessary?)
				//			- if no src is defined in the HTML, will adding it here
				//				make it work same as image?
			break;
			case 'data':
				//TODO: how to load data files (various types)
				this.dataRequest = new XMLHttpRequest();
				this.dataRequest.open('GET', this.queue[this.indexLoading].path, true);
				this.dataRequest.onload = this.dataLoaded;
				this.dataRequest.onerror = this.dataLoadError;
				this.dataRequest.send();

			break;
		}
	}

	dataLoaded = () =>{
		//console.log('dataLoaded running');
		if(this.dataRequest.status >= 200 && this.dataRequest.status < 400){
			//Success
			var iObj = new Object();
			//set name
			iObj.name = this.queue[this.indexLoading].name;
			//set data as a parsed responseText
			iObj.data = JSON.parse(this.dataRequest.responseText);
			//save path to the record as well for saving
			iObj.path = this.queue[this.indexLoading].path;
			//add the data object to the Data array
			this.data.push(iObj);

			//console.log(data);
			this.assetLoadComplete();
		}
		else {
	    	// We reached our target server, but it returned an error
	    	console('data error else')
	  	}
	}
	dataLoadError = () =>{
		console.log('data Load error');
	}

	startDataSave = function(_index){
		this.dataRequest = new XMLHttpRequest();
		this.dataRequest.open('POST', this.data[_index].path, true);
		this.dataRequest.setRequestHeader("Content-Type", "application/json");
		this.dataRequest.onreadystatechange = this.dataSaved;
		//this.dataRequest.onload = this.dataLoaded;
		//this.dataRequest.onerror = this.dataLoadError;
		//var data = JSON.stringify({ "name": name.value, "email": email.value }); 
		this.dataRequest.send(this.data[_index].data);
	}

	dataSaved = () =>{
		if (this.dataRequest.readyState === XMLHttpRequest.DONE && this.dataRequest.status === 200) {
	        // Request finished. Do processing here.
	        console.log('save complete');
	    }
	}
	dataSaveError = () =>{
		console.log('data Save error');
	}

	assetLoadComplete = function(){
		this.indexLoading ++;

		if(this.indexLoading < this.totalToLoad)
			this.startNextAssetLoad();
		else
			this.loadingComplete = true;
	}

	checkImageByName = function(_nameToCheck){

		for(var i = 0; i < this.images.length; i++){
			if(this.images[i].name == _nameToCheck)
				return true;
		}

		return false;
	}

	getImageByName = function(_name){

		for(var i = 0; i < this.images.length; i++){
			if(this.images[i].name == _name)
				return this.images[i].img;
		}

		return undefined;
	}
	getImageIndexByName = function(_name){

		for(var i = 0; i < this.images.length; i++){
			if(this.images[i].name == _name)
				return i;
		}

		return undefined;
	}
}