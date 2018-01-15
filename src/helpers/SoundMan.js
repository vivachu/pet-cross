class SoundMan {

	constructor(game){
		this.game = game;
	}	


	create (game){
		this.game = game;

		this.music = this.game.add.audio('bgMusic', 0.7, true);
		this.music.allowMultiple = false;


		this.sfxTap = this.game.add.audio('taps');
		this.sfxTap.addMarker('tap1', 0, 0.234);
		this.sfxTap.addMarker('tap2', 0.234, 0.208);
		this.sfxTap.allowMultiple = true;

		this.sfxSwipe = this.game.add.audio('swipe', 0.3);
		this.sfxSwipe.allowMultiple = true;

		this.sfxCollide = this.game.add.audio('obstacleHit');
		this.sfxCollide.allowMultiple = true;

		this.sfxFeather = this.game.add.audio('feather');
		this.sfxFeather.allowMultiple = true;

		this.sfxFramePhoto = this.game.add.audio('framephoto');
		this.sfxFramePhoto.allowMultiple = true;

		this.sfxGlass = this.game.add.audio('glass');
		this.sfxGlass.allowMultiple = true;

		this.sfxPillow = this.game.add.audio('pillow');
		this.sfxPillow.allowMultiple = true;

		this.sfxSponge = this.game.add.audio('sponge');
		this.sfxSponge.allowMultiple = true;

		this.sfxTrash = this.game.add.audio('trash');
		this.sfxTrash.allowMultiple = true;

		this.sfxVacuum = this.game.add.audio('vacuum');
		this.sfxVacuum.allowMultiple = true;

		this.sfxCoinAdd = this.game.add.audio('coinAdd', 0.6);
		this.sfxCoinAdd.allowMultiple = true;

		this.sfxCoinFin = this.game.add.audio('coinFin', 0.4);

		//this.music.play();
		//this.music.pause();
		//this.pause = true;
	}


	playEffect(effect){
		if (effect=='feather') this.sfxFeather.play();
		if (effect=='paper') this.sfxFeather.play();
		if (effect=='flower') this.sfxFeather.play();
		if (effect=='framephoto') this.sfxFramePhoto.play();
		if (effect=='glass') this.sfxGlass.play();
		if (effect=='vase') this.sfxGlass.play();
		if (effect=='pillow') this.sfxPillow.play();
		if (effect=='sponge') this.sfxSponge.play();
		if (effect=='trash') this.sfxTrash.play();
		if (effect=='vacuum') this.sfxVacuum.play();
		if (effect == 'coinAdd')this.sfxCoinAdd.play();
		if (effect == 'coinFin')this.sfxCoinFin.play();
	}

	playBgWin(){

		if (this.music.currentMarker != 'bgWin'){

			this.music.stop();
			this.music = this.game.add.audio('bgWin', 1.2, false);
			this.music.play();
			//console.log('win');
		}
	}


	pauseMusic(){

		//console.log('s ' + this.music.isPlaying + " " + this.music.currentMarker);

		this.pause = true;
		this.music.pause();
		

		
	}

	resumeMusic(){

		if (this.music.isPlaying == false){

			this.music.play();
		}else{

			this.music.resume();
		}

		//console.log('s ' + this.music.isPlaying + " " + this.music.currentMarker);

		this.pause = false;
		
		

		
	}

}
let soundMan = new SoundMan();

export default soundMan;