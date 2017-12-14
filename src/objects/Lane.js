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
    	 
    	//create lane
		this.bmdLane=this.game.add.bitmapData(GameData.columns*360,72);
		this.sprLane = this.game.add.sprite(0,this.line*(72*GameData.scaleFactor),this.bmdLane);
		this.sprLane.scale.x=GameData.scaleFactor;
		this.sprLane.scale.y=GameData.scaleFactor;
		this.level.landGroup.add(this.sprLane);
		for (var i=0;i<GameData.columns-1;i++){
			var bmds = this.game.make.bitmapData(360,72);
			bmds.width=360*GameData.scaleFactor;
			bmds.copy('lane'+this.lanes[this.line].type);
			//bmds.copy('lane9');
	    	this.bmdLane.draw(bmds,i*360,0);
	    	bmds.destroy();
	    	bmds=null;
		}


		this.arah=1;
		if (Math.random()>0.5) this.arah=-1;

		if (this.lanes[this.line].type==1){//grass
			variant=1;
			if (variant==1){//fence
				var numTriggers = GameData.boundsWidth/GameData.tileWidth;
  			    for (var i=0;i<numTriggers;i++){
					var bmds = this.game.make.bitmapData(72,72);
					bmds.copy('fence2');
	    			this.bmdLane.draw(bmds,i*72,0);
	    			bmds.destroy();
	    			bmds=null;
				}
			}else if (variant==2){//trees
							
			}else if (variant==3){//flowers
							
			}else if (variant==4){//rocks
 
			}
		} else if (this.lanes[this.line].type==3){//road
			var numTriggers = GameData.boundsWidth/(7*GameData.tileWidth);
		    var numObjects=0;
		    var space=GameData.boundsWidth/numTriggers;
			for(var i = 0; i<numTriggers-2 ; i++){
				this.objects[numObjects] = new Car(
														this.game,
														this.level,
														this,
														i*space,
														this.line*GameData.tileWidth-(50*GameData.scaleFactor)
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

	resize(ob, width, height) {
	  width = width.toInt();
	  height = height.toInt();

	  if (width != ob.width || height != ob.height) {
	    ob.width = width;
	    ob.height = height;

	    ob.canvas.width = width;
	    ob.canvas.height = height;

	    ob.baseTexture.width = width;
	    ob.baseTexture.height = height;

	    ob.textureFrame.width = width;
	    ob.textureFrame.height = height;

	    ob.texture.width = width;
	    ob.texture.height = height;

	    ob.refreshBuffer();
	    ob.dirty = true;
	}

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