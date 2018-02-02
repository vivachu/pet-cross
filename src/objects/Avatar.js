import GameData from 'helpers/GameData'
import GameKey from 'helpers/GameKey'
import GameTouch from 'helpers/GameTouch'


class Avatar extends Phaser.Sprite{

	constructor(game, level){

		super(game, 0,0, 'avatar');
		this.game = game;
		this.level = level;
		this.game.add.existing(this);
		
		this.width=GameData.tileWidth;
		this.height=GameData.tileWidth;  

 		this.setpos(GameData.midOffset,GameData.totalLanes-8);
 //		this.setpos(GameData.midOffset,300);
 		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		
	    this.lastSafePosty = this.posy;
	    this.lastSafePostx = this.posx;
	    this.starty = this.posy;
		this.body.immovable = false;
    	this.body.collideWorldBounds = true;
    	this.body.bounce.setTo(1, 1);

    	this.jumpPower = GameData.tileWidth;
    	this.jumpSpeed = 100;
    	this.keyfree=true;
    	GameKey.create(this,this.game);
    	GameTouch.create(this,this.game);
    	this.tofollow = this.game.add.sprite(0,0,'');
    	this.addChild(this.tofollow);
    	this.tofollow.y=-1000*GameData.scaleFactor;


    	this.rideObject=null;
    	this.rideOffset=0;
    	this.ready=true;
    	this.inWater=false;

    	this.missFlag=0;
    	this.keceburCounter=0;
	}

	setpos(xtile,ytile){
		this.posx=xtile;
		this.posy=ytile;
		this.position.setTo(GameData.tileWidth*xtile,GameData.tileWidth*ytile);
	}

	move(arah){
		if (GameData.gameState!=1) return;
		if (arah=='left' && this.posx<GameData.rightOffset){
			if (this.level.lanes[this.posy].rows[this.posx-GameData.leftOffset+1] != undefined) return;
   	    	this.posx++;
 	    	GameKey.keyfree=false;
 	    	if (this.rideObject) this.rideObject.ridden=false;
 	    	this.rideObject = null;
 	    	this.rideOffset = 0;
 	    	this.ready=false;
 	    	this.inWater=false;
   	    	this.game.add.tween(this).to( { x: this.x+this.jumpPower}, this.jumpSpeed, Phaser.Easing.Bounce.Out, true).onComplete.add(this.tweenFinished, this);
		}
		if (arah=='right' && this.posx>GameData.leftOffset){
			if (this.level.lanes[this.posy].rows[this.posx-GameData.leftOffset-1] != undefined) return;
   	    	this.posx--;
 	    	GameKey.keyfree=false;
 	    	if (this.rideObject) this.rideObject.ridden=false;
 	    	this.rideObject = null;
 	    	this.rideOffset = 0;
 	    	this.ready=false;
 	    	this.inWater=false;
			this.game.add.tween(this).to( { x: this.x-this.jumpPower}, this.jumpSpeed, Phaser.Easing.Bounce.Out, true).onComplete.add(this.tweenFinished, this);
		}
		if (arah=='jump'){
			if (this.level.lanes[this.posy-1].rows[this.posx-GameData.leftOffset] != undefined) return;
  	    	this.posy--;
  	    	if (this.posy<5){
  	    		//win!
  	    		this.level.gameWin();
  	    	}
 	    	GameKey.keyfree=false;
 	    	if (this.rideObject) this.rideObject.ridden=false;
 	    	this.rideObject = null;
 	    	this.rideOffset = 0;
 	    	this.ready=false;
 	    	this.inWater=false;
 	    	this.posx=Math.round(this.x/GameData.tileWidth);
   	    	this.game.add.tween(this).to( { x:this.posx*GameData.tileWidth, y: this.y-this.jumpPower}, this.jumpSpeed, Phaser.Easing.Back.Out, true).onComplete.add(this.tweenFinished, this);
		}
		if (arah=='down'){
			if (this.level.lanes[this.posy+1].rows[this.posx-GameData.leftOffset] != undefined) return;
  	    	this.posy++;
 	    	GameKey.keyfree=false;
 	    	if (this.rideObject) this.rideObject.ridden=false;
 	    	this.rideObject = null;
 	    	this.rideOffset = 0;
 	    	this.ready=false;
 	    	this.inWater=false;
 	    	this.posx=Math.round(this.x/GameData.tileWidth);
  	    	this.game.add.tween(this).to( { x:this.posx*GameData.tileWidth, y: this.y+this.jumpPower}, this.jumpSpeed, Phaser.Easing.Bounce.Out, true).onComplete.add(this.tweenFinished, this);
		}

	}

	tweenFinished(){
		GameKey.keyfree=true;
		this.ready=true;
		this.checkLane();
	}

	playAgain(){
		//this.setpos(this.lastSafePostx,this.lastSafePosty);
 	  	this.missFlag=1;
		this.ready=false;
		this.inWater=false;
		this.rideObject=null;
	}

	missFinished(){
		GameData.gameState=1;
	}

	rideWood(wood){
		this.rideObject=wood;
		this.rideOffset=this.x-wood.x;
	}

	checkLane(){
		var currentLane=this.level.lanes[this.posy];
		if (currentLane.type==5 ||currentLane.type==8 || currentLane.type==2 ||currentLane.type==6) {
				this.lastSafePosty = currentLane.pos;
				this.lastSafePostx = this.posx;
				//console.log("this.lastSafePost : " + this.lastSafePostx + ", " + this.lastSafePosty);
		}

		if(currentLane.type==7){
			this.inWater=true;
		//	console.log("in water " + this.rideObject);
		}else{
			this.inWater=false;
		}
	}

	update(){ 
		if (this.missFlag==1){
			this.missFlag=0;
			//onsole.log("move to .lastSafePost : " + this.lastSafePostx + ", " + this.lastSafePosty);
			this.posx=this.lastSafePostx;
			this.posy=this.lastSafePosty;
	 	  	this.game.add.tween(this).to( { x: GameData.tileWidth*this.lastSafePostx, y: GameData.tileWidth*this.lastSafePosty}, 1000, Phaser.Easing.Linear.None, true).onComplete.add(this.missFinished, this);
		}
		if (GameData.gameState==1){
			GameKey.update();
			GameTouch.update();

			if (this.x<GameData.leftPixelOffset || this.x>GameData.rightPixelOffset) 
				this.level.gameOver();	


			if (this.inWater){
				if (this.rideObject!=null){
					this.keceburCounter=0;
					this.x=this.rideObject.x+this.rideOffset;
				}else{
					//console.log("kecebur");
					this.keceburCounter++;
					if (this.keceburCounter>5) {
						this.keceburCounter=0;
						this.level.gameOver();	
					}
				}
			}
		}
	}

}

export default Avatar;