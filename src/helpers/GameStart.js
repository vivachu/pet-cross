import GameData from 'helpers/GameData'
import SoundMan from 'helpers/SoundMan';


class GameStart{


	constructor(game,main){
		this.game = game;
		this.main = main;

		this.midx = this.game.width/2;
		this.midy = this.game.height/2;


	 	this.title = game.add.sprite(this.midx,this.midy, 'titlepic');
 		this.main.uiGroup.add(this.title);

	 	this.title.anchor.setTo(0.5,0.5);
 		this.title.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
	 	this.title.fixedToCamera = true;

		this.startButton = this.game.add.button(this.midx,this.midy+(300*GameData.scaleFactor) , 'btstartup', this.startClicked, this, 2, 1, 0);
 		this.main.uiGroup.add(this.startButton);
	 	this.startButton.anchor.setTo(0.5,0.5);
	 	this.startButton.scale.setTo(0.5*GameData.scaleFactor,0.5*GameData.scaleFactor);
		this.startButton.fixedToCamera = true;
	 	this.startButton.cameraOffset.y=1100 * GameData.scaleFactor;
	 	this.startButton.scale.setTo(0);

    	var scale = this.game.add.tween(this.startButton.scale).to( { x:  GameData.scaleFactor, y:  GameData.scaleFactor}, 600, Phaser.Easing.Back.Out, true,1600);
	}

	startClicked(){
		
		var scale = this.game.add.tween(this.startButton.scale).to( { x: 0, y:0}, 600, Phaser.Easing.Back.In, true,0);
   	    var tween = this.game.add.tween(this.title.cameraOffset).to( { y: -1000*GameData.scaleFactor}, 600, Phaser.Easing.Linear.None, true,500);
		tween.onComplete.add(this.endAnimate,this);
	}

	endAnimate(){
		this.main.startLevel();
		this.title.destroy();
		this.startButton.destroy();
	}

}

export default GameStart;