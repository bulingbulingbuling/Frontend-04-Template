//派发事件 new Event()
export class Dispatcher {
  constructor(element) {
    this.element = element;
  }
  dispatch(type, properties) {
    let event = new Event(type);
    console.log(event);
    for (let name in properties) {
      event[name] = properties[name];
    }
    this.element.dispatchEvent(event);
  }
}

// listen  recognize dispatch
//new Listener(new Recognize(dispatch))

export class Listener {
  constructor(element, recognize) {
    let isListeningMouse = false;
    let contexts = new Map();
    //鼠标事件
    document.addEventListener("mousedown", (event) => {
      //事件的键值 左键拖拽  event.button 0 左键 1 中建 2右键
      let context = Object.create(null);
      contexts.set(`mouse${1 << event.button}`, context);
      // event.button;
      recognize.start(event, context);

      let mousemove = (event) => {
        let button = 1;
        // event.buttons 0b0011 表示二进制 按住哪个键;
        while (button <= event.buttons) {
          if (button & event.buttons) {
            //调整button的顺序 使其与mousedown时button对应的键一样
            let key;

            if (button === 2) {
              key = 4;
            } else if (button === 4) {
              key = 2;
            } else {
              key = button;
            }
            let context = contexts.get(`mouse${key}`);
            recognize.move(event, context);
          }
          button = button << 1;
        }
      };
      let mouseup = (event) => {
        console.log("mouseup", event.button);
        let context = contexts.get(`mouse${1 << event.button}`);
        recognize.end(event, context);
        contexts.delete(`mouse${1 << event.button}`);
        if (event.buttons === 0) {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);
          isListeningMouse = false;
        }
      };
      if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
      }
    });

    // touch伴随触发move move和start一定是同一个元素
    element.addEventListener("touchstart", (event) => {
      //  多点触摸还是单指事件 数组 有几个指就有几个元素
      console.log(event.changedTouches);
      for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        recognize.start(touch, context);
      }
    });
    element.addEventListener("touchmove", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognize.move(touch, context);
      }
    });
    element.addEventListener("touchend", (event) => {
      for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        recognize.end(touch, context);
        contexts.delete(touch.identifier);
      }
    });
    // touch事件被其他事件打断出发touchcancel
    element.addEventListener("touchcancel", (event) => {
      for (let touch of event.changedTouches) {
        recognize.cancel(touch);
      }
    });
  }
}

export class Recognize {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  //对应模块的状态
  // let isPan = false;
  // let isTap = true;
  // let isPress = false;
  //每个点的逻辑处理
  // let handler;
  // let startX, startY;
  start(point, context) {
    (context.startX = point.clientX), (context.startY = point.clientY);

    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ];

    context.isPan = false;
    context.isTap = true;
    context.isPress = false;

    // console.log("start", point.clientX, point.clientY);

    // 判断长按事件
    context.handler = setTimeout(() => {
      context.isPress = true;
      context.isPan = false;
      context.isTap = false;
      context.isVertical =
        //避免多次clear
        context.handler = null;
      console.log("press");
      this.dispatcher.dispatch("press", {});
    }, 500);
  }

  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isPan = true;
      context.isTap = false;
      context.isPress = false;
      context.isVertical = Math.abs(dx) < Math.abs(dy);
      console.log("pan start");
      this.dispatcher.dispatch("panstart", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
      clearTimeout(context.handler);
    }
    if (context.isPan) {
      console.log(dx, dy);
      console.log("pan");
      this.dispatcher.dispatch("pan", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      });
    }

    //flick 多点之间速度的平均值
    // 只存半秒内的
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    );
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    });
    // console.log("move", point.clientX, point.clientY);

    //判断是否移动10px
  }

  end(point, context) {
    //tap
    if (context.isTap) {
      //事件
      this.dispatcher.dispatch("tap", {});
      clearTimeout(context.handler);
      console.log("tap");
    }

    if (context.isPress) {
      this.dispatcher.dispatch("pressend", {});
      console.log("press end");
    }
    //计算速度
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    );
    let v, d;
    if (!context.points.length) {
      v = 0;
    } else {
      //点之间的距离
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      );
      //速度
      v = d / (Date.now() - context.points[0].t);
    }
    if (v > 1.5) {
      console.log("flick", v);
      this.dispatcher.dispatch("flick", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      });
      context.isFlick = true;
    } else {
      context.isFlick = false;
    }
    //move结束
    if (context.isPan) {
      this.dispatcher.dispatch("panend", {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      });
      console.log("pan end");
    }
  }

  cancel(point, context) {
    clearTimeout(context.handler);
    console.log("cancel", point.clientX, point.clientY);
    this.dispatcher.dispatch("cancel", {});
  }
}
export function enableGesture(element) {
  //new Listener(new Recognize(dispatch))
  new Listener(element, new Recognize(new Dispatcher(element)));
}
