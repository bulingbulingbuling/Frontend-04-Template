import { Component, createElement } from "./framework.js";
import { Carousel } from "./carousel.js";
import { Timeline, Animation } from "./animation.js";

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

let tl = new Timeline();
window.tl = tl;
// tl.add(new Animation({set a(v){console.log(v)}},"a",0,100,1000,null));

window.animation = new Animation({set a(v){console.log(v)}},"a",0,100,1000,null);
          

tl.start();

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
