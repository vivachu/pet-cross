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

		this.avatar = new Avatar(this.game, this);
		this.avatar.x=200;
		this.avatar.y=800;
		this.avatar.scale.setTo(0.5,.5);		
		this.tw= this.game.add.tween(this.avatar).to( { y: this.avatar.y-144}, 100, Phaser.Easing.Bounce.InOut, true);
		this.tw.yoyo(true,1000);
		/*
		this.move = this.game.add.sprite(432, 144, 'move1');
   	 	this.jump = this.move.animations.add('walk');
   	 	this.move.animations.play('walk', 6, false);
*/

	}

	actionOnClick () {
    	console.log("dsdfds");
	}

}

export default GameTitle;
