import GameData from 'helpers/GameData'
import Car from 'objects/Car'
import Coin from 'objects/Coin'
import Ticket from 'objects/Ticket'
import Wood from 'objects/Wood'


class Lane {

	constructor(level,j,type,variant){
		this.level=level;
		this.land=level.land;
		this.game = level.game;
		this.line=j;
		this.y=j*GameData.tileWidth;
		this.lanes=this.land.level.lanes;
    	this.laneSpeed=this.game.rnd.integerInRange(2,8)*GameData.scaleFactor;
    	this.totMovingObjects = this.game.rnd.integerInRange(5,10);
		this.columns = new Array();
		this.objects = new Array();
    	this.itemArray = ['flower','rock1','bush'];
    	//create lane
		this.bmdLane=this.game.add.bitmapData(GameData.columns*360,144);
		this.sprLane = this.game.add.sprite(0,this.line*(144*GameData.scaleFactor),this.bmdLane);
		this.sprLane.scale.x=GameData.scaleFactor;
		this.sprLane.scale.y=GameData.scaleFactor;
		this.level.landGroup.add(this.sprLane);
		this.numObjects=0;
		this.bonusOnLane = false;
		for (var i=0;i<GameData.screenWidth;i++){
			var obname="";
			var lanetype = this.lanes[this.line].type;
			switch (lanetype) {
				case 1: Math.random()>0.5?obname='grass1':obname='grass2';break; 	//rumput
				case 2: obname='roadup';break; 										//batas rumput jalan
				case 3: Math.random()>0.9?obname='roadcrack':obname='road';break; 	//jalan
				case 4: obname='roadline';break; 									//garis jalan
				case 5: obname='roaddown';break; 									//batas jalan rumput
				case 6: obname='waterup';break; 									//batas rumput air
				case 7: obname='water'+this.game.rnd.integerInRange(1,4);break;  	//air
				case 8: obname='waterdown';break;									//batas air rumput
			}
			this.addBMD(i*144,0,144,144,obname);
			//add shade to unplayable areas
			if (i<GameData.leftOffset || i>GameData.rightOffset) this.addBMD(i*144,0,144,144,'shade');
		}

		if (GameData.arahLane==1) this.arah=-1; else this.arah=1;
		GameData.arahLane=this.arah;
		if (this.lanes[this.line].type==1){//grass
			//batas
	   		//this.drawToLane((GameData.leftOffset-1)*72,0,72,72,this.randomItem());
	   		//this.drawToLane((GameData.rightOffset+1)*72,0,72,72,this.randomItem());
			if (variant==1) this.drawFences();
			if (variant==2) this.drawOrnaments();			
			if (variant==3) this.drawOrnaments();			
			if (variant==5) this.drawHighlight();			
		} else if (this.lanes[this.line].type==3){//road
			var numTriggers = GameData.boundsWidth/GameData.tileWidth;		    
		    var space=GameData.boundsWidth/numTriggers;
			for(var i = 0; i<numTriggers ; i+=4){
				if (Math.random()>0.4){				
					this.objects[this.numObjects] = new Car(
														this.game,
														this.level,
														this,
														i*space,
														this.line*GameData.tileWidth-(144*GameData.scaleFactor)
													);
					this.numObjects++;
				}
			}
		} else if (this.lanes[this.line].type==7){//water
			this.laneSpeed=this.game.rnd.integerInRange(1,3)*GameData.scaleFactor;
		    var space=576*GameData.scaleFactor;
			var numTriggers = GameData.boundsWidth/space;
		    for (var i=0;i<numTriggers-1;i++){
				variant =  this.game.rnd.integerInRange(1,4);
				if (i==0) variant=1;
				if (variant<4){
					this.objects[this.numObjects] = new Wood(
														this.game,
														this.level,
														this,i*space,
														this.line*GameData.tileWidth+(10*GameData.scaleFactor), 
														numTriggers*space,
														variant
													);
					this.numObjects++;
				}
			}
		}

	}

