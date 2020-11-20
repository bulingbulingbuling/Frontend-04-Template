import { Component, createElement } from "./framework.js";

class Carousel extends Component {
  constructor() {
    //子类没有自己的 this 对象 而是继承父类的 this 对象 然后对其进行加工
    //Super 代表父类的构造函数 其内部的this指向调用它的子类
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (const record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url("${record}")`;
      // child.style.display = `none`;
      this.root.appendChild(child);
    }

    //自动播放功能
    // let currentIndex = 0;
    // setInterval(() => {
    //   let children = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;

    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = `none`;
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

    //   setTimeout(() => {
    //     next.style.transition = ``;
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`;

    //     currentIndex = nextIndex;
    //   }, 16);
    // }, 3000);

    //鼠标拖动功能
    let position = 0;
    this.root.addEventListener("mousedown", (event) => {
      //相对于 整个浏览器中间的可渲染区域的坐标 不受任何因素影响 (包括滚动)
      let startX = event.clientX,
        children = this.root.children;

      let move = (event) => {
        //移动的距离
        let x = event.clientX - startX;

        //当前屏幕上的元素
        let current = position - (x - x % 358) / 358;
        // let current = position - Math.round(x / 358);

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;

          children[pos].style.transition = `none`;
          children[pos].style.transform = `translateX(${ - pos * 358 + offset * 358 + x % 358}px)`;
        }
      };

      let up = (event) => {
        let x = event.clientX - startX;
        position = position - Math.round(x / 358);

        for (let offset of [0,
          - Math.sign(Math.round(x / 358) - x + 179 * Math.sign(x))]) {

          let pos = position + offset;
          pos = (pos + children.length) % children.length;

          children[pos].style.transition = ``;
          children[pos].style.transform = `translateX(${
            - pos * 358 + offset * 358
          }px)`;
        }

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);

      document.addEventListener("mouseup", up);
    });
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

// let a = (
//   <div id="a">
//     <span>a</span>
//     <span>b</span>
//     <span>c</span>
//   </div>
// );

let d = [
  "https://hbimg.huabanimg.com/6eb9a19e7afbf1029d78a1962255e2bd6ae59f6d26a3a-eWMp7O_fw658/format/webp",
  "https://hbimg.huabanimg.com/97e7e0905ae08badece4e5eb64cfbbffbd665e7620a95-08iyyi_fw658/format/webp",
  "https://hbimg.huabanimg.com/acb817ab19ff06afefd4a71230370b593cbc0422220ea-LJsafy_fw658/format/webp",
  "https://hbimg.huabanimg.com/20f1e72158424990da68588d39cb0179fbffc1ee24eb6-2ZMiKw_fw658/format/webp",
];

let a = <Carousel src={d} />;

// document.body.appendChild(a);

a.mountTo(document.body);

/* 子元素 
  type string， 
  attributes key-value, 
  childrenNode Array 由 递归生成的子元素 element 构成
var a = createElement(
  "div", 
  {id: "a"}, 
  createElement("span", null), 
  createElement("span", null), 
  createElement("span", null)
);
*/

/* 文本节点
type string
attributes key-value,
textNode Array string 构成文本节点内容
var a = createElement(
  "div", 
  {id: "a"}, 
  "Hello World"
);
*/

/* 有文本的子节点
var a = createElement(
  "div", 
  {id: "a"}, 
  createElement("span", null, "a"), 
  createElement("span", null, "b"), 
  createElement("span", null, "c"));
*/
