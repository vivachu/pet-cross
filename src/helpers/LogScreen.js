class LogScreen{


	constructor(){

	}

	CreateLog(game){
		this.game=game;
		this.textConsole0;
		this.textConsole1;
		this.textConsole2;
		this.textConsole3;
		this.textConsole4;
		this.textConsole5;
		this.enableCharText = false;
		this.enableHelperText = false;
		this.enableFPSCounter = false;
		this.enableCharSpeedText = false

	    if (this.enableFPSCounter == true) {

	    	var style0 = {font: "80px Arial", fill: "#ff0000", align: "center"};
			this.textConsole0 = this.game.add.text(0, 0, 'fps: ', style0);
	    	this.textConsole0.fixedToCamera = true;

	    	//console.log()
	    }

	    if (this.enableHelperText == true){

	    	this.textConsole1 = this.game.add.text(0, 100, 'clicked: 0 times', {fill: '#ff0000'});
			this.textConsole2 = this.game.add.text(0, 150, 'dist: 000 time: 000', {fill: '#ff0000'});
			this.textConsole3 = this.game.add.text(0, 200, 'txt3', {fill: '#ff0000'});
			this.textConsole4 = this.game.add.text(0, 250, 'txt4', {fill: '#ff0000'});
			this.textConsole5 = this.game.add.text(0, 300, 'txt5', {fill: '#ff0000'});
	    }

		
		if (this.enableHelperText == true){
			
			var style = {font: "30px Arial", fill: "#ff0000", align: "center"};
			var text = this.game.add.text(0, 50, "w: " + window.innerWidth + " h: " + window.innerHeight + " wdpr: " + window.devicePixelRatio + " sf: " + 
			this.game.math.roundTo(this.scaleFactor, -3) , style );
		}




	}

	getEnableCharText(){
		return this.enableCharText;
	}

	getEnableHelperText(){
		return this.enableHelperText;
	}

	getEnableCharSpeedText(){
		return this.enableCharSpeedText;
	}

	setTextConsole(id,message){
		console.log("setTextConsole " + message);
		if (id==1) this.textConsole1.text = message;
		if (id==2) this.textConsole2.text = message;
		if (id==3) this.textConsole3.text = message;
		if (id==4) this.textConsole4.text = message;
		if (id==5) this.textConsole5.text = message;
	}

	update(){

		if (this.enableFPSCounter == true) this.textConsole0.text = "fps: " + this.game.time.fps;


	}
}
let logScreen = new LogScreen();
export default logScreen;