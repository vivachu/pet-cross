import LogScreen from 'helpers/LogScreen';
import Avatar from 'objects/Avatar'; 
import Level from 'objects/Level'; 
import TimeBar from 'objects/TimeBar'; 
import ProgressCounter from 'objects/ProgressCounter'; 
import Lives from 'objects/Lives'; 
import PopUp from 'helpers/PopUp'; 
import GameData from 'helpers/GameData'
import GameStart from 'helpers/GameStart'
import SoundMan from 'helpers/SoundMan';
import Tutorial from 'helpers/Tutorial';
import GameFinished from 'helpers/GameFinished';
import GameOver from 'states/GameOver';
import Backend from 'helpers/Backend';


class Main extends Phaser.State {

	create() {
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#000000';
		this.game.time.advancedTiming = true;
		

		GameData.create(this.game);
		
		this.gameEnd = false;
		this.startTime = this.game.time.now; //debug
		this.firstStart = true;
		this.currentLevel = null;

		this.callBackFinished = false;
		this.scoreBoardFinished == false


		this.landGroup = this.game.add.group();
		
		this.carGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.carGroup);

		this.woodGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.woodGroup);

		this.fenceGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.fenceGroup);

		this.bonusGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.bonusGroup);

		this.avatarGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.avatarGroup);

		this.hudGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.hudGroup);

		this.uiGroup = this.game.add.group();
		this.game.physics.arcade.enable(this.uiGroup);


		this.tutorial = new Tutorial(this.game, this);
		this.gameFinished = new GameFinished(this.game, this);
		this.gameOver = new GameOver(this.game, this);

		this.timeBar = null;
		this.progressCounter = null;
		this.lives = null;
		this.popup = new PopUp(this.game, this);


		this.firstStart = false;
		this.currentLevel = new Level(this.game, this);
		this.gameStart = new GameStart(this.game,this);
		SoundMan.playBGMusic();

	}


	startLevel(){
		this.currentLevel.begin();
		this.timeBar.Start();
		this.progressCounter.Start();
		this.lives.Start();

		this.tutorial.startTutorial();
		GameData.gameState=1;

		//this.initGameFinished();
	}

	stopGame(){
		SoundMan.pauseMusic();
	}


	update() {
		if (this.currentLevel!=null) this.currentLevel.update();
		if (this.gameFinished != null)this.gameFinished.update();
	}

	convertTimeToCoin(){
		if (GameData.playDistance>200) GameData.playDistance=200;
		GameData.score = GameData.playDistance + GameData.lives * Math.max(0,120-GameData.playTime);
//		console.log(GameData.score  + " = " +  GameData.playDistance + " + " + GameData.lives + " * " + "Math.max(0,120 - " + GameData.playTime)

		Backend.serviceCallEnd(this, GameData.score);
	}

	callBackEnd(data){

		this.petUserImageUrl = "null";
		//this.petImageUrl = 'assets/pics/avatar/dummyPet3.jpg'; //for testing purpose
		this.petImageUrl = Backend.assetUrl + "images/" + data.pet.profileImage + "/medium.jpg";


		//data.pet.user.profileImage = null;
		//data.pet.user.profileImage = 6405;
	//	data.pet.user.socialImageUrl = null;

		//data.user.profileImage = null;
		//data.user.socialImageUrl = null;
		//data.user.profileImage = 6555;
		//data.pet.user.socialImageUrl = 'https://graph.facebook.com/v2.7/10213976261738231/picture?height=100&width=100';


		if (data.pet.user.profileImage != null){

			

		//	console.log('pup 1');
			this.petUserImageUrl = Backend.assetUrl + "images/" + data.pet.user.profileImage + "/medium.jpg";

			//this.petImageUrl = Backend.assetUrl + "images/" + data.pet.profileImage + "/medium.jpg";

			//testing other possibilities:
			//this.petUserImageUrl = "null";
			//this.petUserImageUrl = 'https://graph.facebook.com/v2.7/10213976261738231/picture?height=100&width=100';
			//this.petUserImageUrl = this.petUserImageUrl.replace('height=100&width=100', 'height=500&width=500');

		}else if (data.pet.user.socialImageUrl != null){

			//console.log('pup 2');
			//this.petUserImageUrl = data.pet.user.socialImageUrl;
			//this.petUserImageUrl = this.petUserImageUrl.replace('height=100&width=100', 'height=500&width=500');

			//this.petImageUrl = Backend.assetUrl + "images/" + data.pet.profileImage + "/medium.jpg";

			if (data.pet.user.socialImageUrl.indexOf('picture?height=') > 0){

				var arPetUserImageUrl = data.pet.user.socialImageUrl.split("picture?height=");

				this.petUserImageUrl = arPetUserImageUrl[0] + 'picture?height=500&width=500';
			}else{

				this.petUserImageUrl = data.pet.user.socialImageUrl;
			}

			

		}
		//else if (data.pet.user.initials != null){

		//	console.log('pup 3');
			//this.petUserImageUrl = 'assets/pics/avatar/dummyPet3.jpg'; //for testing purpose
			//this.petImageUrl = 'assets/pics/avatar/dummyPet3.jpg'; //for testing purpose
		//}

		//this.petUserImageUrl = "null";
		//this.petUserImageUrl = Backend.assetUrl + "images/" + data.pet.user.profileImage + "/medium.jpg";
		//this.petUserImageUrl = data.pet.user.socialImageUrl;
		//this.petUserImageUrl = this.petUserImageUrl.replace('height=100&width=100', 'height=500&width=500');

		//this.petImageUrl = Backend.assetUrl + "images/" + data.pet.profileImage + "/medium.jpg";
		//console.log('pup');


		this.userImageUrl = "null";

		if (data.user.profileImage != null){

			this.userImageUrl = Backend.assetUrl + "images/" + data.user.profileImage + "/medium.jpg";
		}else if (data.user.socialImageUrl != null){

			//this.userImageUrl = data.user.socialImageUrl;
			//this.userImageUrl = this.userImageUrl.replace('height=100&width=100', 'height=500&width=500');

			if (data.user.socialImageUrl.indexOf('picture?height=') > 0){

				var arUserImageUrl = data.user.socialImageUrl.split("picture?height=");

				this.userImageUrl = arUserImageUrl[0] + 'picture?height=500&width=500';
			}else{

				this.userImageUrl = data.user.socialImageUrl;
			}

		}

		var nextGameMessage = "";
		if (data.nextSession != null && data.nextSession.message != null)nextGameMessage = data.nextSession.message;
		
		//test
	//	data.coinBonus.type = "silver";
	//	data.coinBonus.amount = 120;

		this.callBackFinished = true;
		
		if (this.scoreBoardFinished == true){

			if (this.gameFinished == null)this.gameFinished = new GameFinished(this.game, this);

			this.gameFinished.showCoins(data.coinBonus.type, data.coinBonus.amount, data.pet.name, this.petImageUrl, this.petUserImageUrl, data.pointBonus, data.pet.user.initials, 
			data.user.silverCoins, data.user.goldCoins, nextGameMessage, this.userImageUrl, data.user.initials);

			console.log('endscreen a1');
		}
		

		
			

		this.dct = data.coinBonus.type;
		this.dca = data.coinBonus.amount;
		this.dpn = data.pet.name;
		this.dpb = data.pointBonus;
		this.dpui = data.pet.user.initials;

		this.dusc = data.user.silverCoins;
		this.dugc = data.user.goldCoins;
		this.ngm = nextGameMessage;
		this.dui = data.user.initials;


		


		//console.log('api end ' + data.coinBonus.type + ", " + data.coinBonus.amount + ", " + data.pet.name + ", " + this.petImageUrl + ", " + this.petUserImageUrl + ", " + data.pointBonus + ", " + data.pet.user.initials);
	}

	callBackEndError(){

		this.callBackFinished = true;

		if (this.scoreBoardFinished == true){

			if (this.gameFinished == null)this.gameFinished = new GameFinished(this.game, this);
			
			console.log('api call error');
			this.gameFinished.showCoins('silver', 10, 'API error', 'assets/pics/avatar/dummyPet3.jpg', 'assets/pics/avatar/dummyPet3.jpg', 10, 'ER', 10, 10, 'walk err in 6 h 0 m', 'assets/pics/avatar/dummyPet3.jpg', 'ER');
			
			console.log('endscreen a3');
		}

		this.dct = 'silver';
		this.dca = 10;
		this.dpn = 'API error';
		this.petImageUrl = 'assets/pics/avatar/dummyPet3.jpg';
		this.petUserImageUrl = 'assets/pics/avatar/dummyPet3.jpg';
		this.dpb = 10;
		this.dpui = 'ER';

		this.dusc = 100;
		this.dugc = 100;
		this.ngm = "walk error in 60 minutes";
		this.dui = "ER";
		this.userImageUrl = "assets/pics/avatar/dummyPet3.jpg";
		

	}


	initGameFinished(){

		SoundMan.playBgWin();


	//	console.log("initGameFinished");
		if (this.gameState==4) return;
		GameData.gameState=4;
		this.gameOver.startGameOverScene();
		this.timeBar.pause=true;
		this.currentLevel=null;
		this.stopGame();
		this.gameEnd = true;

		this.convertTimeToCoin();


	}


	gameEnded(){
		//SoundMan.playBgWin();

		//this.timeBar.Stop();

		//this.gameFinished = new GameFinished(this.game, this);
		//this.convertTimeToCoin();

		if (this.scoreBoardFinished == true)return; //to prevent double endscreen

		this.scoreBoardFinished = true;



		console.log("game ended");

		if (this.callBackFinished == true){

			if (this.gameFinished == null)this.gameFinished = new GameFinished(this.game, this);

			this.gameFinished.showCoins(this.dct, this.dca, this.dpn, this.petImageUrl, this.petUserImageUrl, this.dpb, this.dpui, this.dusc, this.dugc, this.ngm, this.userImageUrl, this.dui);
			//this.gameFinished.showCoins(this.dct, this.dca, this.dpn, this.petImageUrl, this.petUserImageUrl, this.dpb, this.dpui);

			console.log('endscreen a2');
		}		//
	}


	addScore(type){
		this.items.updateItemNum(type);

		GameData.completion--;
		if (GameData.completion==0 && this.gameEnd == false){
			this.initGameFinished();
		}
	}

	render(){
		//this.game.debug.text('render FPS: ' + (this.game.time.fps || '--') , 2, 14, "#00ff00");
	}

}

export default Main;
