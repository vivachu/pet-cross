import GameData from 'helpers/GameData'


class AvatarTrail extends Phaser.Sprite{

	constructor(game, level, avatar){

		super(game, avatar.x,avatar.y, 'move1');
		this.game = game;
		this.level = level;
		this.avatar = avatar;
		this.anchor.setTo(0.5,0.5);
		this.width=this.avatar.width*2;
		this.height=this.avatar.height*2;
		this.game.add.existing(this);
		this.level.main.bonusGroup.add(this);
   	 	this.jump = this.animations.add('walk');
   	 	this.updatePos();

   	 	//console.log(this.avatar.y + " , " + this.y);
	}

	updatePos(){
		this.animations.stop();
		this.x=this.avatar.x;
		this.y=this.avatar.y;
   	 	this.animations.play('walk', 12, false);

	}
}

export default AvatarTrail;