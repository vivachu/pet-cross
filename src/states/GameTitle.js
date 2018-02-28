import Avatar from 'objects/Avatar';
import AvatarTrail from 'objects/AvatarTrail';

class GameTitle extends Phaser.State {

	create() {
		this.startGame();
	}

	startGame() {
		//this.testThing();
		this.game.state.start("Main");
	}

	testThing(){
	}

	actionOnClick () {
	}

}

export default GameTitle;
