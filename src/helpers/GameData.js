class GameData {

	constructor(game){
		this.initialized = false;
		this.game = game;
		this.gameState = 0;	//0=begin, 1=play, 2=pause, 3=miss, 4=gameover
		this.refWidth = 800;
		this.refHeight = 1280;
		this.completion = 0;
	}

	create(game){
		this.game = game;
		this.gameState = 0;
			//
		this.initialized = true;
		this.scaleFactor = this.game.height / this.refHeight;
		this.tileWidth = 72*this.scaleFactor;

 		this.screenWidth=Math.round((this.game.width/this.tileWidth)*2);
//		this.leftOffset = this.screenWidth/4;
//		this.rightOffset = this.screenWidth-this.leftOffset; 

		this.boundsWidth = this.game.width+(720*this.scaleFactor);
		//num of columns since the grid width is 360 , add 1 segment for space
		this.columns = 1+Math.round((this.boundsWidth/(360*this.scaleFactor)));
		this.midOffset = Math.round(Math.round(this.boundsWidth/this.tileWidth)/2);
		this.leftOffset = this.midOffset-5;
		this.rightOffset = this.midOffset+5;

		this.leftPixelOffset = this.leftOffset*this.tileWidth-this.tileWidth;
		this.rightPixelOffset = this.rightOffset*this.tileWidth+this.tileWidth;
		this.totalLanes = 200;

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