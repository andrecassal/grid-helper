class Grid{
	constructor(){
		this.img = false;
		this.setPos();
		this.setBlk(25);
		this.swatch = false;
		this.__bg = false;
		this.__fg = false;
		this.__str = false;
	}
	setPos(x,y,w,h){
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || width;
		this.h = h || height;
	}
	setBlk(blk,min){
		this.blk = blk;
		this.blk2 = blk/2;
		this.minBlk = min || blk;
	}
	setImage(img){
		this.img = img;
		this.w = img.width;
		this.h = img.height;
	}
	str(){
		if(!this.__str){
			this.__strIndex=0;
			this.__str = "ABCDEFGHIJLKMNOPRSTUVXWYZ0123456789".split("");
		}
		// return random(this.__str);
		return this.__str[this.__strIndex++ % (this.__str.length-1)]
	}
	bg(){
		if(!this.__bg){
			this.__bg = random(this.swatch);
		}
		return this.__bg;
	}
	fg(){
		if(!this.__fg){
			do{
				this.__fg = random(this.swatch);
			}while( this.__fg == this.__bg)
		}
		return this.__fg
	}
	pixel(x,y,w,h){
		return random([1,0,1,1]);
		// x = floor(x + w/2);
		// y = floor(y + h/2);
		// let px = this.img.get(x,y)[0];
		// $(px,x,y)
		// return px < 40;
	}
	render(){
		this.xi=0;
		this.yi=0;
		push();
		translate(this.x,this.y)
		let w = this.blk;
		let h = this.blk;
		for(let x=0;x<this.w;x+=this.blk){
			for(let y=0;y<this.h;y+=this.blk){
				if( this.pixel(x,y,w,h) && this.blk > this.minBlk){
					//Recursion
					let u = new Grid();
					u.setPos(x,y,w,h);
					u.setBlk(w/2,this.minBlk);
					u.img = this.img;
					u.__strIndex = this.__strIndex;
					u.__str = this.__str;
					// u.__bg = this.__bg;
					// u.__fg = this.__fg;
					u.swatch = this.swatch;
					u.render();
				}else{
					this.onRenderItem(x,y,w,h)
				}
				this.xi++;
				this.yi++;
			}
		}
		pop();
	}
	onRenderItem(x,y,w,h){
		push();
		fill(this.bg());
		stroke(255)
		let r = 5;
		rect(x,y,w,h,r,r,r,r);
		noStroke();
		textFont(font);
		textSize((w+h)*0.3)
		textStyle(BOLD);
		fill(this.fg());
		textAlign(CENTER, CENTER);
		text(this.str(),x+w/2,y+h/2.5);
		// fill(this.fg())
		// ellipseMode(CENTER);
		// ellipse(x+w/2,y+h/2,r,r)
		pop();
	}
}






