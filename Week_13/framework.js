export function createElement(type, attributes, ...children) {
  //创建元素
  let element;
  //原生元素
  if (typeof type === "string") {
    element = new ElementWrapper(type);
  } else {
    //自定义元素
    element = new type();
  }
  //添加属性
  for (const key in attributes) {
    console.log(attributes)
    element.setAttribute(key, attributes[key]);
  }
  //添加子元素
  for (const child of children) {
    if (typeof child === "string") {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

export class Component {
  constructor() {
    // this.root = this.render();
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    // this.root.appendChild(child);
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper extends Component {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    this.root = document.createElement(type);
  }
}
