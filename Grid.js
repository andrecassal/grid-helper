class Grid{
	constructor(){
		this.img = false;
		this.swatch = false;
		this.__bg = false;
		this.__fg = false;
		this.__str = false;
		this.sw=0;
		this.sh=0;
		this.__recursion=false;
		this.__super=false;
	}
	setImage(img){
		this.img = img;
		this.w = img.width;
		this.h = img.height;
	}
	setBlk(blk){
		this.w = this.w || width;
		this.h = this.h || height;
		this.blkWidth = blk || 50;
		this.blkHeight = blk || 50;
		this.cols = floor(this.w / this.blkWidth) + 1;
		this.rows = floor(this.h / this.blkHeight) + 1;
		this.sw=0;
		this.sh=0;
		this.spacing = 0;
	}
	setGrid(cols,rows){
		this.cols = cols || this.cols || 10;
		this.rows = rows || this.rows || 10;
		this.spacing = this.spacing || 0;
		this.w = (this.w || width) - this.spacing;
		this.h = (this.h || height) - this.spacing;
		this.sw = (this.spacing / this.cols);
		this.sh = (this.spacing / this.rows);
		this.blkWidth = this.w / this.cols - this.sw;
		this.blkHeight = this.h / this.rows - this.sh;
	}
	setRecursion(func){
		return this.__recursion = func;
	}
	bg(){
		if(!this.__bg){
			this.__bg = random(this.swatch);
		}
		return this.__bg;
	}
	fg(){
		if(!this.__fg){
			this.__fg = random(this.swatch);
			while( this.__fg == this.__bg ){
				this.__fg = random(this.swatch);
			}
		}
		return this.__fg
	}
	clr(){
		return random(this.swatch);
	}
	render(){
		this.x = this.x || 0;
		this.y = this.y || 0;
		this.spacing = this.spacing || 0;
	
		this.yi=0;
		this.xi=0;
		push();
		translate(this.x,this.y)
		let bw = this.blkWidth;
		let bh = this.blkHeight;
		let s1 = this.spacing - this.sw;
		let s2 = this.spacing - this.sh;
		let w = this.w - this.spacing*2;
		let h = this.h - this.spacing*2;
		for(let y=0;y<h;y+=bh){
			this.xi=0;
			for(let x=0;x<w;x+=bw){
				if(this.__recursion&&this.__recursion.apply(this,[this.current])){
					push()
					let r = new Grid();
					Object.assign(r, this);
					r.__super = this;
					r.x = x+s1;
					r.y = y+s2;
					r.w = bw;
					r.h = bh;
					r.setBlk((bw*0.5));
					r.render();
					pop()
				}else{
					this.onRenderItem(x+s1,y+s2,bw,bh)
				}
				this.xi++;
			}
			this.yi++;
		}
		pop();
	}
	onRenderItem(x,y,w,h){}
}






