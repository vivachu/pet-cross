class SoundMan {

	constructor(game){
		this.game = game;
	}	


	create (game){
		this.game = game;

		this.music = this.game.add.audio('bgMusic', 0.3, true);
		this.music.allowMultiple = false;

		this.sfxTap = this.game.add.audio('taps');
		this.sfxTap.addMarker('tap1', 0, 0.234);
		this.sfxTap.addMarker('tap2', 0.234, 0.208);
		this.sfxTap.allowMultiple = true;

		this.sfxMove = this.game.add.audio('move', 1);
		this.sfxMove.allowMultiple = true;

		this.sfxDead = this.game.add.audio('dead', 1);
		this.sfxDead.allowMultiple = true;

		this.sfxCoinAdd = this.game.add.audio('coinAdd', 0.6);
		this.sfxCoinAdd.allowMultiple = true;

		this.sfxCoinAdd = this.game.add.audio('coinAdd', 0.6);
		this.sfxCoinAdd.allowMultiple = true;

		this.sfxCoinFin = this.game.add.audio('coinFin', 0.4);
		this.sfxCoinFin.allowMultiple = true;
		
		//this.music.play();
		//this.music.pause();
		//this.pause = true;
	}


	playEffect(effect){

		if (effect == 'move')this.sfxMove.play();
		if (effect == 'dead')this.sfxDead.play();
		if (effect == 'coinAdd')this.sfxCoinAdd.play();
		if (effect == 'coinFin')this.sfxCoinFin.play();

	}

	playBgWin(){

		if (this.music.currentMarker != 'bgWin'){

			this.music.stop();
			this.music = this.game.add.audio('bgWin', 1, false);
			this.music.play();
			//console.log('win');
		}
	}


	pauseMusic(){

		//console.log('s ' + this.music.isPlaying + " " + this.music.currentMarker);

		this.pause = true;
		this.music.pause();
		

		
	}

	playBGMusic(){
		
		this.music.play();
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