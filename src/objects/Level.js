import GameData from 'helpers/GameData'
import LogScreen from 'helpers/LogScreen'
import SoundMan from 'helpers/SoundMan'
import Land from 'objects/Land';
import Avatar from 'objects/Avatar';
import AvatarTrail from 'objects/AvatarTrail';
import TimeBar from 'objects/TimeBar'; 
import ProgressCounter from 'objects/ProgressCounter'; 
import Lives from 'objects/Lives'; 
import Tutorial from 'helpers/Tutorial'; 


class Level extends Phaser.Sprite{


	constructor(game, main){

		Level.laneType = {
	        type: 0,
	        pos: 0
	    };



		super(game, 0, 0, '');
		this.main=main;
		this.game=game;

		//set the bounds with to 360+720+360 , so there's enough space in both sides for the items to popups
		this.game.world.setBounds(0, 0, GameData.boundsWidth,30000);

		//creating level 
		const lGrass = 1;
		const lroad = 2;
		const lwater = 3;


		var ctr=0;		//counter
		var laneid=0;	//lane number    
	    this.lanes = new Array();
	    var prevLane=0;
	    
		this.prevVariant=0;

	    var pakeFence=0;
	    for (var i=0;i<5;i++){
		    	this.addLane(laneid,1,5);laneid++;
		}
	    for (var i=0;i<5;i++){
		    	this.addLane(laneid,1,4);laneid++;
		}
	    while (ctr<GameData.totalLanes){
	    	//var laneType = lGrass;//debug
	    	var laneType = this.game.rnd.integerInRange(1,3); 
	    	if (laneType==2 && prevLane==3) laneType=lGrass;
	    	if (laneType==3 && prevLane==2) laneType=lGrass;


	    	if (laneType==lGrass){
	    		//grass
	    		if (prevLane==lroad) {this.addLane(laneid,5);laneid++;ctr++;}
	    		if (prevLane==lwater) {this.addLane(laneid,8);laneid++;ctr++;}
		    	this.addLane(laneid,1,this.getVariant());laneid++;ctr++;
		    	this.addLane(laneid,1,this.getVariant());laneid++;ctr++;
		    	this.addLane(laneid,1,this.getVariant());laneid++;ctr++;
	    	}
	    	if (laneType==lroad){
	    		//road
	    		if (prevLane==lGrass) {this.addLane(laneid,2);laneid++;ctr++;}
	    		if (prevLane==lroad) {this.addLane(laneid,4);laneid++;ctr++;}
				if (Math.random()>.3){
			    	this.addLane(laneid,3);laneid++;ctr++;
				}else{
			    	this.addLane(laneid,3);laneid++;ctr++;
			    	this.addLane(laneid,4);laneid++;ctr++;
			    	this.addLane(laneid,3);laneid++;ctr++; 
				}
	    	}
	    	if (laneType==lwater){
	    		//water
	    		if (prevLane==lGrass) {this.addLane(laneid,6);laneid++;ctr++;}
		    	this.addLane(laneid,7);laneid++;ctr++;
		    	this.addLane(laneid,7);laneid++;ctr++;
		    	this.addLane(laneid,7);laneid++;ctr++;
	    	}
	    	prevLane = laneType;

		    
	    }
	    if (prevLane==lroad) {this.addLane(laneid,5);laneid++;ctr++;}
		if (prevLane==lwater) {this.addLane(laneid,8);laneid++;ctr++;}
	    for (var i=0;i<10;i++){
		    	this.addLane(laneid,1,5);laneid++;
		}
	    GameData.totalLanes=laneid-1;
   		this.land= new Land(this.game, this);


//		this.game.world.setBounds(0, 0, GameData.boundsWidth, GameData.totalLanes*GameData.tileWidth);
		this.avatar = new Avatar(this.game, this);
		this.avatarTrail = new AvatarTrail(this.game, this, this.avatar);
		this.avatar.trail=this.avatarTrail;

		this.game.camera.focusOnXY(this.avatar.x, this.avatar.y-(200*GameData.scaleFactor));
		this.game.camera.follow(this.avatar.tofollow, Phaser.Camera.FOLLOW_LOCKON, 0.03, 0.03);

		var dWidth=this.game.width-(150*GameData.scaleFactor);
		var dHeight=this.game.height*.5;

		GameData.coinCollected = 0;
		GameData.ticketCollected = 0;

		

////////debug
	//		LogScreen.enableFPSCounter=true;
	//		var style0 = {font: "20px Arial", fill: "#ff00ff", align: "center"};
	//		this.textConsole0 = this.game.add.text(0, 0, 'campos: ' + this.game.camera.y,this.style0);
	//	    this.textConsole0.fixedToCamera = true;
////////debug

	/*		this.style0 = {font: "20px Arial", fill: "#ff00ff", align: "center"};
			this.textLives = this.game.add.text(this.game.width/2, 100*GameData.scaleFactor, this.style0);
			this.textLives.anchor.setTo(0.5,0.5);
		    this.textLives.fixedToCamera = true;
		    */


	}

	begin(){
		this.main.timeBar = new TimeBar(this.game, this.main);
		this.main.progressCounter = new ProgressCounter(this.game, this.main);
		this.main.lives = new Lives(this.game, this.main);

	}

	getVariant(){
    	var newVariant = this.game.rnd.integerInRange(1,3);
    	if (newVariant==1 && this.prevVariant<4) newVariant=4;
    	if (this.prevVariant==1) newVariant = 4;
    	this.prevVariant=newVariant;
    	return newVariant;
    }


	addLane(laneid,laneType,variant){
		this.lanes[laneid]={
		    	type:laneType, 
		    	variant:variant,
		    	pos:laneid, 
		    	onscreen:false,
		    	rows:new Array()
		};
	}

	gameOver(){
		//console.log("GAMEOVER");
		SoundMan.playEffect('dead');
		GameData.lives--;
		this.main.lives.setValue();
		if (GameData.lives==0){
			GameData.totalLanes=0;
			GameData.lose=true;
			this.gameWin();
		}else{
			GameData.gameState=3;
			this.avatar.playAgain();
		}

	}

	gameWin(){
		this.main.initGameFinished();
	}

	update(){
		if (GameData.gameState!=4){
			this.avatar.update();
			this.avatar.bringToTop();
			var ln=Math.round(this.game.camera.y/GameData.tileWidth);
			GameData.playDistance= this.avatar.starty - this.avatar.posy;
			//this.textConsole0.text ='campos: ' + this.avatar.inWater + ',' + this.avatar.posy;
			//this.textConsole0.text = 'loc : ' + this.avatar.posx + " , " + this.avatar.posy + " , " +this.game.camera.y;
			//this.textConsole0.text = 'fps : ' + this.game.time.fps;
			//this.textConsole0.text = 'sw : ' + GameData.leftOffset;
			//this.textLives.text = GameData.playDistance;
			this.land.checkLane();
		}
	}
}

export default Level;
