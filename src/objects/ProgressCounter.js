import GameData from 'helpers/GameData'

class ProgressCounter extends Phaser.Sprite{
	
	constructor(game,  main){
		super(game, game.width-(120*GameData.scaleFactor),game.height-840*GameData.scaleFactor, "dbcounter");
		this.game = game;
		this.main = main;
		this.game.add.existing(this);
		this.scale.setTo(GameData.scaleFactor);
		this.fixedToCamera = true;
		this.pause = true;
		this.stext = this.game.add.text(60,75, "00:00",  {font: "24px Arial Bold", fill: "#ffffff", align: "center"});
    	this.stext.anchor.set(0.5);
    	this.stext.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);

    	this.addChild(this.stext);
    	this.prevTime = this.game.time.totalElapsedSeconds() ; 
    	this.gameTime = 0; 

    	this.totalSeconds = 0;
	}

	Start(){ 
		this.pause = false;
	}

	Pause(){
		this.pause = true;
		
	}

	update(){
		if (this.pause) return;

		if (Math.round(this.game.time.totalElapsedSeconds()) > this.prevTime){
			this.prevTime = Math.round(this.game.time.totalElapsedSeconds());
			this.gameTime ++ ;
		}

		this.totalSeconds = Math.round(this.gameTime);
 		var min = Math.floor(this.totalSeconds/60);  
		var sec = this.totalSeconds % 60


		this.stext.text = (min < 10 ? '0' + min : '' + min) + ":" + (sec < 10 ? '0' + sec : '' + sec) ;
	}

}

export default ProgressCounter;