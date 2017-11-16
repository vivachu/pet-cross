import GameData from 'helpers/GameData'


class PopUp extends Phaser.Sprite{

	constructor(game, main){

		super(game, 0, 0, '');
		this.game = game;
		this.main = main;
		this.game.add.existing(this);


	}



}

export default PopUp;