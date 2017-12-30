import GameData from 'helpers/GameData';
import SoundMan from 'helpers/SoundMan';

class GameFinished{


	constructor(game,level){
		this.game = game;
		this.level = level;

		
		this.countx = 0;
		this.countxStep = 5;

	} 

	showCoins(cbt, cba, pn, piurl, puiurl, pb, pin, csil, cgol, ngm, uiu, uin){

		
		this.coinBonusType = cbt;
		this.coinBonusAmout = cba;
		//this.coinBonusAmout = 100;
		this.petName = pn;
		this.pointBonus = pb;
		this.petUserImageUrl = puiurl;
		this.petUserInitial = pin;

		this.userInitial = uin;
		this.userImageUrl = uiu;
		
		this.nextGame = ngm;
		this.currentSilverStart = csil;
		this.currentGoldStart = cgol;
		this.currentSilverFin = csil;
		this.currentGoldFin = cgol;

		this.coinAddStep = 1;
		if (this.coinBonusType == 'silver'){

			this.currentSilverStart = this.currentSilverStart - this.coinBonusAmout;
			this.coinAddStep = Math.floor((this.currentSilverFin - this.currentSilverStart)/20);

		}else {

			this.currentGoldStart = this.currentGoldStart - this.coinBonusAmout;
			this.coinAddStep = Math.floor((this.currentGoldFin - this.currentGoldStart)/20);
		}

		if (this.coinAddStep < 1)this.coinAddStep = 1;

		this.coinAnim = false;
		this.nextGameAnim = false;
		this.nextGameTick = 0;

	//	var cbamax = this.coinBonusAmout;
	//	if (cbamax > 100)cbamax = 100;

	//	this.countxStep = 100/cbamax;
		this.countxStep = 3;

		//this.nextGame = 'Walk Donavan in 1 h 0 m '; //debug
		//this.nextGame = 'Walk Coder in 6 h 0 m ';

		if (this.nextGame != ""){

			//var arNextGame = this.nextGame.split(" ");

			
			//this.nextGameHour = parseInt(arNextGame[3]);
			//this.nextGameMinute = parseInt(arNextGame[5]);

			this.nextGameSecond = 59;
			this.nextGameMessage = this.nextGame + this.nextGameSecond + ' sec';
		}
		

		//console.log('pin ' + pin);

		//this.petImageUrl = Backend.assetUrl + "images/" + ppid + "/medium.jpg";
		//this.ownerImageUrl = Backend.assetUrl + "images/" + pupid + "/medium.jpg";
		
		//console.log('url ' + this.petImageUrl);
		//console.log('url ' + this.ownerImageUrl);

		this.game.load.onLoadComplete.add(this.loadComplete, this);

		this.game.load.image('petImage', piurl);

		if (this.petUserImageUrl != "null")this.game.load.image('ownerImage', puiurl);
		if (this.userImageUrl != "null")this.game.load.image('userImage', uiu);

		this.game.load.start();
	}

	loadComplete() {

		//console.log('complete');
		this.startEndingScene();
	}

