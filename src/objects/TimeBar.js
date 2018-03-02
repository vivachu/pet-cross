import GameData from 'helpers/GameData'


class TimeBar extends Phaser.Sprite{

	constructor(game, main){

		super(game, 0, 0, '');
		this.game = game;
		this.main = main;
		this.game.add.existing(this);
 


		this.timebarbg = game.add.sprite(this.game.width-(60*GameData.scaleFactor),this.game.height-700*GameData.scaleFactor, 'dbborder'); 
 		this.timebarbg.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.timebarbg.anchor.setTo(0.5,0);
 		this.timebarbg.fixedToCamera = true;
		this.timebar = game.add.sprite(0,10, 'dbfill');
		this.barwidth=this.timebar.width;
		this.barheight=this.timebar.height; 		
 		this.timebar.anchor.setTo(0.5,0);
 		this.timebarbg.addChild(this.timebar);

    	this.prevTime = this.game.time.totalElapsedSeconds() ; 
    	this.gameTime = 0; 
    	this.totalSeconds = 0;
    	this.pause = true;

    	this.cropRect = new Phaser.Rectangle(0, 0, this.barwidth,this.barheight);
    	this.timebar.crop(this.cropRect);
 		this.timebar.origpos=this.timebar.position;

		this.marker = game.add.sprite(0,10, 'dbmarker');
		this.marker.anchor.setTo(0.5,0.5);
		this.timebarbg.addChild(this.marker);





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


			this.cropRect.y = this.barheight-(GameData.playDistance/GameData.totalLanes) * this.barheight;		
			this.timebar.y=this.cropRect.y+10;
			this.marker.y=this.timebar.y;
	    	this.timebar.updateCrop();
	    	if (GameData.playDistance>=GameData.totalLanes-1) {
	    		this.main.initGameFinished();	
	    		this.pause=true;
	    	}


/*			
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
*/

	}

}

export default TimeBar;