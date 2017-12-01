import GameData from 'helpers/GameData'

class GameKey {

	constructor(game){
		this.initialized = false;
    	this.sLeft=1;
    	this.sRight=1;
    	this.sUp=1;
    	this.sDown=1;
	}

	create(avatar,game){
		this.avatar=avatar;
		this.game = game;
		this.initialized = true;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.keyfree = true; 
		this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceKey.onDown.add(this.tekan,this );
	}

	tekan(){
		console.log(this.avatar.inWater + " , " + this.avatar.rideObject + ", "  +GameData.gameState  );
	}

	update(){

		if (this.cursors.left.isDown && this.sLeft==1 && this.keyfree)
	    {
	    	this.sLeft=2;  
	    	this.avatar.move('right');
	    }
	    else if (this.cursors.right.isDown && this.sRight==1 && this.keyfree)
	    {
	    	this.sRight=2;
	    	this.avatar.move('left');
	    }
	    else if (this.cursors.up.isDown && this.sUp==1 && this.keyfree)
	    {
	    	this.sUp=2;
	    	this.avatar.move('jump');
	    }
  	    else if (this.cursors.down.isDown && this.sDown==1 && this.keyfree)
	    {
	    	this.sDown=2;
	    	this.avatar.move('down');
	    }


   		if (this.cursors.up.isUp && this.sUp==2) this.sUp=1;
   		if (this.cursors.down.isUp && this.sDown==2) this.sDown=1;
   		if (this.cursors.left.isUp && this.sLeft==2) this.sLeft=1;
   		if (this.cursors.right.isUp && this.sRight==2) this.sRight=1;

	}



}
let gameKey = new GameKey();
export default gameKey;