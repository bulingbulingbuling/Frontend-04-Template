//初步建立动画和时间线
//js实现动画 基本概念就是帧 js的基本功能就是实现每一帧需要做什么 连成一个动画
//js 里处理帧的方法
//一般的动画有一个16毫秒的概念 人眼识别60帧 1秒是1000毫秒 1000/60
// setInterval(()=>{},16)

// let tick = ()=>{
//   setTimeout(()=>{},16);
// }

//推荐使用
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATION = Symbol("animation");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    this.state = "init";
    this[ANIMATION] = new Set();
    this[START_TIME] = new Map();
  }

  start() {

    if(this.state !== "init")return;
    this.state = "started"

    let startTime = Date.now();

    this[PAUSE_TIME] = 0;

    this[TICK] = () => {
      let now = Date.now();

      for (const animation of this[ANIMATION]) {
        let t;
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime - this[PAUSE_TIME] - animation.delay;
        } else {
          t =
            now -
            this[START_TIME].get(animation) -
            this[PAUSE_TIME] -
            animation.delay;
        }

        //终止条件
        if (animation.duration < t) {
          this[ANIMATION].delete(animation);
          t = animation.duration;
        }
        if (t > 0) animation.receiveTime(t);
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    };

    this[TICK]();
  }

  //暂停
  pause() {
    if(this.state !== "started")return;
    this.state = "paused"
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }

  //恢复
  resume() {
    if(this.state !== "paused")return;
    this.state = "started"
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }

  // set rate(){}
  // get rate(){}

  // 重启
  reset() {
    this.pause();

    this.state = "inited";

    let startTime = Date.now();

    this[PAUSE_TIME] = 0;
    this[ANIMATION] = new Set();
    this[START_TIME] = new Map();
    this[PAUSE_START] = 0;
    this[TICK_HANDLER] = null;
  }

  add(animation, startTime) {
    if (startTime === undefined) {
      startTime = Date.now();
    }
    this[ANIMATION].add(animation);
    this[START_TIME].set(animation, startTime);
  }
}

//属性动画 起始值---->终止值 时长 时间函数
export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timingFunction,
    template
  ) {
    timingFunction = timingFunction || ((v) => v);
    template = template || ((v) => v);

    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction;
    this.template = template;
  }

  receiveTime(time) {
    let range = this.endValue - this.startValue;

    // console.log(time);
    // this.object[this.property] =
    //   this.startValue + (range * time) / this.duration;

    let progress = this.timingFunction(time / this.duration);

    this.object[this.property] = this.template(
      this.startValue + range * progress
    );
  }
}
