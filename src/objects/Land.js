import GameData from 'helpers/GameData'
import Lane from 'objects/Lane'


class Land extends Phaser.TileSprite{

	constructor(game, level){



		super(game, 0,0,game.width,0, 'grass1');
		this.game = game;
		this.level = level;
		this.game.add.existing(this); 
 		this.scale.setTo(GameData.scaleFactor,GameData.scaleFactor);
 		var j=0;
 		var tipe=0;
 		var prevtipe=0;
 		var prevLane=0;
	}

	checkLane(){
		var topLane=Math.round(this.game.camera.y/GameData.tileWidth);
		if (this.prevLane!=topLane){
			this.updateLane();
		}
	}

	updateLane(){
		var camLineTop=Math.round(this.game.camera.y/GameData.tileWidth)-1;
		var camLineBottom=camLineTop+21;
		if (camLineBottom>GameData.totalLanes) camLineBottom=GameData.totalLanes;
		var topLane=camLineTop-0;
		var numLane=camLineBottom-topLane+0;
		if (topLane<0) topLane=0;
		for (var i=topLane;i<topLane+numLane;i++){
			if (this.level.lanes[i].onscreen==false){
				if (i>=camLineTop && i<=camLineBottom){
					this.level.lanes[i].laneObject=new Lane(this.level,i,'lane6',this.level.lanes[i].variant);
					this.level.lanes[i].onscreen=true;
				}
			}else{
				if (i<camLineTop || i>camLineBottom){
					this.level.lanes[i].laneObject.destroy();
					this.level.lanes[i].laneObject=null;
					this.level.lanes[i].onscreen=false;
				}

			}
		}
	}

}

export default Land;