import GameData from 'helpers/GameData'
import SoundMan from 'helpers/SoundMan';


class Ticket extends Phaser.Sprite{

	constructor(game,level,lane,xpos, ypos){
		super(game, xpos,ypos,'iconlive');
		this.level=level;
		this.game = level.game;
		this.land = level.land;
		this.lane = lane;
		this.arah = lane.arah;
		this.game.add.existing(this);
		this.land.level.main.bonusGroup.add(this);
		this.width=GameData.scaleFactor*144;
		this.height=GameData.scaleFactor*144;

		this.posx=Math.round(xpos/GameData.tileWidth);
		this.posy=Math.round(ypos/GameData.tileWidth);

	}


	update(){
		if (GameData.gameState==1){
			if (this.level.avatar.posx==this.posx && this.level.avatar.posy==this.posy)  this.collisionHandler();
//			if (this.checkOverlap(this,this.level.avatar)) this.collisionHandler();
		}
	}


	checkOverlap(spriteA, spriteB) {
   	 	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}


	collisionHandler(){
	//	var yy=Math.round(this.level.avatar.y/GameData.tileWidth);
//		if (yy == this.lane.line-1){
		GameData.lives++;
		this.level.main.lives.setValue();
		SoundMan.playEffect('coinFin');

		GameData.ticketCollected++;
			this.destroy();



	}

}

export default Ticket;