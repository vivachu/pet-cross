import GameData from 'helpers/GameData'

class GameFinished{


	constructor(game,level){
		this.game = game;
		this.level = level;

		

		

	} 

	showCoins(cbt, cba, pn, piurl, puiurl, pb, pin){

		
		this.coinBonusType = cbt;
		this.coinBonusAmout = cba;
		this.petName = pn;
		this.pointBonus = pb;
		this.petUserImageUrl = puiurl;
		this.petUserInitial = pin;

		//console.log('pin ' + pin);

		//this.petImageUrl = Backend.assetUrl + "images/" + ppid + "/medium.jpg";
		//this.ownerImageUrl = Backend.assetUrl + "images/" + pupid + "/medium.jpg";
		
		//console.log('url ' + this.petImageUrl);
		//console.log('url ' + this.ownerImageUrl);

		this.game.load.onLoadComplete.add(this.loadComplete, this);

		this.game.load.image('petImage', piurl);
		if (this.petUserImageUrl != "null")this.game.load.image('ownerImage', puiurl);

		this.game.load.start();
	}

	loadComplete() {

		//console.log('complete');
		this.startEndingScene();
	}

	startEndingScene(){


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

    	this.emitter = this.game.add.emitter(this.game.world.centerX * 1/GameData.scaleFactor, 300*GameData.scaleFactor, 100);
		this.emitter.fixedToCamera = true;
		this.emitter.scale.setTo(GameData.scaleFactor);

		this.emitter.makeParticles(['confetti1', 'confetti2', 'confetti3', 'confetti4', 'confetti5', 'confetti6']);
		this.emitter.cameraOffset.x = this.game.world.centerX;
		this.emitter.cameraOffset.y = 1280*GameData.scaleFactor;

		//this.emitter.setScale(0.48 * GameData.scaleFactor, 0.5 * GameData.scaleFactor, 0.48 * GameData.scaleFactor, 0.5 * GameData.scaleFactor);

		this.emitter.minParticleSpeed.setTo(-100*GameData.scaleFactor, -300*GameData.scaleFactor);
	    this.emitter.maxParticleSpeed.setTo(100*GameData.scaleFactor, 300*GameData.scaleFactor);
	    this.emitter.gravity = 70;
	    this.emitter.start(true, 15000, null, 120);


		this.coinEndAsset = 'goldCoinEnd';
		if (this.coinBonusType == 'silver')this.coinEndAsset = 'silverCoinEnd';

		this.winBanner = this.game.add.sprite(this.game.world.centerX,300, 'imgGreatJob');
	 	this.winBanner.anchor.setTo(0.5,0.5);
		this.winBanner.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
	 	this.winBanner.fixedToCamera = true;
	 	this.winBanner.cameraOffset.y=-200*GameData.scaleFactor;
	 	
    	var bannerTween1 = this.game.add.tween(this.winBanner.cameraOffset).to( { y: 150*GameData.scaleFactor}, 1500, Phaser.Easing.Back.Out, true);



		this.rays = this.game.add.sprite(this.game.world.centerX, 300 * GameData.scaleFactor, 'raysEnd');
		this.rays.anchor.setTo(0.5);
		this.rays.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.rays.fixedToCamera = true;
		this.rays.cameraOffset.y = 400 * GameData.scaleFactor;
		this.rays.alpha = 0;
		this.rays.scale.setTo(0,0);

		var raysTween1 = this.game.add.tween(this.rays).to({angle:360}, 2000, Phaser.Easing.Linear.None, true, 0, -1);
		var raysTween2 = this.game.add.tween(this.rays).to({alpha:0.6}, 1000, Phaser.Easing.Linear.None, true);
		var raysTween3 = this.game.add.tween(this.rays.scale).to({x:GameData.scaleFactor, y:GameData.scaleFactor}, 200, Phaser.Easing.Linear.None, true);


		this.coinEnd = this.game.add.sprite(this.game.world.centerX, 300 * GameData.scaleFactor, this.coinEndAsset);
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
		this.textGot.cameraOffset.x = this.game.world.centerX;
		this.textGot.cameraOffset.y = 250 * GameData.scaleFactor;
		this.textGot.alpha = 0;

		var textGotTween1 = this.game.add.tween(this.textGot).to({alpha:1}, 800, Phaser.Easing.Linear.None, true, 1000);


		this.coinAmountString = '+ ' + this.coinBonusAmout;
		this.textCoinEnd = this.game.add.bitmapText(0, 0, 'fontOduda', this.coinAmountString, 64);
		this.textCoinEnd.anchor.setTo(0.5);
		this.textCoinEnd.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textCoinEnd.fixedToCamera = true;
		//this.textCoinEnd.cameraOffset.x = GameData.getx(350);
		this.textCoinEnd.cameraOffset.x = this.game.world.centerX;
		this.textCoinEnd.cameraOffset.y = 600 * GameData.scaleFactor;
		this.textCoinEnd.alpha = 0;

		var textCoinEndTween1 = this.game.add.tween(this.textCoinEnd).to({alpha:1}, 800, Phaser.Easing.Linear.None, true, 1000);

		//bottom part

		this.rectBG2 = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		this.rectBG2.beginFill(0x323234, 1);
		this.rectBG2.drawRect(0,0,100,100);
		this.rectBG2.anchor.setTo(0.5, 0);
		this.rectBG2.fixedToCamera = true;
		this.rectBG2.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG2.cameraOffset.y = 1280 * GameData.scaleFactor;
		this.rectBG2.scale.setTo(this.game.width/100, this.game.height/150);
		this.rectBG2.alpha = 0;

		var rectBG2Tween = this.game.add.tween(this.rectBG2.cameraOffset).to( { y: 680 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var rectBG2Tween2 = this.game.add.tween(this.rectBG2).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.rectBG2Line = this.game.add.graphics(this.game.world.centerX,this.game.world.centerY);
	    this.rectBG2Line.lineStyle(2 * GameData.scaleFactor, 0x98979e, 1);
	    this.rectBG2Line.moveTo(0, 0);  
	    this.rectBG2Line.lineTo(this.game.width, 0);
	    this.rectBG2Line.anchor.setTo(0.5, 0.5);
		this.rectBG2Line.fixedToCamera = true;
		this.rectBG2Line.cameraOffset.x = 0 * GameData.scaleFactor;
		this.rectBG2Line.cameraOffset.y = 1280 * GameData.scaleFactor;
		this.rectBG2Line.alpha = 0;

		var rectBG2LineTween = this.game.add.tween(this.rectBG2Line.cameraOffset).to( { y: 680 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var rectBG2LineTween2 = this.game.add.tween(this.rectBG2Line).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.avatarBase = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'avatarBase');
		this.avatarBase.anchor.setTo(0.5);
		this.avatarBase.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.avatarBase.fixedToCamera = true;
		this.avatarBase.cameraOffset.y = 1430 * GameData.scaleFactor;
		this.avatarBase.alpha = 0;

		var avatarBaseTween = this.game.add.tween(this.avatarBase.cameraOffset).to( { y: 830 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var avatarBaseTween2 = this.game.add.tween(this.avatarBase).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.petAva = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'petImage');
		this.petAva.anchor.setTo(0.5);
		this.petAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.petAva.fixedToCamera = true;
		this.petAva.cameraOffset.y = 1430 * GameData.scaleFactor;
		this.petAva.alpha = 0;
		this.petAva.scale.setTo(0.42 * GameData.scaleFactor, 0.42 * GameData.scaleFactor);


		this.petAvaMask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
		this.petAvaMask.beginFill(0xffffff);
		this.petAvaMask.drawCircle(0, 0, 160 * GameData.scaleFactor);
		this.petAvaMask.anchor.setTo(0.5, 0.5);
		this.petAvaMask.fixedToCamera = true;
		this.petAvaMask.cameraOffset.x = this.game.world.centerX;
		this.petAvaMask.cameraOffset.y = 1430 * GameData.scaleFactor;
		
		//console.log('sf ' + GameData.scaleFactor);

		this.petAva.mask = this.petAvaMask;

		var petAvaTween = this.game.add.tween(this.petAva.cameraOffset).to( { y: 830 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var petAvaMaskTween = this.game.add.tween(this.petAvaMask.cameraOffset).to( { y: 830 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var petAvaTween2 = this.game.add.tween(this.petAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);
		//var petAvaMaskTween2 = this.game.add.tween(this.petAvaMask).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		this.petNameString = this.petName + ' got';
		this.textPetName = this.game.add.bitmapText(0, 0, 'fontOduda', this.petNameString, 38);
		this.textPetName.anchor.setTo(0.5);
		this.textPetName.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPetName.fixedToCamera = true;
		this.textPetName.cameraOffset.x = this.game.world.centerX;
		this.textPetName.cameraOffset.y = 1560 * GameData.scaleFactor;
		
		var petNameTween = this.game.add.tween(this.textPetName.cameraOffset).to( { y: 960 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);


		this.userAvaBase = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'avatarBase');
		this.userAvaBase.anchor.setTo(0.5);
		this.userAvaBase.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.userAvaBase.fixedToCamera = true;
		this.userAvaBase.cameraOffset.x = GameData.getx(310);
		this.userAvaBase.cameraOffset.y = 1380 * GameData.scaleFactor;
		this.userAvaBase.alpha = 0;
		this.userAvaBase.scale.setTo(0.5 * GameData.scaleFactor, 0.5 * GameData.scaleFactor);

		var userAvaBaseTween = this.game.add.tween(this.userAvaBase.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		var userAvaBaseTween2 = this.game.add.tween(this.userAvaBase).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);
		
		this.userAva = null;
		this.userAvaMask = null;

		
		if (this.petUserImageUrl != "null"){//if user pic url is available

			this.userAva = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'ownerImage');
			this.userAva.anchor.setTo(0.5);
			this.userAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva.fixedToCamera = true;
			this.userAva.cameraOffset.x = GameData.getx(310);
			this.userAva.cameraOffset.y = 1380 * GameData.scaleFactor;
			this.userAva.alpha = 0;
			this.userAva.scale.setTo(0.21 * GameData.scaleFactor, 0.21 * GameData.scaleFactor);

			this.userAvaMask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaMask.beginFill(0xffffff);
			this.userAvaMask.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaMask.anchor.setTo(0.5, 0.5);
			this.userAvaMask.fixedToCamera = true;
			this.userAvaMask.cameraOffset.x = GameData.getx(310);
			this.userAvaMask.cameraOffset.y = 1380 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva.mask = this.userAvaMask;

			var userAvaTween = this.game.add.tween(this.userAva.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaMaskTween = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaTween2 = this.game.add.tween(this.userAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);


		}else{//if user pic url is not available

			this.userAvaBG = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaBG.beginFill(0xB59CFF);
			this.userAvaBG.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaBG.anchor.setTo(0.5, 0.5);
			this.userAvaBG.fixedToCamera = true;
			this.userAvaBG.cameraOffset.x = GameData.getx(310);
			this.userAvaBG.cameraOffset.y = 1380 * GameData.scaleFactor;
			this.userAvaBG.alpha = 0;

			var userAvauserAvaBGTween = this.game.add.tween(this.userAvaBG.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvauserAvaBGTween2 = this.game.add.tween(this.userAvaBG).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

			this.userAva = this.game.add.bitmapText(0, 0, 'fontOduda', this.petUserInitial, 38);
			this.userAva.anchor.setTo(0.5);
			this.userAva.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
			this.userAva.fixedToCamera = true;
			this.userAva.cameraOffset.x = GameData.getx(310);
			this.userAva.cameraOffset.y = 1383 * GameData.scaleFactor;
			this.userAva.alpha = 0;
			
			this.userAvaMask = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
			this.userAvaMask.beginFill(0xffffff);
			this.userAvaMask.drawCircle(0, 0, 80 * GameData.scaleFactor);
			this.userAvaMask.anchor.setTo(0.5, 0.5);
			this.userAvaMask.fixedToCamera = true;
			this.userAvaMask.cameraOffset.x = GameData.getx(310);
			this.userAvaMask.cameraOffset.y = 1380 * GameData.scaleFactor;
		
			//console.log('sf ' + GameData.scaleFactor);

			this.userAva.mask = this.userAvaMask;

			var userAvaTween = this.game.add.tween(this.userAva.cameraOffset).to( { y: 783 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaMaskTween = this.game.add.tween(this.userAvaMask.cameraOffset).to( { y: 780 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
			var userAvaTween2 = this.game.add.tween(this.userAva).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 1500);

		}
		

		
		this.starEnd = this.game.add.sprite(this.game.world.centerX, 800 * GameData.scaleFactor, 'starEnd');
		this.starEnd.anchor.setTo(0.5);
		this.starEnd.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.starEnd.fixedToCamera = true;
		this.starEnd.cameraOffset.x = GameData.getx(300);
		this.starEnd.cameraOffset.y = 1620 * GameData.scaleFactor;
		this.starEnd.alpha = 1;

		var starEndTween = this.game.add.tween(this.starEnd.cameraOffset).to( { y: 1020 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);


		this.textPointEnd1 = this.game.add.bitmapText(0, 0, 'fontOduda', '+', 50);
		this.textPointEnd1.anchor.setTo(0.5);
		this.textPointEnd1.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPointEnd1.fixedToCamera = true;
		this.textPointEnd1.cameraOffset.x = GameData.getx(360);
		this.textPointEnd1.cameraOffset.y = 1630 * GameData.scaleFactor;

		var textPointEnd1Tween = this.game.add.tween(this.textPointEnd1.cameraOffset).to( { y: 1030 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);

		//console.log('pb ' + this.pointBonus);
		
		this.textPointEnd2 = this.game.add.bitmapText(0, 0, 'fontOduda', String(this.pointBonus), 50);
		this.textPointEnd2.anchor.setTo(0.5);
		this.textPointEnd2.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.textPointEnd2.fixedToCamera = true;
		//this.textPointEnd2.cameraOffset.x = GameData.getx(415);
		this.textPointEnd2.cameraOffset.x = this.game.world.centerX - GameData.scaleFactor * 10 + this.textPointEnd2.width/2;
		this.textPointEnd2.cameraOffset.y = 1632 * GameData.scaleFactor;

		var textPointEnd2Tween = this.game.add.tween(this.textPointEnd2.cameraOffset).to( { y: 1032 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		

		this.btDoneEnd = this.game.add.button(this.game.world.centerX, 800 * GameData.scaleFactor, 'btDoneEnd', this.btDoneEndClicked, this);
		this.btDoneEnd.anchor.setTo(0.5);
		this.btDoneEnd.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
		this.btDoneEnd.fixedToCamera = true;
		this.btDoneEnd.cameraOffset.y = 1720 * GameData.scaleFactor;
		
		var btDoneEndTween = this.game.add.tween(this.btDoneEnd.cameraOffset).to( { y: 1120 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 1500);
		
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
		var avatarBaseTweenEnd = this.game.add.tween(this.avatarBase.cameraOffset).to( { y: 1430 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
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

		var starEndTweenEnd = this.game.add.tween(this.starEnd.cameraOffset).to( { y: 1620 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var textPointEnd1TweenEnd = this.game.add.tween(this.textPointEnd1.cameraOffset).to( { y: 1630 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var textPointEnd2TweenEnd = this.game.add.tween(this.textPointEnd2.cameraOffset).to( { y: 1632 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		var btDoneEndTweenEnd = this.game.add.tween(this.btDoneEnd.cameraOffset).to( { y: 1720 * GameData.scaleFactor}, 1000, Phaser.Easing.Sinusoidal.Out, true, 100);
		
    	rectBG2TweenEnd.onComplete.add(this.tweenFinished, this);

    	closeGame();
    	
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