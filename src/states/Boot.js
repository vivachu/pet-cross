
import Backend from 'helpers/Backend';

class Boot extends Phaser.State {

	preload() {

		this.game.load.image('loaderborder', 'assets/pics/loader-border.png');
		this.game.load.image('loaderfill', 'assets/pics/loader-fill.png');
		this.game.load.bitmapFont('fontOduda', 'assets/font/oduda.png', 'assets/font/oduda.fnt');
	}

	create() {

		this.scale.scaleMode = Phaser.ScaleManager.RESIZE;


		Backend.create(this.game);

		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.game.state.start("Preload");
	}

}

export default Boot;