	startEndingScene(){

		console.log('cam 2' + this.game.camera.x + ', ' + this.game.camera.y) ;

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
	 	//this.winBanner.cameraOffset.y=-200*GameData.scaleFactor;

    // graphics.lineStyle(2, 0xffd900, 1);

    	this.emitter = this.game.add.emitter((this.game.camera.x + this.game.width/2) * 1/GameData.scaleFactor, this.game.camera.y * 1/GameData.scaleFactor, 100);
		this.emitter.fixedToCamera = true;
		this.emitter.scale.setTo(GameData.scaleFactor);

		this.emitter.makeParticles(['confetti1', 'confetti2', 'confetti3', 'confetti4', 'confetti5', 'confetti6']);
		//this.emitter.cameraOffset.x = this.game.width/2;
		//this.emitter.cameraOffset.y = 1000;

		//this.emitter.setScale(0.48 * GameData.scaleFactor, 0.5 * GameData.scaleFactor, 0.48 * GameData.scaleFactor, 0.5 * GameData.scaleFactor);

		this.emitter.minParticleSpeed.setTo(-100*GameData.scaleFactor, -300*GameData.scaleFactor);
	    this.emitter.maxParticleSpeed.setTo(100*GameData.scaleFactor, 300*GameData.scaleFactor);
	    this.emitter.gravity = 70;
	    this.emitter.start(true, 15000, null, 120);


		this.coinEndAsset = 'goldCoinEnd';
		if (this.coinBonusType == 'silver')this.coinEndAsset = 'silverCoinEnd';

		this.winBanner = this.game.add.sprite(this.game.width/2,300, 'imgGreatJob');
	 	this.winBanner.anchor.setTo(0.5,0.5);
		this.winBanner.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
	 	this.winBanner.fixedToCamera = true;
	 	this.winBanner.cameraOffset.y=-200*GameData.scaleFactor;
	 	
    	var bannerTween1 = this.game.add.tween(this.winBanner.cameraOffset).to( { y: 150*GameData.scaleFactor}, 1500, Phaser.Easing.Back.Out, true);



		this.rays = this.game.add.sprite(this.game.width/2, 300 * GameData.scaleFactor, 'raysEnd');
		this.rays.anchor.setTo(0.5);
		this.rays.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.rays.fixedToCamera = true;
		this.rays.cameraOffset.y = 400 * GameData.scaleFactor;
		this.rays.alpha = 0;
		this.rays.scale.setTo(0,0);

		var raysTween1 = this.game.add.tween(this.rays).to({angle:360}, 2000, Phaser.Easing.Linear.None, true, 0, -1);
		var raysTween2 = this.game.add.tween(this.rays).to({alpha:0.6}, 1000, Phaser.Easing.Linear.None, true);
		var raysTween3 = this.game.add.tween(this.rays.scale).to({x:GameData.scaleFactor, y:GameData.scaleFactor}, 200, Phaser.Easing.Linear.None, true);


		this.coinEnd = this.game.add.sprite(this.game.width/2, 300 * GameData.scaleFactor, this.coinEndAsset);
		this.coinEnd.anchor.setTo(0.5);
		this.coinEnd.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.coinEnd.fixedToCamera = true;
		this.coinEnd.cameraOffset.y = 400 * GameData.scaleFactor;
		this.coinEnd.alpha = 0;
		this.coinEnd.scale.setTo(0,0);

		var coinEndTween1 = this.game.add.tween(this.coinEnd).to({alpha:1}, 1000, Phaser.Easing.Linear.None, true);
		var coinEndTween2 = this.game.add.tween(this.coinEnd.scale).to({x:GameData.scaleFactor, y:GameData.scaleFactor}, 200, Phaser.Easing.Linear.None, true);


    	this.textGot = this.game.add.bitmapText(0, 0, 'fontOduda', 'You got', 48);
		this.textGot.anchor.setTo(0.5);
		this.textGot.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textGot.fixedToCamera = true;
		//this.textGot.cameraOffset.x = GameData.getx(350);
		this.textGot.cameraOffset.x = this.game.width/2;
		this.textGot.cameraOffset.y = 250 * GameData.scaleFactor;
		this.textGot.alpha = 0;

		var textGotTween1 = this.game.add.tween(this.textGot).to({alpha:1}, 800, Phaser.Easing.Linear.None, true, 1000);


		this.coinAmountString = '+ ' + this.coinBonusAmout;
		this.textCoinEnd = this.game.add.bitmapText(0, 0, 'fontOduda', this.coinAmountString, 64);
		this.textCoinEnd.anchor.setTo(0.5);
		this.textCoinEnd.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textCoinEnd.fixedToCamera = true;
		//this.textCoinEnd.cameraOffset.x = GameData.getx(350);
		this.textCoinEnd.cameraOffset.x = this.game.width/2;
		this.textCoinEnd.cameraOffset.y = 590 * GameData.scaleFactor;
		this.textCoinEnd.alpha = 0;

		var textCoinEndTween1 = this.game.add.tween(this.textCoinEnd).to({alpha:1}, 800, Phaser.Easing.Linear.None, true, 1000);

		//bottom part

		this.rectBG2 = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		this.rectBG2.beginFill(0x323234, 1);
		this.rectBG2.drawRect(0,0,100,100);
		this.rectBG2.anchor.setTo(0.5, 0);
		this.rectBG2.fixedToCamera = true;
		this.rectBG2.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG2.cameraOffset.y = 1240 * GameData.scaleFactor;
		this.rectBG2.scale.setTo(this.game.width/100, this.game.height/150);
		this.rectBG2.alpha = 0;

		var rectBG2Tween = this.game.add.tween(this.rectBG2.cameraOffset).to( { y: 640 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var rectBG2Tween2 = this.game.add.tween(this.rectBG2).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.rectBG2Line = this.game.add.graphics(this.game.world.centerX,this.game.world.centerY);
	    this.rectBG2Line.lineStyle(2 * GameData.scaleFactor, 0x98979e, 1);
	    this.rectBG2Line.moveTo(0, 0);  
	    this.rectBG2Line.lineTo(this.game.width, 0);
	    this.rectBG2Line.anchor.setTo(0.5, 0.5);
		this.rectBG2Line.fixedToCamera = true;
		this.rectBG2Line.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG2Line.cameraOffset.y = 1240 * GameData.scaleFactor;
		this.rectBG2Line.alpha = 0;

		var rectBG2LineTween = this.game.add.tween(this.rectBG2Line.cameraOffset).to( { y: 640 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var rectBG2LineTween2 = this.game.add.tween(this.rectBG2Line).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);


		this.rectBG3Line = this.game.add.graphics(this.game.world.centerX,this.game.world.centerY);
	    this.rectBG3Line.lineStyle(2 * GameData.scaleFactor, 0x1d1d1e, 1);
	    this.rectBG3Line.moveTo(0, 0);  
	    this.rectBG3Line.lineTo(this.game.width, 0);
	    this.rectBG3Line.anchor.setTo(0.5, 0.5);
		this.rectBG3Line.fixedToCamera = true;
		this.rectBG3Line.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG3Line.cameraOffset.y = 1360 * GameData.scaleFactor;
		this.rectBG3Line.alpha = 0;

		var rectBG3LineTween = this.game.add.tween(this.rectBG3Line.cameraOffset).to( { y: 760 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var rectBG3LineTween2 = this.game.add.tween(this.rectBG3Line).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);


		this.boxBorder = this.game.add.sprite(this.game.width/2 + 20 * GameData.scaleFactor, 800 * GameData.scaleFactor, 'boxBorder');
		this.boxBorder.anchor.setTo(0.5);
		this.boxBorder.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.boxBorder.fixedToCamera = true;
		this.boxBorder.cameraOffset.y = 1300 * GameData.scaleFactor;
		this.boxBorder.alpha = 0;

		var boxBorderTween = this.game.add.tween(this.boxBorder.cameraOffset).to( { y: 700 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var boxBorderTween2 = this.game.add.tween(this.boxBorder).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		boxBorderTween.onComplete.add(this.startCoinAnim, this);
		
		this.newSilverCoinText = this.game.add.bitmapText(this.game.width/2, 0, 'fontOduda', this.currentSilverStart, 25);
		this.newSilverCoinText.anchor.setTo(0.5);
		this.newSilverCoinText.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.newSilverCoinText.fixedToCamera = true;
		this.newSilverCoinText.cameraOffset.x = this.game.width/2  - 15 * GameData.scaleFactor;
		this.newSilverCoinText.cameraOffset.y = 1305 * GameData.scaleFactor;
		this.newSilverCoinText.alpha = 0;

		var newSilverCoinTextTween = this.game.add.tween(this.newSilverCoinText.cameraOffset).to( { y: 705 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var newSilverCoinTextTween2 = this.game.add.tween(this.newSilverCoinText).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.newGoldCoinText = this.game.add.bitmapText(this.game.width/2, 0, 'fontOduda', this.currentGoldStart, 25);
		this.newGoldCoinText.anchor.setTo(0.5);
		this.newGoldCoinText.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.newGoldCoinText.fixedToCamera = true;
		this.newGoldCoinText.cameraOffset.x = this.game.width/2  + 120 * GameData.scaleFactor;
		this.newGoldCoinText.cameraOffset.y = 1305 * GameData.scaleFactor;
		this.newGoldCoinText.alpha = 0;

		var newGoldCoinTextTween = this.game.add.tween(this.newGoldCoinText.cameraOffset).to( { y: 705 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var newGoldCoinTextTween2 = this.game.add.tween(this.newGoldCoinText).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);





		this.petAvatarBase = this.game.add.sprite(this.game.width/2, 800 * GameData.scaleFactor, 'avatarBase');
		this.petAvatarBase.anchor.setTo(0.5);
		this.petAvatarBase.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.petAvatarBase.fixedToCamera = true;
		this.petAvatarBase.cameraOffset.y = 1480 * GameData.scaleFactor;
		this.petAvatarBase.alpha = 0;

		var petAvatarBaseTween = this.game.add.tween(this.petAvatarBase.cameraOffset).to( { y: 880 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var petAvatarBaseTween2 = this.game.add.tween(this.petAvatarBase).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.petAva = this.game.add.sprite(this.game.width/2, 800 * GameData.scaleFactor, 'petImage');
		this.petAva.anchor.setTo(0.5);
		this.petAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.petAva.fixedToCamera = true;
		this.petAva.cameraOffset.y = 1480 * GameData.scaleFactor;
		this.petAva.alpha = 0;
		this.petAva.scale.setTo(0.42 * GameData.scaleFactor, 0.42 * GameData.scaleFactor);


		this.petAvaMask = this.game.add.graphics(this.game.width/2, this.game.world.centerY);
		this.petAvaMask.beginFill(0xffffff);
		this.petAvaMask.drawCircle(0, 0, 160 * GameData.scaleFactor);
		this.petAvaMask.anchor.setTo(0.5, 0.5);
		this.petAvaMask.fixedToCamera = true;
		this.petAvaMask.cameraOffset.x = this.game.width/2;
		this.petAvaMask.cameraOffset.y = 1480 * GameData.scaleFactor;
		
		//console.log('sf ' + GameData.scaleFactor);

		this.petAva.mask = this.petAvaMask;

		var petAvaTween = this.game.add.tween(this.petAva.cameraOffset).to( { y: 880 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var petAvaMaskTween = this.game.add.tween(this.petAvaMask.cameraOffset).to( { y: 880 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var petAvaTween2 = this.game.add.tween(this.petAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);
		//var petAvaMaskTween2 = this.game.add.tween(this.petAvaMask).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.petNameString = this.petName + ' got';
		this.textPetName = this.game.add.bitmapText(0, 0, 'fontOduda', this.petNameString, 38);
		this.textPetName.anchor.setTo(0.5);
		this.textPetName.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPetName.fixedToCamera = true;
		this.textPetName.cameraOffset.x = this.game.width/2;
		this.textPetName.cameraOffset.y = 1610 * GameData.scaleFactor;
		
		var petNameTween = this.game.add.tween(this.textPetName.cameraOffset).to( { y: 1010 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);


		this.userAvaBase = this.game.add.sprite(this.game.width/2, 800 * GameData.scaleFactor, 'avatarBase');
		this.userAvaBase.anchor.setTo(0.5);
		this.userAvaBase.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.userAvaBase.fixedToCamera = true;
		//this.userAvaBase.cameraOffset.x = GameData.getx(310);
		this.userAvaBase.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
		this.userAvaBase.cameraOffset.y = 1425 * GameData.scaleFactor;
		this.userAvaBase.alpha = 0;
		this.userAvaBase.scale.setTo(0.5 * GameData.scaleFactor, 0.5 * GameData.scaleFactor);

		var userAvaBaseTween = this.game.add.tween(this.userAvaBase.cameraOffset).to( { y: 825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var userAvaBaseTween2 = this.game.add.tween(this.userAvaBase).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);
		
		this.userAva = null;
		this.userAvaMask = null;

		
		if (this.petUserImageUrl != "null"){//if user pic url is available

			this.userAva = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'ownerImage');
			this.userAva.anchor.setTo(0.5);
			this.userAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva.fixedToCamera = true;
			this.userAva.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
			this.userAva.cameraOffset.y = 1425 * GameData.scaleFactor;
			this.userAva.alpha = 0;
			this.userAva.scale.setTo(0.21 * GameData.scaleFactor, 0.21 * GameData.scaleFactor);

			this.userAvaMask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaMask.beginFill(0xffffff);
			this.userAvaMask.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaMask.anchor.setTo(0.5, 0.5);
			this.userAvaMask.fixedToCamera = true;
			this.userAvaMask.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
			this.userAvaMask.cameraOffset.y = 1425 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva.mask = this.userAvaMask;

			var userAvaTween = this.game.add.tween(this.userAva.cameraOffset).to( { y: 825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaMaskTween = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaTween2 = this.game.add.tween(this.userAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);
			

		}else{//if user pic url is not available

			this.userAvaBG = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaBG.beginFill(0xB59CFF);
			this.userAvaBG.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaBG.anchor.setTo(0.5, 0.5);
			this.userAvaBG.fixedToCamera = true;
			this.userAvaBG.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
			this.userAvaBG.cameraOffset.y = 1425 * GameData.scaleFactor;
			this.userAvaBG.alpha = 0;

			var userAvauserAvaBGTween = this.game.add.tween(this.userAvaBG.cameraOffset).to( { y: 825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvauserAvaBGTween2 = this.game.add.tween(this.userAvaBG).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

			this.userAva = this.game.add.bitmapText(0, 0, 'fontOduda', this.petUserInitial, 38);
			this.userAva.anchor.setTo(0.5);
			this.userAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva.fixedToCamera = true;
			this.userAva.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
			this.userAva.cameraOffset.y = 1428 * GameData.scaleFactor;
			this.userAva.alpha = 0;
			
			this.userAvaMask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaMask.beginFill(0xffffff);
			this.userAvaMask.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaMask.anchor.setTo(0.5, 0.5);
			this.userAvaMask.fixedToCamera = true;
			this.userAvaMask.cameraOffset.x = this.game.width/2 - 90 * GameData.scaleFactor;
			this.userAvaMask.cameraOffset.y = 1425 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva.mask = this.userAvaMask;

			var userAvaTween = this.game.add.tween(this.userAva.cameraOffset).to( { y: 828 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaMaskTween = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaTween2 = this.game.add.tween(this.userAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		}


		if (this.userImageUrl != "null"){

			this.userAva2 = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'userImage');
			this.userAva2.anchor.setTo(0.5);
			this.userAva2.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva2.fixedToCamera = true;
			this.userAva2.cameraOffset.x = this.game.width/2 - 159 * GameData.scaleFactor;
			this.userAva2.cameraOffset.y = 1305 * GameData.scaleFactor;
			this.userAva2.alpha = 0;
			this.userAva2.scale.setTo(0.21 * GameData.scaleFactor, 0.21 * GameData.scaleFactor);

			this.userAva2Mask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAva2Mask.beginFill(0xffffff);
			this.userAva2Mask.drawCircle(0, 0, 81 * GameData.scaleFactor);
			this.userAva2Mask.anchor.setTo(0.5, 0.5);
			this.userAva2Mask.fixedToCamera = true;
			this.userAva2Mask.cameraOffset.x = this.game.width/2 - 159 * GameData.scaleFactor;
			this.userAva2Mask.cameraOffset.y = 1305 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva2.mask = this.userAva2Mask;
			

			var userAva2Tween = this.game.add.tween(this.userAva2.cameraOffset).to( { y: 698 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAva2MaskTween = this.game.add.tween(this.userAva2Mask.cameraOffset).to( { y: 698 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAva2Tween2 = this.game.add.tween(this.userAva2).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		}else{

			this.userAva2BG = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAva2BG.beginFill(0xB59CFF);
			this.userAva2BG.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAva2BG.anchor.setTo(0.5, 0.5);
			this.userAva2BG.fixedToCamera = true;
			this.userAva2BG.cameraOffset.x = this.game.width/2 - 159 * GameData.scaleFactor;
			this.userAva2BG.cameraOffset.y = 1305 * GameData.scaleFactor;
			this.userAva2BG.alpha = 0;

			var userAvauserAva2BGTween = this.game.add.tween(this.userAva2BG.cameraOffset).to( { y: 698 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvauserAva2BGTween2 = this.game.add.tween(this.userAva2BG).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

			this.userAva2 = this.game.add.bitmapText(0, 0, 'fontOduda', this.userInitial, 38);
			this.userAva2.anchor.setTo(0.5);
			this.userAva2.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva2.fixedToCamera = true;
			this.userAva2.cameraOffset.x = this.game.width/2 - 159 * GameData.scaleFactor;
			this.userAva2.cameraOffset.y = 1308 * GameData.scaleFactor;
			this.userAva2.alpha = 0;
			
			this.userAva2Mask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAva2Mask.beginFill(0xffffff);
			this.userAva2Mask.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAva2Mask.anchor.setTo(0.5, 0.5);
			this.userAva2Mask.fixedToCamera = true;
			this.userAva2Mask.cameraOffset.x = this.game.width/2 - 159 * GameData.scaleFactor;
			this.userAva2Mask.cameraOffset.y = 1305 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva2.mask = this.userAva2Mask;
			

			var userAva2Tween = this.game.add.tween(this.userAva2.cameraOffset).to( { y: 701 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAva2MaskTween = this.game.add.tween(this.userAva2Mask.cameraOffset).to( { y: 698 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAva2Tween2 = this.game.add.tween(this.userAva2).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		}
		

		
		this.starEnd = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'starEnd');
		this.starEnd.anchor.setTo(0.5);
		this.starEnd.scale.setTo(GameData.scaleFactor * 0.6,GameData.scaleFactor * 0.6);
		this.starEnd.fixedToCamera = true;
		this.starEnd.cameraOffset.x = this.game.width/2 - 65 * GameData.scaleFactor;
		this.starEnd.cameraOffset.y = 1665 * GameData.scaleFactor;
		this.starEnd.alpha = 1;

		var starEndTween = this.game.add.tween(this.starEnd.cameraOffset).to( { y: 1065 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);


		this.textPointEnd1 = this.game.add.bitmapText(0, 0, 'fontOduda', '+', 50);
		this.textPointEnd1.anchor.setTo(0.5);
		this.textPointEnd1.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPointEnd1.fixedToCamera = true;
		this.textPointEnd1.cameraOffset.x = this.game.width/2 - 15 * GameData.scaleFactor;
		this.textPointEnd1.cameraOffset.y = 1670 * GameData.scaleFactor;

		var textPointEnd1Tween = this.game.add.tween(this.textPointEnd1.cameraOffset).to( { y: 1070 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);

		//console.log('pb ' + this.pointBonus);
		
		this.textPointEnd2 = this.game.add.bitmapText(0, 0, 'fontOduda', String(this.pointBonus), 50);
		this.textPointEnd2.anchor.setTo(0.5);
		this.textPointEnd2.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPointEnd2.fixedToCamera = true;
		//this.textPointEnd2.cameraOffset.x = GameData.getx(415);
		this.textPointEnd2.cameraOffset.x = this.game.width/2 + this.textPointEnd2.width/2;
		this.textPointEnd2.cameraOffset.y = 1672 * GameData.scaleFactor;

		var textPointEnd2Tween = this.game.add.tween(this.textPointEnd2.cameraOffset).to( { y: 1072 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		

		this.btDoneEnd = this.game.add.button(this.game.width/2, 800 * GameData.scaleFactor, 'btDoneEnd', this.btDoneEndClicked, this);
		this.btDoneEnd.anchor.setTo(0.5);
		this.btDoneEnd.scale.setTo(GameData.scaleFactor * 0.8,GameData.scaleFactor * 0.8);
		this.btDoneEnd.fixedToCamera = true;
		this.btDoneEnd.cameraOffset.y = 1750 * GameData.scaleFactor;
		
		var btDoneEndTween = this.game.add.tween(this.btDoneEnd.cameraOffset).to( { y: 1150 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		
		this.clockEnd = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'clockEnd');
		this.clockEnd.anchor.setTo(0.5);
		this.clockEnd.scale.setTo(GameData.scaleFactor * 1,GameData.scaleFactor * 1);
		this.clockEnd.fixedToCamera = true;
		this.clockEnd.cameraOffset.x = this.game.width/2 - 235 * GameData.scaleFactor;
		this.clockEnd.cameraOffset.y = 1825 * GameData.scaleFactor;
		this.clockEnd.angle = -30;
		this.clockEnd.alpha = 0;

		if (this.nextGame != "")this.clockEnd.alpha = 1;

		var clockEndTween = this.game.add.tween(this.clockEnd.cameraOffset).to( { y: 1225 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);


		var nextGameMessageComplete = "";
		if (this.nextGame != "")nextGameMessageComplete = this.nextGameMessage;
		 
		this.nextGameText = this.game.add.bitmapText(0, 0, 'fontOduda', this.nextGameMessage, 30);
		this.nextGameText.anchor.setTo(0, 0.5);
		this.nextGameText.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.nextGameText.fixedToCamera = true;
		this.nextGameText.cameraOffset.x = this.game.width/2 - this.nextGameText.width/2;
		this.nextGameText.cameraOffset.y = 1830 * GameData.scaleFactor;
		this.nextGameText.tint = 0xf5a623;

		var nextGameTextTween = this.game.add.tween(this.nextGameText.cameraOffset).to( { y: 1230 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		nextGameTextTween.onComplete.add(this.nextGameEndTween, this);

	}

	

	btDoneEndClicked(){

		console.log('clicked');

		var winBannerEnd = this.game.add.tween(this.winBanner.cameraOffset).to( { y: -200*GameData.scaleFactor}, 1500, Phaser.Easing.Back.Out, true);
		var raysEnd = this.game.add.tween(this.rays).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
		var coinsEnd = this.game.add.tween(this.coinEnd).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
		var textGotEnd = this.game.add.tween(this.textGot).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);
		var textCoinEnd = this.game.add.tween(this.textCoinEnd).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true);

		var rectBG2TweenEnd = this.game.add.tween(this.rectBG2.cameraOffset).to( { y: 1280 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var rectBG2LineTweenEnd = this.game.add.tween(this.rectBG2Line.cameraOffset).to( { y: 1280 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var rectBG3LineTweenEnd = this.game.add.tween(this.rectBG3Line.cameraOffset).to( { y: 1280 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var avatarBaseTweenEnd = this.game.add.tween(this.petAvatarBase.cameraOffset).to( { y: 1430 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var petAvaTweenEnd = this.game.add.tween(this.petAva.cameraOffset).to( { y: 1430 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var petAvaMaskTweenEnd = this.game.add.tween(this.petAvaMask.cameraOffset).to( { y: 1430 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var petNameTweenEnd = this.game.add.tween(this.textPetName.cameraOffset).to( { y: 1560 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var userAvaBaseTweenEnd = this.game.add.tween(this.userAvaBase.cameraOffset).to( { y: 1380 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			
		if (this.petUserImageUrl != "null"){//if user pic url is available

			var userAvaTweenEnd = this.game.add.tween(this.userAva.cameraOffset).to( { y: 1380 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAvaMaskTweenEnd = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 1380 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			
		}else{
			
			var userAvauserAvaBGTweenEnd = this.game.add.tween(this.userAvaBG.cameraOffset).to( { y: 1380 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAvaTweenEnd = this.game.add.tween(this.userAva.cameraOffset).to( { y: 1383 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAvaMaskTweenEnd = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);

			

		}

		if (this.userImageUrl != "null"){

			var userAva2TweenEnd = this.game.add.tween(this.userAva2.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAva2TweenEnd = this.game.add.tween(this.userAva2).to( { alpha: 0}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAva2MaskTweenEnd = this.game.add.tween(this.userAva2Mask.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);

		}else{

			var userAvauserAva2BGTween = this.game.add.tween(this.userAva2BG.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAvauserAva2BGTween = this.game.add.tween(this.userAva2BG).to( { alpha: 0}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAva2Tween = this.game.add.tween(this.userAva2.cameraOffset).to( { y: 1308 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			var userAva2MaskTween = this.game.add.tween(this.userAva2Mask.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
			
		}

		var starEndTweenEnd = this.game.add.tween(this.starEnd.cameraOffset).to( { y: 1620 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var textPointEnd1TweenEnd = this.game.add.tween(this.textPointEnd1.cameraOffset).to( { y: 1630 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var textPointEnd2TweenEnd = this.game.add.tween(this.textPointEnd2.cameraOffset).to( { y: 1632 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var btDoneEndTweenEnd = this.game.add.tween(this.btDoneEnd.cameraOffset).to( { y: 1720 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);

		var boxBorderTweenEnd = this.game.add.tween(this.boxBorder.cameraOffset).to( { y: 1300 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var boxBorderTweenEnd2 = this.game.add.tween(this.boxBorder).to( { alpha: 0}, 700, Phaser.Easing.Sinusoidal.Out, true, 100);
		var newGoldSilverTextTweenEnd = this.game.add.tween(this.newSilverCoinText.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var newGoldCoinTextTweenEnd = this.game.add.tween(this.newGoldCoinText.cameraOffset).to( { y: 1305 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var nextGameTextTweenEnd = this.game.add.tween(this.nextGameText.cameraOffset).to( { y: 1830 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var clockEndTweenEnd = this.game.add.tween(this.clockEnd.cameraOffset).to( { y: 1825 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		
		
    	rectBG2TweenEnd.onComplete.add(this.tweenFinished, this);

    	closeGame();

    	
    	
	}

	update() {

		this.updateCoinAnim();
		
	}

	

	updateCoinAnim(){

		this.countx++;

		if (this.countx < this.countxStep)return;
		else this.countx = 0;
		

		if (this.coinAnim == true && this.coinBonusType == 'silver' && this.currentSilverStart < this.currentSilverFin){

			this.currentSilverStart = this.currentSilverStart + this.coinAddStep;
			if (this.currentSilverStart > this.currentSilverFin)this.currentSilverStart = this.currentSilverFin;

			this.newSilverCoinText.text = String(this.currentSilverStart);
			SoundMan.playEffect('coinAdd');

		}else if (this.coinAnim == true && this.coinBonusType == 'gold' && this.currentGoldStart < this.currentGoldFin){

			this.currentGoldStart = this.currentGoldStart + this.coinAddStep;
			if (this.currentGoldStart > this.currentGoldFin)this.currentGoldStart = this.currentGoldFin;

			this.newGoldCoinText.text = String(this.currentGoldStart);
			SoundMan.playEffect('coinAdd');

		}else if (this.coinAnim == true && this.coinBonusType == 'silver' && this.currentSilverStart >= this.currentSilverFin){


			var coinSilverEndTween = this.game.add.tween(this.newSilverCoinText.scale).to({x:GameData.scaleFactor * 1.5, y:GameData.scaleFactor * 1.5}, 150, Phaser.Easing.Back.Out, true);
			coinSilverEndTween.onComplete.add(this.coinSilverEndTween2, this);

			SoundMan.playEffect('coinFin');

			this.coinAnim = false;
		}else if (this.coinAnim == true && this.coinBonusType == 'gold' && this.currentGoldStart >= this.currentGoldFin){


			var coinGoldEndTween = this.game.add.tween(this.newGoldCoinText.scale).to({x:GameData.scaleFactor * 1.5, y:GameData.scaleFactor * 1.5}, 150, Phaser.Easing.Back.Out, true);
			coinGoldEndTween.onComplete.add(this.coinGoldEndTween2, this);

			SoundMan.playEffect('coinFin');

			this.coinAnim = false;
		}
	}

	startCoinAnim(){

		this.coinAnim = true;
	}

	coinSilverEndTween2(){

		var coinSilverEndTween2x = this.game.add.tween(this.newSilverCoinText.scale).to({x:GameData.scaleFactor * 1, y:GameData.scaleFactor * 1}, 150, Phaser.Easing.Back.Out, true);
	}

	coinGoldEndTween2(){

		var coinGoldEndTween2x = this.game.add.tween(this.newGoldCoinText.scale).to({x:GameData.scaleFactor * 1, y:GameData.scaleFactor * 1}, 150, Phaser.Easing.Back.Out, true);
	}
	
	nextGameEndTween(){

		this.nextGameAnim = true;
		//this.nextGameTick = this.game.time.now;

		//console.log('t ' + this.nextGameTick);
		//this.nextGameTimer = this.game.time.create(false);
		this.game.time.events.repeat(Phaser.Timer.SECOND, 99999999, this.timerTick, this);

		var clockEndTween2 = this.game.add.tween(this.clockEnd).to( { angle: 30}, 500, Phaser.Easing.Sinusoidal.Out, true, 0, -1);
		clockEndTween2.yoyo(true, 0);
	}

	timerTick(){

		//console.log('time ' + this.game.time.now);

		if (this.nextGame == "")return;
		if (this.nextGameAnim == false)return;

		this.nextGameSecond--;
		if (this.nextGameSecond <= -1){

			//this.nextGameMinute--;
			this.nextGameSecond = 59;
		}

		//if (this.nextGameMinute <= -1){

			//this.nextGameHour--;
			//this.nextGameMinute = 59;
		//}

		//if (this.nextGameHour <= -1){

			//this.nextGameHour = 0;
			//this.nextGameMinute = 0;
			//this.nextGameSecond = 0;
			//this.nextGameAnim = false;
		//}

		//var nextGameMessageUpdate = this.nextGameMessage + ' ' + String(this.nextGameHour)  + ' h ' + String(this.nextGameMinute) + ' m ' + this.nextGameSecond + ' sec';
		this.nextGameMessage = this.nextGame + this.nextGameSecond + ' sec';
		this.nextGameText.text = this.nextGameMessage;
	}

	tweenFinished(){

		//this.winBanner.destroy();
		//this.emitter.destroy();
		//this.btDone.destroy();
		//this.rays.destroy();
		//this.scoreBoard.destroy();
		//this.gotCoins.destroy();
		//this.coin.destroy();
		//this.textCoin.destroy();

		console.log('done');
		
		this.level.gameEnded();
	}



}

export default GameFinished;