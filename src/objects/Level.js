import GameData from 'helpers/GameData'
import SoundMan from 'helpers/SoundMan'

class Level extends Phaser.Sprite{


	constructor(game, main){

		super(game, 0, 0, '');
		this.main=main;
		this.game=game;
	}
}

export default Level;
