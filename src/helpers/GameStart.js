import GameData from 'helpers/GameData'

class GameStart{


	constructor(game,level){
		this.game = game;
		this.level = level;

		/*
		this.graphics = game.add.graphics(0, 0);
	    this.graphics.lineStyle(1, 0x000000, 1);
        this.graphics.beginFill(0xF000000);
        this.graphics.drawRect(0,0 , this.game.width,this.game.height);
    	this.graphics.alpha=0.6;
    	this.graphics.fixedToCamera = true;
	    window.graphics = this.graphics;
		*/

	 	this.title = game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'titlepic');
	 	this.title.anchor.setTo(0.5,0.5);
//	 	this.title.width = this.game.width;
//	 	this.title.height = this.game.height;
 		this.title.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
	 	this.title.fixedToCamera = true;
//	 	this.title.cameraOffset.y=-200;
	 	
//    	var tween = this.game.add.tween(this.title.cameraOffset).to( { y: 450*GameData.scaleFactor}, 600, Phaser.Easing.Back.Out, true,1000);
    	this.showStartButton();
	} 

	showStartButton(){

		this.startButton = this.game.add.button(this.game.world.centerX,950 * GameData.scaleFactor, 'btstartup', this.startClicked, this, 2, 1, 0);
	 	this.startButton.anchor.setTo(0.5,0.5);
	 	this.startButton.scale.setTo(0.5*GameData.scaleFactor,0.5*GameData.scaleFactor);
		this.startButton.fixedToCamera = true;
	 	this.startButton.cameraOffset.y=1100 * GameData.scaleFactor;
	 	this.startButton.scale.setTo(0);

    	var scale = this.game.add.tween(this.startButton.scale).to( { x:  GameData.scaleFactor, y:  GameData.scaleFactor}, 600, Phaser.Easing.Back.Out, true,1600);
	}

	startClicked(){
		this.level.prepareGame();
    	var scale = this.game.add.tween(this.startButton.scale).to( { x: 0, y:0}, 600, Phaser.Easing.Back.In, true,0);
    	var tween = this.game.add.tween(this.title.cameraOffset).to( { y: -600*GameData.scaleFactor}, 600, Phaser.Easing.Back.In, true,500);

//  	  	tween.onComplete.add(this.endAnimate,this);
	}

	//imediately set title offscreen and start game when skip button is pressed
	byPassFromSkip(){

		var tween = this.game.add.tween(this.title.cameraOffset).to( { y: -200 * GameData.scaleFactor}, 600, Phaser.Easing.Back.In, true,500);

  	  	tween.onComplete.add(this.endAnimate,this);
	}

	endAnimate(){
		//this.graphics.clear();
    	this.level.startGame();	// did not know how to create event yet, change later

	}

}

export default GameStart;