
import GameData from 'helpers/GameData'
import Hammer from 'hammerjs'

class GameTouch {

	constructor(game){
		this.initialized = false;
		this.swipeDispatched = false;
        this.holdDispatched = false;

        this.isTouching = false;
        this.isHolding = false;


	}




	create(avatar,game){
		this.avatar=avatar;
		this.game = game;
		this.initialized = true;
		this.onSwipe = new Phaser.Signal();
        this.onTap = new Phaser.Signal();
		this.onHold = new Phaser.Signal();	

		this.onTap.add(this.onTaps,this);
		this.onSwipe.add(this.onMove,this);
		GameTouch.SWIPE = 0;
	    GameTouch.TAP = 1;	
    	GameTouch.HOLD = 2;

	    GameTouch.TIMES = {
	        HOLD: 150,
	        SWIPE: 250
	    };



		this.cl=0;
	} 

	onTaps(){
		this.avatar.move('jump');

		/*
//		var dx=this.game.input.activePointer.position.x-this.game.input.activePointer.positionDown.x;
//		var dy=this.game.input.activePointer.position.y-this.game.input.activePointer.positionDown.y;
//		console.log(this.game.input.activePointer.positionDown.x + " , " + this.game.input.activePointer.positionDown.y);
		var dx=this.avatar.x-this.game.camera.x-this.game.input.activePointer.positionDown.x;
		var dy=this.avatar.y-this.game.camera.y-this.game.input.activePointer.positionDown.y;
		//console.log(dx + " , " + dy);


		if (Math.abs(dx)>Math.abs(dy)){
			if (dx>=0)	this.avatar.move('right');
			if (dx<0)	this.avatar.move('left');
		}else{
			if (dy<=0)	this.avatar.move('down');
			if (dy>0)	this.avatar.move('jump');
		}
//			this.game.add.tween(this.avatar).to( { y: this.avatar.y-this.avatar.jumpPower}, this.avatar.jumpSpeed, Phaser.Easing.Back.In, true);
	*/
	}

	onMove(a,b,c) {
		var dx=this.game.input.activePointer.position.x-this.game.input.activePointer.positionDown.x;
		var dy=this.game.input.activePointer.position.y-this.game.input.activePointer.positionDown.y;
		if (Math.abs(dx)>Math.abs(dy)){
			if (dx>=0)	this.avatar.move('left');
			if (dx<0)	this.avatar.move('right');
		}else{
			if (dy<=0)	this.avatar.move('jump');
			if (dy>0)	this.avatar.move('down');
		}
		//console.log(dx + "," + dy);
	}

	updateSwipe (distance, duration) {
        if (duration === -1) {
            this.swipeDispatched = false;
        } else if (!this.swipeDispatched && distance > 50 &&  duration > 50 && duration < GameTouch.TIMES.SWIPE) {
            var positionDown = this.game.input.activePointer.positionDown;
            this.onSwipe.dispatch(this, positionDown,distance);

            this.swipeDispatched = true;
        }
    };

	updateTouch (distance, duration) {
        var positionDown = this.game.input.activePointer.positionDown;

        if (duration === -1) {
                    if (this.isTouching) {
                this.onTap.dispatch(this, positionDown);
            }

            this.isTouching = false;
            this.isHolding = false;
            this.holdDispatched = false;

        } else if (distance < 10) {
            if (duration < GameTouch.TIMES.HOLD) {
                this.isTouching = true;
            } else {
                this.isTouching = false;
                this.isHolding = true;

                if (!this.holdDispatched) {
                    this.holdDispatched = true;

                    this.onHold.dispatch(this, positionDown);
                }
            }
        } else {
            this.isTouching = false;
            this.isHolding = false;
        }
    };


	update(){
	  	var distance = Phaser.Point.distance(this.game.input.activePointer.position, this.game.input.activePointer.positionDown);
        var duration = this.game.input.activePointer.duration;

        this.updateSwipe(distance, duration);
		this.updateTouch(distance, duration);
	}


}
let gameTouch = new GameTouch();
export default gameTouch;

