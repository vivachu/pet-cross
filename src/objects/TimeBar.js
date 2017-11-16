import GameData from 'helpers/GameData'


class TimeBar extends Phaser.Sprite{

	constructor(game, main){

		super(game, 0, 0, '');
		this.game = game;
		this.main = main;
		this.game.add.existing(this);

		this.timebar = game.add.sprite(this.game.world.centerX,100*GameData.scaleFactor, 'timebar');
	 	this.timebar.anchor.setTo(0.5,0.5);
 		this.timebar.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.timebar.visible=false;

//		this.stext = this.game.add.text(this.game.world.centerX,100 * GameData.scaleFactor, "00:00",  {font: "60px Arial Bold", fill: "#ffffff", align: "center"});
		this.stext = this.game.add.bitmapText(this.game.world.centerX,100 * GameData.scaleFactor, 'fontOduda', "00:00", 60);
    	
    	this.stext.anchor.set(0.5);
    	this.stext.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
    	this.stext.visible=false;

    	this.prevTime = this.game.time.totalElapsedSeconds() ; 
    	this.gameTime = 0; 

    	this.totalSeconds = 0;
    	this.pause = true;
	}



	Start(){
		this.pause = false;
 		this.timebar.visible=true;
    	this.stext.visible=true;
	}

	Pause(){
		this.pause = true;
		
	}

	Stop(){
		this.pause = true;
		
	}


/*	setValue(val){
	    this.progressbar.x=this.toP(val);
	}

	toP(val){
		var hasil=val/100*460;
		return this.game.world.centerX-(460-hasil)*GameData.scaleFactor;

	}
*/

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

		//console.log('ts ' + this.totalSeconds + ' m: ' + min + ' s: ' + sec);
	}

}

export default TimeBar;