import GameData from 'helpers/GameData'


class Lives extends Phaser.Sprite{

	constructor(game, main){

		super(game, 0, 0, '');
		this.game = game;
		this.main = main;
		this.game.add.existing(this);
 

		this.heart = game.add.sprite(this.game.width-(60*GameData.scaleFactor),60*GameData.scaleFactor, 'iconlive'); 
 		this.heart.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.heart.anchor.setTo(0.5,0.5);
 		this.heart.fixedToCamera = true;

 		this.live1 = game.add.sprite(this.game.width-(130*GameData.scaleFactor),60*GameData.scaleFactor, 'live1'); 
 		this.live1.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.live1.anchor.setTo(0.5,0.5);
 		this.live1.fixedToCamera = true;

 		this.live2 = game.add.sprite(this.game.width-(130*GameData.scaleFactor),60*GameData.scaleFactor, 'live2'); 
 		this.live2.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.live2.anchor.setTo(0.5,0.5);
 		this.live2.fixedToCamera = true;

 		this.live3 = game.add.sprite(this.game.width-(130*GameData.scaleFactor),60*GameData.scaleFactor, 'live3'); 
 		this.live3.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		this.live3.anchor.setTo(0.5,0.5);
 		this.live3.fixedToCamera = true;

 		this.live1.visible=false;
 		this.live2.visible=false;
 		this.live3.visible=false;

	}



	Start(){
		this.pause = false;
 		this.heart.visible=true;
 		this.setValue();
	}

	Pause(){
		this.pause = true;
		
	}

	Stop(){
		this.pause = true;
		
	}


	setValue(){
 		this.live1.visible=false;
 		this.live2.visible=false;
 		this.live3.visible=false;
		if (GameData.lives == 3 ) this.live3.visible=true;
		if (GameData.lives == 2 ) this.live2.visible=true;
		if (GameData.lives == 1 ) this.live1.visible=true;
	}
/*
	toP(val){
		var hasil=val/100*460;
		return this.game.world.centerX-(460-hasil)*GameData.scaleFactor;

	}
*/

	update(){
		if (this.pause) return;
	}

}

export default Lives;