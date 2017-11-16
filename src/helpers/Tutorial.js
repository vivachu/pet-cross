import GameData from 'helpers/GameData'


class Tutorial{


	constructor(game, main){
		this.game = game;
		this.main = main;
		this.tutorialFinished = false;

		this.toolDrag = false;
		this.timeLastUseTool = 0;
		this.toolArrowShouldShow = false;
		this.timeMaxUserIdle = 5000;

		

		this.startTutorial();

		
	} 

	startTutorial(){
		

		this.handTutorial = this.game.add.sprite(GameData.getx(150), 1050*GameData.scaleFactor, 'handTutorial');
		this.handTutorial.anchor.setTo(0.5);
		this.handTutorial.scale.setTo(GameData.scaleFactor);
		this.handTutorial.angle = 180;
		this.handTutorial.fixedToCamera = true;
		this.handTutorial.cameraOffset.x = GameData.getx(180);
		//this.handTutorial.cameraOffset.x = GameData.getx(320);
		//this.handTutorial.cameraOffset.x = GameData.getx(470);
		this.handTutorial.cameraOffset.y = 1000*GameData.scaleFactor;
		this.handTutorial.alpha = 0;

		var tween = this.game.add.tween(this.handTutorial.cameraOffset).to({y: 1040*GameData.scaleFactor}, 400, Phaser.Easing.Linear.None, true);
		tween.repeat(-1);
		tween.yoyo(true, 0);
		
	}

	toolsDragStart(){

		this.hideToolArrow();
		this.toolDrag = true;
	}

	toolsDragStop(){

		this.timeLastUseTool = this.game.time.now;
		this.toolDrag = false;
	}



	checkUserIdle(){

		if (this.toolDrag == false && this.game.time.now > this.timeLastUseTool + this.timeMaxUserIdle && this.toolArrowShouldShow == false){


			this.showToolArrow();
		}
	}

	showToolArrow(){

		if (this.main.items.handItemsNum > 0)this.handTutorial.cameraOffset.x = GameData.getx(180);
		else if (this.main.items.trashItemsNum > 0)this.handTutorial.cameraOffset.x = GameData.getx(180);
		else if (this.main.items.spongeItemsNum > 0)this.handTutorial.cameraOffset.x = GameData.getx(320);
		else if (this.main.items.vacuumItemsNum > 0)this.handTutorial.cameraOffset.x = GameData.getx(470);
		else{

			this.handTutorial.alpha = 0;
			return;	
		} 

		this.toolArrowShouldShow = true;
		this.handTutorial.alpha = 1;
		//console.log('idle');
	}

	hideToolArrow(){

		this.toolArrowShouldShow = false;
		this.handTutorial.alpha = 0;
		//console.log('idle not');
	}

	


}

export default Tutorial;