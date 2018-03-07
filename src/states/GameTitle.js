import SoundMan from 'helpers/SoundMan';


class GameTitle extends Phaser.State {

	create() {
		SoundMan.create(this.game);
		//SoundMan.playBGMusic();
		this.game.state.start("Main");
	}


}

export default GameTitle;
