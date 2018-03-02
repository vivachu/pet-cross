import GameData from 'helpers/GameData'


class Tutorial{


	constructor(game,level){
		this.game = game;
		this.level = level;
		this.tutorialFinished = false;
		//this.startTutorial();
		//this.level.startGame();
	} 

	startTutorial(){			
		this.tips1 = this.game.add.sprite(this.game.width/2*GameData.scaleFactor, this.game.height/2*GameData.scaleFactor, 'imgTips2');
		this.tips1.anchor.setTo(0.5);
		this.tips1.scale.setTo(GameData.scaleFactor);
		this.tips1.fixedToCamera = true;
		this.tips1.alpha = 0;

		this.tapEffect = this.game.add.sprite(((this.game.width/2)-50)*GameData.scaleFactor, ((this.game.width/2)-10)*GameData.scaleFactor, 'tapEffect');
		this.tapEffect.anchor.setTo(0.5);
		this.tapEffect.scale.setTo(GameData.scaleFactor);
		this.tapEffect.alpha = 1;

		this.tapEffect.fixedToCamera = true;
		this.tapEffect.scale.setTo(0);

		var tips1Tween1 = this.game.add.tween(this.tips1).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0);

		this.hand = this.game.add.sprite(this.game.width/2*GameData.scaleFactor, this.game.height/2*GameData.scaleFactor, 'hand');
		this.hand.anchor.setTo(0.5);
		this.hand.scale.setTo(GameData.scaleFactor);
		this.hand.angle = -45;
		this.hand.fixedToCamera = true;
		this.hand.cameraOffset.x = GameData.getx(100);
		this.hand.cameraOffset.y = 550*GameData.scaleFactor;
		this.hand.alpha = 0;

		var handTween1 = this.game.add.tween(this.hand).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true, 500);
		
		handTween1.onComplete.add(this.tweenStep2, this);

	}

	tweenStep2(){

		var handTween2a = this.game.add.tween(this.hand).to({angle: -20}, 300, Phaser.Easing.Linear.None, true, 200);
		var handTween2b = this.game.add.tween(this.hand.cameraOffset).to({x: GameData.getx(130), y: 520*GameData.scaleFactor}, 300, Phaser.Easing.Linear.None, true, 200);

		var handTween3a = this.game.add.tween(this.hand).to({angle: -45}, 300, Phaser.Easing.Linear.None);
		var handTween3b = this.game.add.tween(this.hand.cameraOffset).to({x: GameData.getx(100), y: 550*GameData.scaleFactor}, 300, Phaser.Easing.Linear.None);

		handTween2a.chain(handTween3a);
		handTween2b.chain(handTween3b);

		var tapTween1 = this.game.add.tween(this.tapEffect.scale).to({x: 1.5*GameData.scaleFactor, y:1.5*GameData.scaleFactor}, 200, Phaser.Easing.Linear.None);
		handTween3a.chain(tapTween1);

		var tapTween2 = this.game.add.tween(this.tapEffect).to({alpha:0}, 100, Phaser.Easing.Linear.None);
		tapTween1.chain(tapTween2);

		
		tapTween2.onComplete.add(this.tweenStep3, this);

	}

	tweenStep3(){
    	this.game.time.events.add(Phaser.Timer.SECOND * 1, this.timeEvent, this)
	}

	timeEvent(){

		this.tutorialFinished = true;
		var tipEndx = this.game.add.tween(this.tips1).to({alpha:0}, 600, Phaser.Easing.Linear.None, true, 0);
		var tapEndx = this.game.add.tween(this.tapEffect).to({alpha:0}, 600, Phaser.Easing.Linear.None, true, 0);
		var handEndx = this.game.add.tween(this.hand).to({alpha:0}, 600, Phaser.Easing.Linear.None, true, 0);

		handEndx.onComplete.add(this.endAnimate,this);
	}

	endAnimate(){

		this.tips1.destroy();
		this.tapEffect.destroy();
		this.hand.destroy();
		this.level.startGame();
	}



}

export default Tutorial;