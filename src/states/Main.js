import LogScreen from 'helpers/LogScreen';
import Avatar from 'objects/Avatar'; 
import Level from 'objects/Level'; 
import PopUp from 'helpers/PopUp'; 
import GameData from 'helpers/GameData'
import GameStart from 'helpers/GameStart'
import SoundMan from 'helpers/SoundMan';
import Tutorial from 'helpers/Tutorial';
import GameFinished from 'helpers/GameFinished';
import Backend from 'helpers/Backend';


class Main extends Phaser.State {

	create() {
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.stage.backgroundColor = '#000000';
		this.game.time.advancedTiming = true;
		
		SoundMan.create(this.game);

		GameData.create(this.game);
		
		this.gameEnd = false;
		this.startTime = this.game.time.now; 
		this.firstStart = true;
		this.currentLevel = null;



		this.startGame(); //this.gameStart = new GameStart(this.game,this);

		this.tutorial = new Tutorial(this.game, this);
		this.gameFinished = new GameFinished(this.game, this);
  		this.pauseButton = this.game.add.button(GameData.getx(320), 1100 * GameData.scaleFactor, 'btpauseup', this.pauseClicked, this, 2, 1, 0);
  		this.pauseButton.scale.setTo(GameData.scaleFactor * 1);
		this.pauseButton.fixedToCamera = true;


		this.popup = new PopUp(this.game, this);


		//this.startGame();

	}

	pauseClicked(){
		if (GameData.gameState==2) {
			GameData.gameState=1;
			this.startGame();
		}else if (GameData.gameState==1) {
			GameData.gameState=2;
			this.stopGame();
		}
	}

	

	startGame(){
		if (this.firstStart){
			this.firstStart = false;

			this.currentLevel = new Level(this.game, this);

//			this.timeBar.Start();

		}

		GameData.gameState=1;
	//	SoundMan.resumeMusic();

		//this.gameFinished = new GameFinished(this.game, this);
		//this.convertTimeToCoin();

		//this.initGameFinished();
	}

	stopGame(){
		SoundMan.pauseMusic();
	}


	update() {
		if (this.currentLevel!=null) this.currentLevel.update();
	}

	convertTimeToCoin(){
		console.log('ts: ' + this.timeBar.totalSeconds);
		Backend.serviceCallEnd(this, this.timeBar.totalSeconds);
	}

	callBackEnd(data){

		this.petUserImageUrl = "";

		if (data.pet.user.profileImage != null){

			

			//console.log('pup 1');
			this.petUserImageUrl = Backend.assetUrl + "images/" + data.pet.user.profileImage + "/medium.jpg";

			//testing other possibilities:
			//this.petUserImageUrl = "null";
			//this.petUserImageUrl = 'https://graph.facebook.com/v2.7/10213976261738231/picture?height=100&width=100';
			//this.petUserImageUrl = this.petUserImageUrl.replace('height=100&width=100', 'height=500&width=500');

		}else if (data.pet.user.socialImageUrl != null){

			//console.log('pup 2');
			this.petUserImageUrl = data.pet.user.socialImageUrl;
			this.petUserImageUrl = this.petUserImageUrl.replace('height=100&width=100', 'height=500&width=500');

		}else{

			//console.log('pup 3');
			this.petUserImageUrl = "null";
		}


		this.petImageUrl = Backend.assetUrl + "images/" + data.pet.profileImage + "/medium.jpg";

		
		this.gameFinished.showCoins(data.coinBonus.type, data.coinBonus.amount, data.pet.name, this.petImageUrl, this.petUserImageUrl, data.pointBonus, data.pet.user.initials);
		

		//console.log('api end ' + data.coinBonus.type + ", " + data.coinBonus.amount + ", " + data.pet.name + ", " + this.petImageUrl + ", " + this.petUserImageUrl + ", " + data.pointBonus + ", " + data.pet.user.initials);
	}

	callBackEndError(){

		console.log('api call error');
		this.gameFinished.showCoins('silver', 10, 'API error', '3227');
	}

	initGameFinished(){

		this.currentLevel=null;
		this.stopGame();
		SoundMan.playBgWin();
		this.timeBar.Stop();

		//this.gameFinished = new GameFinished(this.game, this);
		this.convertTimeToCoin();
		this.gameEnd = true;

	}


	gameEnded(){
		
		console.log("game ended");
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
