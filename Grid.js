

class Grid{
	constructor(blkW,blkH){
		this.w = width;
		this.h = height;
		this.blkW = blkW || 50;
		this.blkH = blkH || 50;
		this.cells = [];
	}
	build(){
		for(let x=0;x<this.w;x+=this.blkW){
			for(let y=0;y<this.h;y+=this.blkH){
				this.cells.push( this.onAdd(x,y,this.blkW,this.blkH) );
			}
		}
	}
	onAdd(x,y,blkW,blkH){
		return new PatternSquare(x,y,blkW,blkH);
	}
	render(){
		for(let c of this.cells){
			c.render();
		}
	}
}
