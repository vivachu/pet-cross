import GameData from 'helpers/GameData'


class TimeBar extends Phaser.Sprite{

	constructor(game, main){

		super(game, 0, 0, '');
		this.game = game;
		this.main = main;
		this.game.add.existing(this);



		this.timebarbg = game.add.sprite(this.game.width/2,100*GameData.scaleFactor, 'timebarbg'); 
 		this.timebarbg.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.timebarbg.anchor.setTo(0.5,0.5);
 		this.timebarbg.fixedToCamera = true;
 		//this.timebarbg.x = this.game.width-10;
		this.timebar = game.add.sprite(this.timebarbg.x-(300*GameData.scaleFactor),this.timebarbg.y, 'timebar');
		this.barwidth=this.timebar.width; 		
 		this.timebar.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.timebar.anchor.setTo(0,0.5);
 		this.timebar.fixedToCamera = true;

    	this.prevTime = this.game.time.totalElapsedSeconds() ; 
    	this.gameTime = 0; 
    	this.totalSeconds = 0;
    	this.pause = true;

    	this.cropRect = new Phaser.Rectangle(0, 0, this.barwidth,100);
    	this.timebar.crop(this.cropRect);
 
	}



	Start(){
		this.pause = false;
 		this.timebar.visible=true;
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

			if (Math.round(this.game.time.totalElapsedSeconds()) > this.prevTime && GameData.gameState==1){
				this.prevTime = Math.round(this.game.time.totalElapsedSeconds());
				this.gameTime ++ ;
				this.totalSeconds = Math.round(this.gameTime);

		    	this.cropRect.width = (this.gameTime/GameData.playTime) * this.barwidth;
		    	this.timebar.updateCrop();
		    	if (this.gameTime>=GameData.playTime) {
		    		this.main.initGameFinished();	
		    		this.pause=true;
		    	}

			}


	}

}

export default TimeBar;