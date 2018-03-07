import GameData from 'helpers/GameData';
import Backend from 'helpers/Backend';

class GameOver{


	constructor(game,main){
		this.game = game;
		this.main = main;
		this.gameOverPlayed=false;
	} 

	
	startGameOverScene(){
		if(this.gameOverPlayed==true) return;
		this.gameOverPlayed=true;

		this.rectBG = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		this.rectBG.beginFill(0x000000, 1);
		this.rectBG.drawRect(0,0,100,100);
		this.rectBG.anchor.setTo(0.5, 0.5);
		this.rectBG.fixedToCamera = true;
		this.rectBG.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG.cameraOffset.y = 0 * GameData.scaleFactor;
		this.rectBG.scale.setTo(this.game.width/100, this.game.height/75);
		this.rectBG.alpha = 0.0;
		var rectBGTween = this.game.add.tween(this.rectBG).to({alpha:0.7}, 500, Phaser.Easing.Linear.None, true);
		
    	this.rays = this.game.add.sprite(this.game.width/2, this.game.height/2, 'raysEnd');
		this.rays.anchor.setTo(0.5);
		this.rays.scale.setTo(GameData.scaleFactor * 1.2);
		this.rays.fixedToCamera = true;
		this.rays.cameraOffset.y = this.game.height/2;
		this.rays.alpha = 0;
		this.rays.scale.setTo(0,0);

		var raysTween1 = this.game.add.tween(this.rays).to({angle:360}, 2000, Phaser.Easing.Linear.None, true, 0, -1);
		var raysTween2 = this.game.add.tween(this.rays).to({alpha:0.6}, 1000, Phaser.Easing.Linear.None, true);
		var raysTween3 = this.game.add.tween(this.rays.scale).to({x:GameData.scaleFactor, y:GameData.scaleFactor}, 200, Phaser.Easing.Linear.None, true);

       	this.imgGot = this.game.add.image(this.game.width/2, this.game.height/2, 'imgGameOver');
    	this.imgGot.scale.setTo(0);
    	this.imgGot.anchor.setTo(0.5,0.5);
    	this.imgGot.y = 300 * GameData.scaleFactor;
    	this.imgGot.x = this.game.width/2;
    	this.imgGot.alpha = 1;
		this.imgGot.fixedToCamera = true;

    	var imgGotTween1 = this.game.add.tween(this.imgGot.scale).to({x:1 * GameData.scaleFactor, y: 1 * GameData.scaleFactor}, 1000, Phaser.Easing.Back.Out, true, 0);


    	var text = "You went " + GameData.playDistance + " steps \n    in " + GameData.playTime + " seconds.";

		this.textGot = this.game.add.bitmapText(0, 0, 'fontOduda', text, 64);
		this.textGot.anchor.setTo(0.5);
		this.textGot.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textGot.fixedToCamera = true;
		//this.textGot.cameraOffset.x = GameData.getx(350);
		this.textGot.cameraOffset.x = this.game.width/2;
		this.textGot.cameraOffset.y = this.game.height/2;
		this.textGot.alpha = 1;



		this.btDoneEnd = this.game.add.button(this.game.width/2, 800 * GameData.scaleFactor, 'imgClaim', this.btDoneEndClicked, this);
		this.btDoneEnd.anchor.setTo(0.5);
		this.btDoneEnd.scale.setTo(0);
		this.btDoneEnd.fixedToCamera = true;
		this.btDoneEnd.cameraOffset.y = 900 * GameData.scaleFactor;
		
		var btDoneEndTween = this.game.add.tween(this.btDoneEnd.scale).to( { x: 1 * GameData.scaleFactor, y: 1 * GameData.scaleFactor}, 600, Phaser.Easing.Back.Out, true, 0);
		

	}

	

	btDoneEndClicked(){
		var rectBGTween3 = this.game.add.tween(this.rectBG).to({alpha:0}, 700, Phaser.Easing.Linear.None, true);
		var raysTween3 = this.game.add.tween(this.rays).to({alpha:0}, 700, Phaser.Easing.Linear.None, true);
		var textGotEnd = this.game.add.tween(this.textGot).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);

		var imgweenEnd = this.game.add.tween(this.imgGot.scale).to( {x: 0, y: 0}, 700, Phaser.Easing.Sinusoidal.Out, true, 0);
		var btDoneEndTweenEnd = this.game.add.tween(this.btDoneEnd.scale).to( {x: 0, y: 0}, 700, Phaser.Easing.Sinusoidal.Out, true, 0);
		
    	btDoneEndTweenEnd.onComplete.add(this.tweenFinished, this);
    	
	}


	tweenFinished(){
			this.main.gameEnded();
	}



}

export default GameOver;