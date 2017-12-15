import GameData from 'helpers/GameData'
import Car from 'objects/Car'
import Wood from 'objects/Wood'


class Lane {

	constructor(level,j,type,variant){
		this.level=level;
		this.land=level.land;
		this.game = level.game;
		this.line=j;
		this.y=j*GameData.tileWidth;
		this.lanes=this.land.level.lanes;
    	this.laneSpeed=this.game.rnd.integerInRange(2,5)*GameData.scaleFactor;
    	this.totMovingObjects = this.game.rnd.integerInRange(5,10);
		this.columns = new Array();
		this.objects = new Array();
    	this.itemArray = ['flower','rock1','rock2','bush'];
    	//create lane
		this.bmdLane=this.game.add.bitmapData(GameData.columns*360,72);
		this.sprLane = this.game.add.sprite(0,this.line*(72*GameData.scaleFactor),this.bmdLane);
		this.sprLane.scale.x=GameData.scaleFactor;
		this.sprLane.scale.y=GameData.scaleFactor;
		this.level.landGroup.add(this.sprLane);
		for (var i=0;i<GameData.screenWidth;i++){
			var obname="";
			switch (this.lanes[this.line].type) {
				case 1: Math.random()>0.5?obname='grass1':obname='grass2';break; 	//rumput
				case 2: obname='roadup';break; 										//batas rumput jalan
				case 3: Math.random()>0.9?obname='roadcrack':obname='road';break; 	//jalan
				case 4: obname='roadline';break; 									//garis jalan
				case 5: obname='roaddown';break; 									//batas jalan rumput
				case 6: obname='waterup';break; 									//batas rumput air
				case 7: obname='water'+this.game.rnd.integerInRange(1,4);break;  	//air
				case 8: obname='waterdown';break;									//batas air rumput
			}
			this.addBMD(i*72,0,72,72,obname);
			//add shade to unplayable areas
			if (i<GameData.leftOffset || i>GameData.rightOffset) this.addBMD(i*72,0,72,72,'shade');
		}


		this.arah=1;
		if (Math.random()>0.5) this.arah=-1;


		if (this.lanes[this.line].type==1){//grass
			//batas
	   		//this.drawToLane((GameData.leftOffset-1)*72,0,72,72,this.randomItem());
	   		//this.drawToLane((GameData.rightOffset+1)*72,0,72,72,this.randomItem());
			if (variant==1) this.drawFences();
			if (variant==2) this.drawOrnaments();			
			if (variant==3) this.drawOrnaments();			
		} else if (this.lanes[this.line].type==3){//road
			var numTriggers = GameData.boundsWidth/(7*GameData.tileWidth);
		    var numObjects=0;
		    var space=GameData.boundsWidth/numTriggers;
			for(var i = 0; i<numTriggers ; i++){
				this.objects[numObjects] = new Car(
														this.game,
														this.level,
														this,
														i*space,
														this.line*GameData.tileWidth-(72*GameData.scaleFactor)
													);
				numObjects++;
			}
		} else if (this.lanes[this.line].type==7){//water
			this.laneSpeed=this.game.rnd.integerInRange(1,3)*GameData.scaleFactor;
		    var space=360*GameData.scaleFactor;
			var numTriggers = GameData.boundsWidth/space;
		    var numObjects=0;
		    for (var i=0;i<numTriggers-1;i++){
				variant =  this.game.rnd.integerInRange(1,4)
				this.objects[numObjects] = new Wood(
														this.game,
														this.level,
														this,i*space,
														this.line*GameData.tileWidth+(10*GameData.scaleFactor), 
														numTriggers*space,
														variant
													);
				numObjects++;
			}
		}

	}

	drawFences(){
		var openingLeft = this.game.rnd.integerInRange(GameData.leftOffset,GameData.rightOffset);
		var openingRight= openingLeft + this.game.rnd.integerInRange(1,4);
		if (openingRight>GameData.rightOffset) openingRight=GameData.rightOffset;


		var numTriggers = GameData.boundsWidth/GameData.tileWidth;
		var ctr=0;
	    for (var i=0;i<numTriggers;i++){	   
	    	var arrayContent = undefined; 	
	    	if (i<openingLeft || i> openingRight) {
	    		arrayContent = 'fence2'
				this.drawToLane(i*72,0,72,72,arrayContent);
	    	}
			if (i>=GameData.leftOffset && i<=GameData.rightOffset){
				this.lanes[this.line].rows[ctr]=arrayContent;
				ctr++;
			}
		}
	}

	drawTrees(){
	}

	drawOrnaments(){
		var openingLeft = this.game.rnd.integerInRange(GameData.leftOffset,GameData.rightOffset);
		var openingRight= openingLeft + this.game.rnd.integerInRange(1,4);
		if (openingRight>GameData.rightOffset) openingRight=GameData.rightOffset;


		var numTriggers = GameData.boundsWidth/GameData.tileWidth;
		var ctr=0;
		var prev="";
	    for (var i=0;i<numTriggers;i++){	   
	    	var arrayContent = undefined; 	
	    	if (prev==""){
		    	if (i<openingLeft || i> openingRight) {
		    		if (Math.random()>0.8) {
			    		arrayContent = this.randomItem();
			    		var xpos=72;
			    		if (arrayContent=='rock2'||arrayContent=='bush') xpos=144;
						this.drawToLane(i*72,0,xpos,72,arrayContent);
					}
		    	}
				if (i>=GameData.leftOffset && i<=GameData.rightOffset && arrayContent!='flower'){
					if (this.lanes[this.line].rows[ctr]!=undefined) console.log("Waduuh" + this.lanes[this.line].rows[ctr]);
					this.lanes[this.line].rows[ctr]=arrayContent;
					ctr++;
					if (arrayContent=='rock2'||arrayContent=='bush'){
						prev=arrayContent;
					}
				}
			}else{
				prev="";
				this.lanes[this.line].rows[ctr]=prev;
				ctr++;

			}
		}
	}

	randomItem(){
    	return this.itemArray[this.game.rnd.integerInRange(0,3)];
	}
		
	drawToLane(x,y,w,h,name){
		var bmds = this.game.make.bitmapData(w,h);
		bmds.copy(name);
		this.bmdLane.draw(bmds,x,y,w,h);
		bmds.destroy();
	    bmds=null;
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
	}
}

export default Lane;