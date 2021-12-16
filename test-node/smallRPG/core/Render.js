function render (MAP, MESSAGE) {
  
}


class Render {
  constructor (GL, priod = 100, callback = () => {}) {
    this.GL = GL;
    this.priod = priod;
    this.update = callback;
    this.updateQueue = [];
    this.timer = null;
  }

  start () {
    this.GL.$Ios.start();
    this.GL.$Ios.useRaw();
    this.timer = setInterval(()=>{
      if(this.GL.$Game_Map) this.__updateMap();
      // if(this.GL.$Game_Message) this.__updateMessage();
      this.GL.$Ios.write('\n');
      this.update();
      this.updateQueue.map(updateInfo => {
        if(updateInfo.needUpdate) updateInfo.update();
      });
    }, this.priod);
  }

  __updateMap () {
    const MAP = this.GL.$Game_Map;
    const ios = this.GL.$Ios;
    MAP.update();
    ios.writeChain().clear().setArrow(0, 20);
    MAP.foreach((dt, isNew, x, y)=>{
      const event = MAP.getEvent(x, y);
      if(isNew) ios.write('\n');
      ios.writeChain()
        .setFont(`${event ? event.charColor : ''}`, dt.color, `${event ? event.char : '   '}`)
        .clearProps();
    });
  }
  __updateMessage () {
    this.GL.$Game_Message.render();
  }
}

module.exports = Render;