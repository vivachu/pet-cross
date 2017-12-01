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
    	this.laneSpeed=this.game.rnd.integerInRange(2,4)*GameData.scaleFactor;
    	this.totMovingObjects = this.game.rnd.integerInRange(5,10);
		this.columns = new Array();
		this.objects = new Array();
    	 
    	//create lane
		for (var i=0;i<GameData.columns;i++){
	    	this.columns[i]=this.land.level.landGroup.create(i*360,this.line*72,'lane'+this.lanes[this.line].type);
			this.land.addChild(this.columns[i]);	

		}

		if (variant==1){
			console.log(
				"cedfsd");
						}

		//create moving objects
		if (this.lanes[this.line].type==3){
			this.arah=1;
   			if (Math.random()>0.5) {
   				this.arah=-1;
			}
			var numTriggers = GameData.boundsWidth/(5*GameData.tileWidth);
		    var numObjects=0;
		    var space=GameData.boundsWidth/numTriggers;
			for(var i = 0; i<numTriggers-2 ; i++){
				this.objects[numObjects] = new Car(this.game,this.level,this,i*space,(this.line-1)*(72*GameData.scaleFactor));
				numObjects++;
			}
		}
		if (this.lanes[this.line].type==7){
			this.arah=1;
   			if (Math.random()>0.5) {
   				this.arah=-1;
			}
			var numTriggers = GameData.boundsWidth/(5*GameData.tileWidth);
		    var numObjects=0;
		    var space=GameData.boundsWidth/numTriggers;
			for(var i = 0; i<numTriggers-2 ; i++){
				this.objects[numObjects] = new Wood(this.game,this.level,this,i*space,this.line*(72*GameData.scaleFactor));
				numObjects++;
			}
		}


	}


	destroy(){
		for (var i=0;i<GameData.columns;i++){
			this.columns[i].body=null;
			this.columns[i].destroy();
		}
		for (var j=0;j<this.objects.length;j++){
			this.objects[j].body=null;
			this.objects[j].destroy();
		}


		this.columns=null;
		//this.sp2.kill();
		//this.sp3.kill();
		//this.tnumber.kill();

	}
}

export default Lane;