	drawFences(){
		var mid=(GameData.rightOffset-GameData.leftOffset)/2;
		var openingLeft = this.game.rnd.integerInRange(GameData.leftOffset,mid-1);
		var openingRight= openingLeft+this.game.rnd.integerInRange(1,2);
		if (openingRight>GameData.rightOffset) openingRight=GameData.rightOffset;


		var numTriggers = GameData.boundsWidth/GameData.tileWidth;
		var ctr=0;
	    for (var i=0;i<numTriggers;i++){	   
	    	var arrayContent = undefined; 	
	    	if (i<openingLeft || i> openingRight) {
	    		arrayContent = 'fence2'
				this.drawToLane(i*144,0,144,144,arrayContent);
	    	}
			if (i>=GameData.leftOffset && i<=GameData.rightOffset){
				this.lanes[this.line].rows[ctr]=arrayContent;
				ctr++;
			}
		}
	}

	drawTrees(){
	}

	drawHighlight(){
		var numTriggers = GameData.boundsWidth/GameData.tileWidth;
		var ctr=0;
	    for (var i=0;i<numTriggers;i++){	   
			this.drawToLane(i*144,0,144,144,'highlight');
		}		
	}
	
	drawOrnaments(){
		var openingLeft = this.game.rnd.integerInRange(GameData.leftOffset,GameData.rightOffset);
		var openingRight= openingLeft + this.game.rnd.integerInRange(1,4);
		if (openingRight>GameData.rightOffset) openingRight=GameData.rightOffset;


		var numTriggers = GameData.boundsWidth/GameData.tileWidth;
		var ctr=0;
	    for (var i=0;i<numTriggers;i++){	   
	    	var arrayContent = undefined; 	
//		    	if (i<openingLeft || i> openingRight) {
		    		if (Math.random()>0.8) {
			    		arrayContent = this.randomItem();
						this.drawToLane(i*144,0,144,144,arrayContent);
					}
//		    	}
				if (i>=GameData.leftOffset && i<=GameData.rightOffset){
					if (arrayContent!='flower') this.lanes[this.line].rows[ctr]=arrayContent;
/*					if (arrayContent==undefined){
						this.addBonus(i*144);
					}*/
					ctr++;
				}

		}
	}

	randomItem(){
    	return this.itemArray[this.game.rnd.integerInRange(0,2)];
	}
		
	drawToLane(x,y,w,h,name){
		var bmds = this.game.make.bitmapData(w,h);
		bmds.copy(name);
		this.bmdLane.draw(bmds,x,y,w,h);
		bmds.destroy();
	    bmds=null;
	}

	addBonus(x){
			console.log(GameData.ticketOnMap);
			if (Math.random()>0.8 && !this.bonusOnLane && GameData.ticketOnMap<1){
				this.bonusOnLane=true;
				GameData.ticketOnMap++;
				this.objects[this.numObjects] = new Ticket(
														this.game,
														this.level,
														this,
														x,
														this.line*GameData.tileWidth-(144*GameData.scaleFactor)
													);
				this.numObjects++
			return;
			}
		if (Math.random()>0.95 && !this.bonusOnLane){
			this.bonusOnLane=true;
			this.objects[this.numObjects] = new Coin(
														this.game,
														this.level,
														this,
														x,
														this.line*GameData.tileWidth-(144*GameData.scaleFactor)
													);
			this.numObjects++
		}
	}


	addBMD(x,y,w,h,name){
		var bmds = this.game.make.bitmapData(w,h);
		bmds.width=w*GameData.scaleFactor;
		bmds.copy(name);
    	this.bmdLane.draw(bmds,x,y);
    	bmds.destroy();
    	bmds=null;
	}

	destroy(){
		this.bmdLane.destroy();
		this.sprLane.destroy();
		this.bmdLane=null;
		this.sprLane=null;
		for (var j=0;j<this.objects.length;j++){
			this.objects[j].body=null;
			this.objects[j].destroy();
		}
		this.columns=null;
		this.destroy();
	}
}

export default Lane;