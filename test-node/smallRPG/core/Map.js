class Map {
  constructor (sx, sy) {
    if(sx instanceof Array) {
      this.sx = sx[0].length;
      this.sy = sx.length;
      this.data = sx;
      this.events = sy;
    }else{
      this.sx = sx;
      this.sy = sy;
      this.data = [];
      this.events = [];
      for(let y = 0; y < sy; y+=1){
        this.data[y].push([]);
        for(let x = 0; x < sx; x+=1){
          const mapdata = {
            canPass: true,
            color: 'yellow',
          };
          this.data[y][x].push(mapdata);
        }
      }
    }
  }
  foreach (callback = (data, isNewLine, x, y)=>void 0) {
    let isNewLine = false;
    for(let y = 0; y < this.sy; y+=1){
      isNewLine = true;
      for(let x = 0; x < this.sx; x+=1){
        callback(this.data[y][x], isNewLine, x, y);
        isNewLine = false;
      }
    }
  }
  getEvent (x, y) {
    for(let i = 0; i < this.events.length; i+=1){
      if(this.events[i].x === x && this.events[i].y === y) return this.events[i];
    }
    return null;
  }
  judgePass (x, y) {
    if(x < 0 || y < 0 || x >= this.sx || y >= this.sx) return false;
    if( this.getEvent(x, y) ) return false;
    return this.data[y][x].canPass;
  }
  update () {
    this.events.map(event => {
      event.update && event.update();
    })
  }
}

module.exports = Map;