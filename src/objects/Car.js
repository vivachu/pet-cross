import GameData from 'helpers/GameData'


class Car extends Phaser.Sprite{

	constructor(game,level,lane,xpos, ypos){
		super(game, xpos,ypos,'car'+game.rnd.integerInRange(1,3));
		this.level=level;
		this.game = level.game;
		this.land = level.land;
		this.lane = lane;
		this.arah = lane.arah;
		this.game.add.existing(this);
		this.land.level.main.carGroup.add(this);
		this.triggerOther = false;

		this.width=GameData.scaleFactor*288;
		this.height=GameData.scaleFactor*288;
 	//	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	//	this.body.immovable = false;
   // 	this.body.collideWorldBounds = true;
   // 	this.body.bounce.setTo(1, 1);

    	if (this.arah==1)
	    	this.scale.x*=-1;

	}


	update(){
		if (GameData.gameState==1){
			this.x+=this.arah*this.lane.laneSpeed;
			if (this.checkOverlap(this,this.level.avatar)) this.collisionHandler();
			//this.game.physics.arcade.collide(this, this.level.avatar, this.collisionHandler, null, this);
			if (this.arah==1){
				if (this.x>=GameData.boundsWidth+GameData.tileWidth) this.x=0;
			}else{
				if (this.x<0) this.x=GameData.boundsWidth+GameData.tileWidth;
			}
		}
	}


	checkOverlap(spriteA, spriteB) {

   	 	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}


	collisionHandler(){
/*
		var yy=Math.round((this.level.avatar.y-this.level.avatar.midOffset)/GameData.tileWidth);
		if (yy == this.lane.line){
			this.level.gameOver();	
		}
*/
		if (this.level.avatar.posy == this.lane.line){
			this.level.gameOver();	
		}

	}

}

export default Car;