import GameData from 'helpers/GameData'


class Avatar extends Phaser.Sprite{

	constructor(game, level){

		super(game, game.world.centerX, game.world.centerY, 'petBorder');
		this.game = game;
		this.level = level;
		this.game.add.existing(this);
		this.anchor.setTo(0.26,0.5);
 		this.scale.setTo(GameData.scaleFactor*0.35,GameData.scaleFactor*0.35);
 		this.position.setTo(game.world.centerX-170*GameData.scaleFactor,game.world.centerY-60*GameData.scaleFactor);

	    this.avatar = game.add.sprite(this.game.world.centerX-120*GameData.scaleFactor,this.game.world.centerY-60*GameData.scaleFactor, 'avatar');
	 	this.avatar.anchor.setTo(0.5,0.5);
 		this.avatar.scale.setTo(GameData.scaleFactor*0.4,GameData.scaleFactor*0.4);

	}

}

export default Avatar;