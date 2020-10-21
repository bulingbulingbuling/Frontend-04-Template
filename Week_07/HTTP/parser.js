//引入css包
const css = require("css");

//在html里不管tag多复杂 只当作一个token处理
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let regexp = /^[\t\n\f ]$/;
// 状态机里所有的状态创建完token之后要在同一个出口输出
// 节点结构 初始document
let stack = [{ type: "document", children: [] }];

//css rules 存储解析后的css规则
let rules = [];

// 计算specificity
// function specificity(selector) {
//   var p = [0, 0, 0, 0];
//   var selectorParts = selector.split(" ");
//   for (const part of selectorParts) {
//     if (part.charAt(0) === "#") {
//       p[1] += 1;
//     } else if (part.charAt(0) === ".") {
//       p[2] += 1;
//     } else {
//       p[3] += 1;
//     }
//   }
//   return p;
// }

function specificity(selector) {
  var p = [0, 0, 0, 0];
  var selectorParts = selector.split(" "),
    regexp = /([a-z]+)?(\.{1}[a-z]+)?(\#{1}[a-z]+)?/;
  for (const part of selectorParts) {
    //有"#"却不在第一位
    if (part.indexOf(".") > 0 || part.indexOf("#") > 0) {
      let arry = part.match(regexp);
      for (let index = 1; index < arry.length; index++) {
        if (arry[index] !== undefined) {
          if (arry[index].charAt(0) === "#") {
            p[1] += 1;
          } else if (arry[index].charAt(0) === ".") {
            p[2] += 1;
          } else {
            p[3] += 1;
          }
        }
      }
    } else if (part.charAt(0) === "#") {
      p[1] += 1;
    } else if (part.charAt(0) === ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}

//比较specificity
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  } else if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  } else if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  return sp1[3] - sp2[3];
}

//content 构建AST 活得selector和declarator
function addCssRules(content) {
  var ast = css.parse(content);
  rules.push(...ast.stylesheet.rules);
}
//选择器元素匹配 selector 为简单选择器
function match(element, selector) {
  //selector是否为空 判断是否是文本节点
  if (!selector || !element.attributes) {
    return false;
  }
  //id
  if (selector.charAt(0) === "#") {
    var attr = element.attributes.filter((attr) => attr.name === "id")[0];
    if (attr && attr.value === selector.replace("#", "")) {
      return true;
    }
    //class
  } else if (selector.charAt(0) === ".") {
    var attr = element.attributes.filter((attr) => attr.name === "class")[0];
    if (attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else {
    //tagName
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}

//匹配css到元素节点上
function computeCss(element) {
  //获取父元素序列 stack会不断变化 为避免污染 用slice不传参数会复制数组的特性复制栈
  //获取当前元素的css规则
  var elements = stack.slice().reverse();

  if (!element.computedStyle) {
    element.computedStyle = {};
  }

  for (let rule of rules) {
    //css AST树的 选择器部分 只判断父子系的选择器
    var selectorParts = rule.selectors[0].split(" ").reverse();

    //selectorParts[0]就是当前选择器 做一个当前选择器的匹配
    if (!match(element, selectorParts[0])) continue;

    //、双循环选择器和元素的父元素来去找他们是否能匹配

    let matched = false;

    //表示选择器的当前位置 i表示当前元素位置 当前元素和选择器元素匹配的话 j前进一步
    var j = 1;
    for (let i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length) {
      matched = true;
    }
    if (matched) {
      //如果匹配到 加入样式规则 计算computed属性
      // console.log("Element", element, "match rule", rule);
      if (matched) {
        var sp = specificity(rule.selectors[0]);
        var computedStyle = element.computedStyle;
        //cssAST 里 rule的规则
        for (var declaration of rule.declarations) {
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
          }
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          } else if (
            compare(computedStyle[declaration.property].specificity, sp) < 0
          ) {
            //如果sp优先级高于之前的 重新赋值
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp;
          }
          computedStyle[declaration.property].value = declaration.value;
        }
        console.log(element.ComputedStyle);
      }
    }
  }

  // console.log(rules);
  console.log("compute css for element", element);
}

// 接受状态机产生的所有token
//{type: 'startTag', tagName: 'html', maaa: 'a'}
//{type: 'startTag', tagName: 'head'}
function emit(token) {
  // console.log(token);

  //取出栈顶 //document
  let top = stack[stack.length - 1];

  //如果token 是节点元素push进stack
  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    //遍历token 添加节点属性
    for (let p in token) {
      if (p !== "type" && p !== "tagName") {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    // 匹配css rule
    computeCss(element);
    // 将元素推入栈顶children属性 设置元素父属性为栈顶
    top.children.push(element);
    element.parent = top;

    //判断token不是自封闭的话  将更新好栈顶推入stack
    //自封闭标签不入栈
    if (!token.isSelfClosing) {
      stack.push(element);
    }

    //清空文本节点
    currentTextNode = null;
  } else if (token.type == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match! ");
    } else {
      //将style标签文本节点拿出来 将它的内容作为css的内容添加到规则上去
      if (top.tagName == "style") {
        // top就是css标签 children[0]就是文本节点
        addCssRules(top.children[0].content);
      }

      // 出栈
      stack.pop();
    }
    //清空文本节点
    currentTextNode = null;
  } else if (token.type === "text") {
    //文本节点
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: "",
      };
      top.children.push(currentTextNode);
    }
    //相邻文本节点合并 遇到开始结束标签清空
    currentTextNode.content += token.content;
  }
}
const EOF = Symbol("EOF"); //end of file

//状态机分析字符串
function data(c) {
  //解析标签 标签开始状态
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit({ type: "EOF" });
    return;
  } else {
    // 文本节点
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}
function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    // tag名称
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else {
    return;
  }
}
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c === ">") {
  } else if (c === EOF) {
  } else {
  }
}
//收到构成标签名称的字符
function tagName(c) {
  // 空白符结束 tagName
  if (c.match(regexp)) {
    return beforeAttributeName;
    //自封闭标签
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    //tagName
    currentToken.tagName += c;
    return tagName;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}
//属性处理 maaa=a
function beforeAttributeName(c) {
  if (c.match(regexp)) {
    return beforeAttributeName;
  } else if (c === ">" || c === "/" || c == EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeName;
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}
//属性名 disabled />
function attributeName(c) {
  if (c.match(regexp) || c === "/" || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === '"' || c === "'" || c === "<") {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}
//属性值 maaa=a class="" name='' disabled
function beforeAttributeValue(c) {
  if (c.match(regexp)) {
    return beforeAttributeValue;
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else if (c == '"') {
    return doubleQuoteAttributeValue;
  } else if (c === "'") {
    return singleQuoteAttributeValue;
  } else {
    return unquoteAttributeValue(c);
  }
}
// 双引号属性值 class="aaa"
function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}

function singleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return singleQuoteAttributeValue;
  }
}
function unquoteAttributeValue(c) {
  if (c.match(regexp)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<" || c === "=") {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return unquoteAttributeValue;
  }
}
function afterQuoteAttributeValue(c) {
  if (c.match(regexp)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}
function afterAttributeName(c) {
  if (c.match(regexp)) {
    return afterAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}
function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === "EOF") {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  // 初始状态
  let state = data;
  for (let c of html) {
    state = state(c);
  }

  state = state(EOF);
  //只剩一个document
  // console.log(stack[0]);
  return stack[0];
};
