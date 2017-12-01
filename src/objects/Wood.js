import GameData from 'helpers/GameData'


class Wood extends Phaser.Sprite{

	constructor(game,level,lane,xpos, ypos){
		super(game, xpos,ypos,'log'+game.rnd.integerInRange(1,4));
		this.level=level;
		this.game = level.game;
		this.land = level.land;
		this.lane = lane;
		this.arah = lane.arah;
		this.game.add.existing(this);
		this.land.level.woodGroup.add(this);
		this.triggerOther = false;

		this.scale.x=GameData.scaleFactor;
		this.scale.y=GameData.scaleFactor;
	//this.width=GameData.scaleFactor*72;
		//this.height=GameData.scaleFactor*72;
 		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.immovable = false;
    	this.body.collideWorldBounds = true;
    	this.body.bounce.setTo(1, 1);



	}


	update(){
		if (GameData.gameState==1){
			this.x+=this.arah*this.lane.laneSpeed;
			this.game.physics.arcade.collide(this, this.level.avatar, this.collisionHandler, null, this);
			if (this.arah==1){
				if (this.x>=GameData.boundsWidth-this.width) this.x=0;
			}else{
				if (this.x<=0) this.x=GameData.boundsWidth-GameData.tileWidth;
			}
		}
	}

	collisionHandler(){
		if (this.level.avatar.rideObject!=null || this.level.avatar.ready==false) return;
		var yy=Math.round(this.level.avatar.y/GameData.tileWidth);
		if (yy == this.lane.line){
			this.level.avatar.rideWood(this);
	//		this.level.gameOver();	
		}
	}

}

export default Wood;