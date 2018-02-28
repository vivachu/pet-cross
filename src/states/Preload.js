import Backend from 'helpers/Backend';

class Preload extends Phaser.State {

	preload() {

		this.gameIsStarted = false;

		//create loading bar
		Backend.serviceCallGetPets(this);		

		

		//debug
//		this.callBackGetPets(null);
	}	

	callBackGetPets(data){

		if (data != null){

			this.avatarUrl =  Backend.assetUrl + "images/" + data[0].image + "/medium.jpg";

		}else{

			this.avatarUrl =  'assets/pics/avatar/dummyPet3.jpg';
		}

		

		this.sf = this.game.height / 1280;
		//var styleLoader = {font: "40px Arial", fill: "#ff0000", align: "center"};
		this.textLoader = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'fontOduda', 'loading assets', 50 * this.sf);
		this.textLoader.x = this.game.world.centerX - this.textLoader.width/2;
		this.textLoader.y = this.game.world.centerY - this.textLoader.height * 1.2;
		//this.textLoader.scale.setTo(this.sf);

		this.loadBorder = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'loaderborder');
		this.loadBorder.scale.setTo(this.sf);
		this.loadBorder.x = this.game.world.centerX - this.loadBorder.width/2;
		
		//this.loadBorder.anchor.setTo(0.5);


		this.loadFill = this.game.add.sprite(0,0, 'loaderfill');
		//this.loadFill.scale.setTo(this.sf);

		this.loadBorder.addChild(this.loadFill);
		this.fillmask = this.game.add.graphics(0,0);
		//this.fillmask.scale.setTo(this.sf);

		this.fillmask.beginFill(0xffffff);
	    this.fillmask.drawRect( 0 , 0 , this.loadFill.width + 9, this.loadFill.height + 10);
	    this.loadBorder.addChild ( this.fillmask );

	    this.fillmask.x = this.loadFill.x;
	    this.fillmask.y = this.loadFill.y;
	    this.loadFill.mask = this.fillmask;
		this.loadFill.x = 9;
		this.loadFill.y = 10;

		this.fillmask.y = 0;//starter
		//this.fillmask.x = -440;
	
		//change this so load game asset is call after minigames/getPets service call
		//this.loadGameAsset();

		//console.log('this is from preload class');


		this.loadGameAsset();
	}	

	loadGameAsset(){



		//console.log("loading assets");

		this.game.load.onLoadStart.add(this.loadStart, this);
		this.game.load.onFileComplete.add(this.fileComplete, this);
		this.game.load.onLoadComplete.add(this.loadComplete, this);

		//Progress Asset

		//Land Asset
		this.game.load.image('shade', 'assets/pics/gameplay/shade.png');
		this.game.load.image('highlight', 'assets/pics/gameplay/highlight.png');
/*//		this.game.load.image('lane1', 'assets/pics/gameplay/lane1.png');
		this.game.load.image('lane2', 'assets/pics/gameplay/lane2.png');
		this.game.load.image('lane3', 'assets/pics/gameplay/lane3.png');
		this.game.load.image('lane3kot', 'assets/pics/gameplay/tile3.png');
		this.game.load.image('lane4', 'assets/pics/gameplay/lane4.png');
		this.game.load.image('lane5', 'assets/pics/gameplay/lane5.png');
		this.game.load.image('lane6', 'assets/pics/gameplay/lane6.png');
		this.game.load.image('lane7', 'assets/pics/gameplay/lane7.png');
		this.game.load.image('lane8', 'assets/pics/gameplay/lane8.png');
		this.game.load.image('lane9', 'assets/pics/gameplay/lane9.png');
*/


		this.game.load.image('grass1', 'assets/pics/gameplay/grass-1.png');
		this.game.load.image('grass2', 'assets/pics/gameplay/grass-2.png');
		this.game.load.image('roadup', 'assets/pics/gameplay/road-section-upper.png');
		this.game.load.image('road', 'assets/pics/gameplay/road.png');
		this.game.load.image('roaddown', 'assets/pics/gameplay/road-section-lower.png');
		this.game.load.image('roadline', 'assets/pics/gameplay/road-line.png');
		this.game.load.image('roadcrack', 'assets/pics/gameplay/road-crack.png');


		this.game.load.image('waterup', 'assets/pics/gameplay/river-section-upper.png');
		this.game.load.image('water1', 'assets/pics/gameplay/water-1.png');
		this.game.load.image('water2', 'assets/pics/gameplay/water-2.png');
		this.game.load.image('water3', 'assets/pics/gameplay/water-3.png');
		this.game.load.image('water4', 'assets/pics/gameplay/water-4.png');
		this.game.load.image('waterdown', 'assets/pics/gameplay/river-section-lower.png');
	
		//Cars
		this.game.load.image('car1', 'assets/pics/gameplay/jeep-red.png');
		this.game.load.image('car2', 'assets/pics/gameplay/jeep-yellow.png');
		this.game.load.image('car3', 'assets/pics/gameplay/camper.png');

		//Logs
		this.game.load.image('log1', 'assets/pics/gameplay/log1.png');
		this.game.load.image('log2', 'assets/pics/gameplay/log2.png');
		this.game.load.image('log3', 'assets/pics/gameplay/log3.png');
		this.game.load.image('log4', 'assets/pics/gameplay/log4.png');

		//fence
		this.game.load.image('fence1', 'assets/pics/gameplay/fence-end-2.png');
		this.game.load.image('fence2', 'assets/pics/gameplay/fence.png');
		this.game.load.image('fence3', 'assets/pics/gameplay/fence-end-1.png');

		//Items
		this.game.load.image('coin', 'assets/pics/gameplay/coin.png');
		this.game.load.image('flower', 'assets/pics/gameplay/flower.png');
		this.game.load.image('rock1', 'assets/pics/gameplay/rock-1.png');
		this.game.load.image('ticket', 'assets/pics/gameplay/ticket.png');
		this.game.load.image('tree', 'assets/pics/gameplay/tree.png');
		this.game.load.image('bush', 'assets/pics/gameplay/bush.png');


		//Character Asset 
		this.game.load.spritesheet('move1', 'assets/pics/gameplay/move-1.png',144,144,4);
		this.game.load.image('move2', 'assets/pics/gameplay/move-2.png');
		this.game.load.image('move3', 'assets/pics/gameplay/move-3.png');




		//GameStart Assets
		this.game.load.image('titlepic', 'assets/pics/title.png');
		this.game.load.image('btstartup', 'assets/pics/button-start-up.png');
		this.game.load.image('btstartdown', 'assets/pics/button-start-down.png');
 
		//Level Assets
		this.game.load.image('btpauseup', 'assets/pics/button-pause-up.png');
		this.game.load.image('btpausedown', 'assets/pics/button-pause-down.png');

	    //Pop Up Assets
		this.game.load.image('buttonDoneDown', 'assets/pics/button-done-down.png');
		this.game.load.image('buttonDoneUp', 'assets/pics/button-done-up.png');
		this.game.load.image('imgGreatJob', 'assets/pics/great-job-banner.png');
		this.game.load.image('imgGameOver', 'assets/pics/ribbon-gameover.png');

		this.game.load.image('rays', 'assets/pics/rays.png');
		this.game.load.image('gotCoins', 'assets/pics/text-you-got-coin.png');
		this.game.load.image('goldCoin', 'assets/pics/coin-gold.png');
		this.game.load.image('silverCoin', 'assets/pics/coin-silver.png');
		this.game.load.image('scoreBoard', 'assets/pics/score-board.png');
		this.game.load.image('confetti', 'assets/pics/confetti.png');
		this.game.load.image('imgHand', 'assets/pics/hand-tutorial.png');
		this.game.load.image('confetti1', 'assets/pics/confetti-1.png');
		this.game.load.image('confetti2', 'assets/pics/confetti-2.png');
		this.game.load.image('confetti3', 'assets/pics/confetti-3.png');
		this.game.load.image('confetti4', 'assets/pics/confetti-4.png');
		this.game.load.image('confetti5', 'assets/pics/confetti-5.png');
		this.game.load.image('confetti6', 'assets/pics/confetti-6.png');
		this.game.load.image('tapEffect', 'assets/pics/tap-effect.png');
		this.game.load.image('swipeEffect', 'assets/pics/swipe-effect.png');
		this.game.load.image('handTutorial', 'assets/pics/hand-tutorial.png');
		this.game.load.image('skip', 'assets/pics/skip-button.png');

		//music and soundfx
		this.game.load.audio('bgMusic', 'assets/sound/bgm.mp3');
		this.game.load.audio('bgWin', 'assets/sound/applause.mp3');
		this.game.load.audio('taps', 'assets/sound/taps.mp3');
		this.game.load.audio('swipe', 'assets/sound/swipesfx.mp3');	
		this.game.load.audio('coinAdd', 'assets/sound/coinAdd.mp3');
		this.game.load.audio('coinFin', 'assets/sound/coinFin.mp3');
		this.game.load.audio('move', 'assets/sound/move.mp3');
		this.game.load.audio('dead', 'assets/sound/dead.mp3');


		
		//endscreen
		this.game.load.image('btDoneEnd', 'assets/pics/endscreen/button.png');
		this.game.load.image('goldCoinEnd', 'assets/pics/endscreen/gold-coin.png');
		this.game.load.image('silverCoinEnd', 'assets/pics/endscreen/silver-coin.png');
		this.game.load.image('raysEnd', 'assets/pics/endscreen/rays.png');
		this.game.load.image('ribbonEnd', 'assets/pics/endscreen/Ribbon.png');
		this.game.load.image('starEnd', 'assets/pics/endscreen/star.png');
		this.game.load.image('avatarBase', 'assets/pics/endscreen/avatarBase.png');
		this.game.load.image('avatarMask', 'assets/pics/endscreen/avatarMask.jpg');
		this.game.load.image('boxBorder', 'assets/pics/endscreen/boxborder.png');
		this.game.load.image('clockEnd', 'assets/pics/endscreen/clock.png');

		//UI elements
//		this.game.load.image('timebarbg', 'assets/pics/gameplay/fill-bg.png');
//		this.game.load.image('timebar', 'assets/pics/gameplay/bar-fill.png');
		this.game.load.image('btPause', 'assets/pics/button-pause-up.png');


		this.game.load.image('iconlive', 'assets/pics/gameplay/icon-live.png');
		this.game.load.image('live1', 'assets/pics/gameplay/live1.png');
		this.game.load.image('live2', 'assets/pics/gameplay/live2.png');
		this.game.load.image('live3', 'assets/pics/gameplay/live3.png');

		//DistanceBar Asset
		this.game.load.image('dbborder', 'assets/pics/progressbar-border.png');
		this.game.load.image('dbfill', 'assets/pics/progressbar-fill.png');
		this.game.load.image('dbmarker', 'assets/pics/progress-bar-marker.png');
		this.game.load.image('dbcounter', 'assets/pics/progressbar-counter.png');


		//Avatar
		this.game.load.image('petBorder', 'assets/pics/avatar/petBorder.jpg');
		this.game.load.image('avatar', this.avatarUrl);


		this.game.load.start();

	}

	
	create() {
		
	}

	loadStart() {

		this.textLoader.setText("Loading ...");

	}

	//	This callback is sent the following parameters:
	fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

		

		var percentageLoad = "Loading " + Math.round(totalLoaded/totalFiles * 100)  + "%";
		this.textLoader.setText(percentageLoad);

		var fill = 440 - (totalLoaded/totalFiles) * 440;
		this.fillmask.x = fill * -1;


	//	console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

	}

 	loadComplete() {

		if (this.gameIsStarted == true)return; //hack because when loading pet image from url on game finished, it still comeback here again
		this.game.state.start("GameTitle");
		this.gameIsStarted = true;

	}









}

export default Preload;
 