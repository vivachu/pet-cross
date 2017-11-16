class GameData {

	constructor(game){
		this.initialized = false;
		this.game = game;
		this.gameState = 0;	//0=begin, 1=play, 2=pause, 3=gameover
		this.refWidth = 800;
		this.refHeight = 1280;
		this.completion = 0;
	}

	create(game){
		this.game = game;
		this.initialized = true;
		this.scaleFactor = this.game.height / this.refHeight;

	    //apiUrl
	    if (this.getUrlVars()["apiUrl"] != null){

	    	this.apiUrl = this.getUrlVars()["apiUrl"];
	    	
	    }else {
	    	this.apiUrl = 'https://api.parade.pet/';
	    }

	    //assetUrl
	    if (this.getUrlVars()["assetUrl"] != null){

	    	this.assetUrl = this.getUrlVars()["assetUrl"];
	    	
	    }else {
	    	this.assetUrl = 'https://assets.parade.pet/';
	    }	


	    //token
	   if (this.getUrlVars()["token"] != null){

	    	this.token = this.getUrlVars()["token"];
	    	
	    }else {
	    	this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjEsImlhdCI6MTQ5NzkwNjIwNH0.UB-zvkIy82bNsL5GUTlUXMAuuXrZcBHbkz25TYEdxks';

	    	
	    }	

		
	}

	getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

	getx(x){
		var offsetx = this.game.world.centerX - (this.refWidth * this.scaleFactor *.5);
		return offsetx + ( x * this.scaleFactor);
	}

	gety(y){
		var offsety = this.game.world.centerY - (this.refHeight * this.scaleFactor *.5);
		console.log(this.game.world.centerY);
		console.log(this.refHeight);
		console.log(this.scaleFactor);
		console.log(offsety);
		return offsety + ( y * this.scaleFactor);
	}




}
let gameData = new GameData();
export default gameData;