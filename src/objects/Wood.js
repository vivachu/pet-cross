import GameData from 'helpers/GameData'


class Wood extends Phaser.Sprite{

	constructor(game,level,lane,xpos, ypos, rightLimit, variant){
		super(game, xpos,ypos,'log'+variant);
		this.level=level;
		this.game = level.game;
		this.land = level.land;
		this.lane = lane;
		this.arah = lane.arah;
		this.rightLimit=rightLimit;
		this.game.add.existing(this);
		this.land.level.main.woodGroup.add(this);
		this.triggerOther = false;
		this.name = 'log'+lane.line+"_"+xpos;

		this.scale.x=GameData.scaleFactor;
		this.scale.y=GameData.scaleFactor;
 	//	this.game.physics.enable(this, Phaser.Physics.ARCADE);
	//	this.body.immovable = false;
   // 	this.body.collideWorldBounds = true;
   // 	this.body.bounce.setTo(1, 1);
    	this.ridden=false;


	}


	update(){
		if (GameData.gameState==1){
			this.x+=this.arah*this.lane.laneSpeed;
			if (this.checkOverlap(this,this.level.avatar)) this.collisionHandler();
			//this.game.physics.arcade.overlap(this, this.level.avatar, this.collisionHandler, null, this);
			if (this.arah==1){
				if (this.x>this.rightLimit) this.x=0;
			}else{
				if (this.x<=0) this.x=this.rightLimit;
			}
		}
	}


	checkOverlap(spriteA, spriteB) {

   	 	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();

    	return Phaser.Rectangle.intersects(boundsA, boundsB);

	}

	collisionHandler(){
		if (this.level.avatar.ready==false) return;
		if (this.ridden) return;

		var yy=Math.round((this.level.avatar.y-this.level.avatar.midOffset)/GameData.tileWidth);
		if (yy == this.lane.line){
		//55	console.log("ride " + this.name);
	    	this.ridden=true;
			this.level.avatar.rideWood(this);
		}
	}

}

export default Wood;