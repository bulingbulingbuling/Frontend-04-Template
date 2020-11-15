# HTML 语义

## 语义标签使用场景

- 作为自然语言的延伸 作为自然语言和纯文本的补充，用来**表达一定的结构**（例如类似 RUBY 的功能实现 ruby rt rp 标签）或**消除歧义** 例如**em**强调标签

- 做为文章结构 例如**标题**标签 **section**标签（改变 h1-h6 的语义。section 的嵌套会使得其中的 h1-h6 下降一级）

```html
<hgroup>
  <h1>JavaScript对象</h1>
  <h2>我们需要模拟类吗？</h2>
</hgroup>
<abbs>缩写</abbs>
<dfn>定义</dfn>
<pre<><code>代码</code></pre>
<samp>demo</samp>
```
  
- 作为整体结构的语义化标签

  应用了语义化结构的页面，可以明确地提示出页面信息的主次关系，它能让浏览器很好地支持“阅读视图功能”，还可以让搜索引擎的命中率提升，同时，它也对视障用户的读屏软件更友好

## 元信息标签 head 里能写哪些标签

元信息标签 元信息类标签。所谓元信息，是指描述自身的信息，元信息类标签，就是 HTML 用于描述文档自身的一类标签，它们通常出现在 head 标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，描述的是业务

- **head**容器标签

```html
<head></head>
```

- **title**文档的标题 可能会被用在浏览器收藏夹、微信推送卡片、微博等各种场景，这时侯往往是上下文缺失的，所以 title 应该是完整地概括整个网页内容的。

```html
<title></title>
```

- **base**给页面上所有的 URL 相对地址提供一个基础。

```html
<base title=""></base>
```

- **meta** meta 标签是一组键值对，它是一种通用的元信息表示标签。可出现多个 meta 标签 一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

具有 http-equiv 属性的 meta 具有 http-equiv 属性的 meta 标签，表示执行一个命令，这样的 meta 标签可以不需要 name 属性了。

name 为 viewport 的 meta 自定义标签 例如移动端开发的事实标准 这类 meta 的 name 属性为 viewport，它的 content 是一个复杂结构，是用逗号分隔的键值对，键值对的格式是 key=value

```html
<meta name="viewport" content="width=500, initial-scale=1" />
```

viewport 可以控制的属性：

- width 页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。

- height 页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。

- initial-scale：初始缩放比例。

- minimum-scale：最小缩放比例

- maximum-scale：最大缩放比例

- user-scalable：是否允许用户缩放

## 链接标签 a area link

链接是 HTML 中的一种机制，它是 HTML 文档和其它文档或者资源的连接关系，在 HTML 中，链接有两种类型。一种是**超链接型标签**，一种是**外部资源链接**。

链接标签包含 **a** **area** **link**

### link

link 标签 元信息标签的一种 可能不会体现在页面效果上 link 标签可能生成超链接 也可能生成外部资源链接（唯一）

link 标签能够被搜索引擎和一些浏览器插件识别，从而产生关键性作用。

link 标签会把外部的资源链接到文档中，也就是说，会实际下载这些资源，并且做出一些处理，比如我们常见的用 link 标签引入样式表。

外部资源型的 link 标签能够被放在 body 中使用，从而起到把外部资源链接进文档的作用。

link 标签的链接类型主要通过 rel 属性来区分

```html
<link rel="xxx" />
```

- **超链接型 link 标签** 被动型链接 用户不操作 不会被主动下载 具有 rel=“canonical” 的 link 具有 rel="alternate"的 link 具有 rel=“prev” rel="next"的 link

  - “canonical” link 标签 提示页面它的主 URL 在网站中常常有多个 URL 指向同一页面的情况，搜索引擎访问这类页面时会去掉重复的页面，这个 link 会提示搜索引擎保留哪一个 URL。

```html
<link rel="canonical" href="http://XXX" />
```

- “alternate” link 标签 这个标签提示页面它的变形形式，这个所谓的变形可能是当前页面内容的不同格式、不同语言或者为不同的设备设计的版本，这种 link 通常也是提供给搜索引擎来使用的。

```html
页面提供 rss 订阅时
<link rel="alternate" type="application/rss+xml" title="RSS" href="..." />
```

- **外部资源类 link 标签**

  icon icon 型 link 是唯一一个外部资源类的元信息 link 标题左边小图标 所以从性能的角度考虑，建议一定要保证页面中有 icon 型的 link icon 型 link 有有效的 sizes 属性 指定 icon 尺寸

  预处理

  dns-prefetch 型 link 提前对一个域名做 dns 查询，这样的 link 里面的 href 实际上只有域名有意义。

  preconnect 型 link 提前对一个服务器建立 tcp 连接。

  prefetch 型 link 提前取 href 指定的 url 的内容。

  preload 型 link 提前加载 href 指定的 url。

  prerender 型 link 提前渲染 href 指定的 url。

  modulepreload 型的 link 预先加载（完成下载并放入内存，并不会执行对应的 JavaScript）一个 JavaScript 的模块。这可以保证 JS 模块不必等到执行时才加载。

  ```html
  <link rel="modulepreload" href="app.js">
  <link rel="modulepreload" href="helpers.js">
  <link rel="modulepreload" href="irc.js">
  <link rel="modulepreload" href="fog-machine.js">
  <script type="module" src="app.js">
  ```

  尽管，单独使用 script 标签引用 app.js 也可以正常工作，但是我们通过加入对四个 JS 文件的 link 标签，使得四个 JS 文件有机会被并行地下载，这样提高了性能。

  stylesheet 型 link CSS

  pingback 型 link

### a

anchor 标签的意思是标识文档中的特定位置。

a 标签其实同时充当了链接和目标点的角色，当 a 标签有 href 属性时，它是链接，当它有 name 时，它是链接的目标。

rel 的值 **alternate**｜**author**｜**help**｜**license**｜**next**｜**prev**｜**search**

a 标签独有的 rel 类型：**tag** 表示本网页所属的标签｜ **bookmark** 到上级章节的链接

### area

图片的某个区域产生超链接——area 标签。 区域型的链接 area 必须跟 img 和 map 标签配合使用

```html
<p>
  Please select a shape:
  <img
    src="shapes.png"
    usemap="#shapes"
    alt="Four shapes are available: a red hollow box, a green circle, a blue triangle, and a yellow four-pointed star."
  />
  <map name="shapes">
    <area shape="rect" coords="50,50,100,100" />
    <!-- the hole in the red box -->
    <area shape="rect" coords="25,25,125,125" href="red.html" alt="Red box." />
    <area
      shape="circle"
      coords="200,75,50"
      href="green.html"
      alt="Green circle."
    />
    <area
      shape="poly"
      coords="325,25,262,125,388,125"
      href="blue.html"
      alt="Blue triangle."
    />
    <area
      shape="poly"
      coords="450,25,435,60,400,75,435,90,450,125,465,90,500,75,465,60"
      href="yellow.html"
      alt="Yellow star."
    />
  </map>
</p>
```

## 替换型标签

替换型元素是把文件的内容引入，替换掉自身位置的一类标签。 **script** **iframe** **img** **picture** **audio** **video** 但是 style 标签并非替换型元素，不能使用 src 属性，这样，我们用 link 标签引入 CSS 文件，当然就是用 href 标签啦。

凡是替换型元素，都是使用 src 属性来引用文件

### img

img 标签的作用是引入一张图片。它必须有 src 属性才有意义 如果一定不想要引入独立文件，可以使用 data uri 作为图片的 src，这样，并没有产生独立的文件，客观上做到了和内联相同的结果

```html
<img
  src='data:image/svg+xml;charset=utf-8 <svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'
/>
```

img 属性 srcset 和 sizes 在不同的屏幕大小和特性下，使用不同的图片源。

```html
<img
  srcset="
    elva-fairy-320w.jpg 320w,
    elva-fairy-480w.jpg 480w,
    elva-fairy-800w.jpg 800w
  "
  sizes="(max-width: 320px) 280px,(max-width: 480px) 440px,800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

### picture

picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源

```html
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)" />
  <img src="image-narrow.png" />
</picture>
```

### video

video 使用的 source 标签除了支持 media 之外，还可以使用 type 来区分源文件的使用场景。

```html
<video controls="controls">
  <source src="movie.webm" type="video/webm" />
  <source src="movie.ogg" type="video/ogg" />
  <source src="movie.mp4" type="video/mp4" />
  You browser does not support video.
</video>
```

video 中还支持一种标签：track ？**找一个例子**

track 是一种播放时序相关的标签，它最常见的用途就是字幕。track 标签中，必须使用 srclang 来指定语言，此外，track 具有 kind 属性，共有五种

subtitles：就是字幕了，不一定是翻译，也可能是补充性说明。

captions：报幕内容，可能包含演职员表等元信息，适合听障人士或者没有打开声音的人了解音频内容。

descriptions：视频描述信息，适合视障人士或者没有视频播放功能的终端打开视频时了解视频内容。

chapters：用于浏览器视频内容。

metadata：给代码提供的元信息，对普通用户不可见。

### audio

source+type

### iframe

古老的 iframe 存在严重的**安全问题和跨域问题**不推荐使用 新的 iframe 加入了 sandbox 模式和 srcdoc 属性可以使用

```html
<iframe sandbox
        srcdoc="<p>Yeah, you can see it <a href="/gallery?mode=cover&amp;amp;page=1">in my gallery</a>.">
</iframe>
```

使用 srcdoc 属性创建了一个新的文档，嵌入在 iframe 中展示，并且使用了 sandbox 来隔离 不会有安全问题和跨域问题

#### **在多数现代浏览器兼容的范围内，src 属性支持哪些协议的 uri（如 http 和我们提到的 data）》**

## 代码分析 HTML 标准

```javascript
Array.prototype.map.call(
  document.querySelectorAll(".element"),
  (e) => e.innerText
);
var elementDefinations = Array.prototype.map.call(
  document.querySelectorAll(".element"),
  (e) => ({
    text: e.innerText,
    name: e.childNodes[0].childNodes[0].id.match(/the\-([\s\S]+)\-element:/)
      ? RegExp.$1
      : null,
  })
);

// for (let defination of elementDefinations) {
//   console.log(defination.name + ":");
//   let categories = defination.text
//     .match(
//       /Categories:\n([\s\S]+)\nContexts in which this element can be used:/
//     )[1]
//     .split("\n");
//   for (let category of categories) {
//     console.log(category);
//   }
// }

for(let defination of elementDefinations) {
  //console.log(defination.name + ":")
  let categories = defination.text.match(/Categories:\n([\s\S]+)\nContexts in which this element can be used:/)[1].split("\n");
  defination.categories = [];
  for(let category of categories) {
    if(category.match(/^([^ ]+) content./))
      defination.categories.push(RegExp.$1);
    else
      console.log(category)  
  }
/*
  let contentModel = defination.text.match(/Content model:\n([\s\S]+)\nTag omission in text\/html:/)[1].split("\n");
  for(let line of contentModel)
    console.log(line);
*/
}
```

现在有 107 个元素 [编写代码有注意理解标签知识点](https://time.geekbang.org/column/article/89832?gk_cus_user_wechat=university)

凡是**标准中描述不是特别的工整的地方都是我们要注意理解的内容**

## DTD是什么？

html 语法 标签 文本 注释 DTD 处理信息

### 标签

  标签对应元素 属性语法（单引号、双引号或者完全不用引号）属性中可以使用文本实体（后文会介绍）来做转义，属性中，一定需要转义的有下面几种：
  
  \* 无引号属性：\<tab\> \<LF\> \<FF\> \<SPACE\> &五种字符

  \* 单引号属性：' &两种字符。

  \* 双引号属性：" &两种字符。

### 文本

  普通的文本节点

  CDATA 文本节点

### 注释语法

### DTD 语法

  Document Type Defination 也就是文档类型定义 分别是***严格模式**、**过渡模式和** **frameset 模式**。

### ProcessingInstruction 语法

## ARIA
  
  (Accessible Rich Internet Applications) 它表现为一组属性，是用于可访问性的一份标准。以交互形式来标注各种元素的一类属性。ARIA 的角色对于我们 UI 系统的设计有重要的参考意义。

  ARIA 属性

  ARIA 给 HTML 元素添加的一个核心属性就是 role

  ```html
  <span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="chk1-label">
  </span> <label id="chk1-label">Remember my preferences</label>
  ```
  
  这里我们给一个 span 添加了 checkbox **角色**，这样，表示我们这个 span 被用于 checkbox，这意味着，我们可能已经用 JS 代码绑定了这个 span 的 click 事件，并且以 checkbox 的交互方式来处理用户操作。

  ARIA 系统还提供了一系列 ARIA 属性给 checkbox 这个 role，这意味着，**我们可以通过 HTML 属性变化来理解这个 JavaScript 组件的状态**，读屏软件等三方客户端，就可以理解我们的 UI 变化，这正是 ARIA 标准的意义。

  roletype---widget 可交互组件 
          ---structure 文档中的结构
          ---window  窗体
  
  Widget 角色
  脑图有结构
  [WAI-ARIA 标准](https://www.w3.org/TR/wai-aria/)可以找到所有的角色和对应的属性 很多 ARIA 属性都是需要在 JavaScript 中维护的。 我们要实现一份组件库，这些 widget role 和它们对应的 aria 属性是非常好的参考 在实现组件时把对应的 ARIA 属性自动维护好

  structure 角色

  window 角色

  请找一个支持图结构可视化的 JS 库，把所有 ARIA 的继承关系用可视化的方式展现出来。**？**

## DOM API

  重点掌握的是：Document、Element、Text 节点

### Node

  Node 是 DOM 树继承关系的根节点，它定义了 DOM 节点在 DOM 树上的操作，首先，Node 提供了一组属性，来表示它在 DOM 树中的关系，它们是 node系列：**parentNode** **childNodes** **firstChild** **lastChild** **nextSibling** **previousSibling** Element系列：**parentElement** **children** **firstElementChild** **lastElementChild** **nextElementSibling** **previousSibling**

  Node 中也提供了操作 DOM 树的 API，主要有下面几种 **appendChild** **insertBefore** **removeChild** **replaceChild**

  其他高级 API：
  
  1.**compareDocumentPosition** 是一个用于比较两个节点中关系的函数 前后

  2.**contains** 检查一个节点是否包含另一个节点的函数

  3.**isEqualNode** 检查两个节点是否完全相同 dom树结构相同

  4.**isSameNode** 检查两个节点是否是同一个节点 也可以用 **===**

  5.**cloneNode** 复制节点 如果传入参数 true，则会连同子元素做深拷贝

  DOM 标准规定了节点必须从文档的 create 方法创建出来，不能够使用原生的 JavaScript 的 new 运算。：**createElement** **createTextNode** **createCDATASection** **createComment** **createProcessingInstruction** **createDocumentFragment** **createDocumentType**

  元素对应了 HTML 中的标签，它既有子节点，又有属性。所以 Element 子类中，有一系列操作属性的方法。**getAttribute** **setAttribute** **removeAttribute**  **hasAttribute** 还可以把 Attribute 当作节点: **getAttributeNode** **setAttributeNode** 还可以使用 attributes 对象 document.body.attributes.class = “a” 等效于 document.body.setAttribute(“class”, “a”)

  查找元素： **querySelector** **querySelectorAll** 高性能(返回得是能够动态更新的集合 尽量使用这一组api)：**getElementById** **getElementsByName** **getElementsByTagName** **getElementsByClassName**

### 遍历
  
  DOM API 中提供了 **NodeIterator** 和 **TreeWalker** 来遍历树 NodeIterator 和 TreeWalker 提供了过滤功能，可以把属性节点也包含在遍历之内。

  NodeIterator 的基本用法

  ```javascript
  var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
  var node;
  while(node = iterator.nextNode())
  {
      console.log(node);
  }
  ```

  TreeWalker 的基本用法

  ```javascript
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
  var node;
  while(node = walker.nextNode())
  {
      if(node.tagName === "p")
          node.nextSibling();
      console.log(node); 
  }
  ```

### Range

  Range API 表示一个 HTML 上的范围，这个范围是以文字为最小单位的 所以 Range 不一定包含完整的节点，它可能是 Text 节点中的一段，也可以是头尾两个 Text 的一部分加上中间的元素。 通过 Range API 可以比节点 API 更精确地操作 DOM 树，凡是 节点 API 能做到的，Range API 都可以做到，而且可以做到更高性能 做底层框架和富文本编辑对它有强需求

  每一个range包含的节点都是连续的 也可以包含半个节点

  创建 Range 一般是通过设置它的起止 由一个 **element** 和一个 **偏移值** 决定的 对于element 偏移值是children textnode 偏移值是文字个数

  ```javascript
  var range = new Range(),
      firstText = p.childNodes[1],
      secondText = em.firstChild
  range.setStart(firstText, 9) // do not forget the leading space
  range.setEnd(secondText, 4)
  ```

  通过 Range 可以从用户选中区域创建，这样的 Range 用于处理用户选中区域:

  ```javascript
  var fragment = range.extractContents()//range 里的内容取出来  返回的是Node的子类 fragment
  range.insertNode(document.createTextNode("aaaa"))//range 位置插入node
  ```

  更改 Range 选中区段内容的方式主要是取出和插入，分别由 **extractContents** 和 **insertNode** 来实现。 extract:提取的意思

  ```javascript
  var fragment = range.extractContents()
  range.insertNode(document.createTextNode("aaaa"))
  ```

  完整使用：

  ```javascript
  var range = new Range(),
      firstText = p.childNodes[1],
      secondText = em.firstChild
  range.setStart(firstText, 9) // do not forget the leading space
  range.setEnd(secondText, 4)

  var fragment = range.extractContents()
  range.insertNode(document.createTextNode("aaaa"))
  ```

  请你用 DOM API 来实现遍历整个 DOM 树，把所有的元素的 tagName 打印出来。**?**

## CSSOM API 
  
  CSSOM 是 CSS 的对象模型包含；

  *描述样式表和规则等 CSS 的模型部分（CSSOM）

  *跟元素视图相关的 View 部分（CSSOM View）

  HTML 和 CSS 分别承担了语义和表现的分工，**DOM** 和 **CSSOM** 也有语义和表现的分工 **DOM 中的所有的属性都是用来表现语义的属性**，**CSSOM 的则都是表现的属性**

### CSSOM

  获取文档中所有的样式表：只读

  ```javascript
  document.styleSheets
  ```

  修改样式表中的内容:

  ```javascript
  document.styleSheets[0].insertRule("p { color:pink; }", 0)//田间
  document.styleSheets[0].removeRule(0)//删除
  ```

  获取样式表中特定的规则（Rule），并且对它进行一定的操作 使用它的 cssRules 属性来实现

  ```javascript
  document.styleSheets[0].cssRules
  ```

  取到的规则列表 同样是支持 item、length 和下标运算 cssRules 属性可能是 CSS 的 at-rule，也可能是普通的样式规则。不同的 rule 类型，具有不同的属性。多数 at-rule 都对应着一个 rule 类型：**CSSStyleRule** **CSSCharsetRule** **CSSImportRule** **CSSMediaRule** **CSSFontFaceRule** **CSSPageRule** **CSSNamespaceRule** **CSSKeyframesRule** **CSSKeyframeRule** **CSSSupportsRule**

  CSSStyleRule **selectorText**字符串  **style**样式表 表示一个规则的选择器部分和样式部分。

  CSSOM 还提供了一个**非常重要**的方法，来**获取一个元素最终经过 CSS 计算得到的属性**：

  ```javascript
  window.getComputedStyle(elt, pseudoElt);
  \/\/第一个参数就是我们要获取属性的元素，第二个参数是可选的，用于选择伪元素
  ```

### CSSOM View

  分成三个部分：窗口部分，滚动部分和布局部分

#### 窗口 API

  窗口 API 用于操作浏览器窗口的位置、尺寸 **moveTo(x, y)** **moveBy(x, y)** **resizeTo(x, y)** **resizeBy(x, y)**

  ```javascript
  \/\/ window.open() 的第三个参数
  window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
  ```

#### 滚动 API

浏览器**可视区域的滚动**和**内部元素的滚动** 必须分开看待，两者的性能和行为都有区别。

+ 视口滚动 API

  可视区域（视口）滚动行为由 window 对象上的一组 API 控制 **scrollX** pageXOffset **scrollY** pageYOffset **scroll(x, y)** scrollTo支持传入配置型参数 {top, left} **scrollBy(x, y)**
  
  视口滚动 API 是页面的顶层容器的滚动

* 元素滚动 API **scrollTop** 元素的属性，表示 Y 方向上的当前滚动距离 **scrollLeft** **scrollWidth** 元素内部的滚动内容的宽度，一般来说会大于等于元素宽度 **scrollHeight** **scroll(x, y)** **scrollBy(x, y)** **scrollIntoView(arg)**滚动元素所在的父元素，使得元素滚动到可见区域，可以通过 arg 来指定滚到中间、开始或者就近。

#### 布局 API

  + 全局 API

  window 对象上提供了一些全局的尺寸信息 **window.innerHeight**, **window.innerWidth**,**window.devicePixelRatio**
  
  + 元素上的 API

  CSSOM View 为 Element 类添加了两个方法 **getClientRects()** 返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸 **getBoundingClientRect()** 元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域

  要获取**相对坐标**，或者**包含滚动区域的坐标** 获取文档跟节点的位置，再相减即可得到它们的坐标

  ```javascript
  var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
  ```

  请找一个网页，用我们今天讲的 API，把页面上的所有盒的轮廓画到一个 canvas 元素上 **?**

## 浏览器事件  

  一般来说，事件来自输入设备，我们平时的个人设备上，输入设备有三种：键盘；鼠标；触摸屏。
  
  pointer

  触摸屏和鼠标又有一定的共性，它们被称作 pointer 设备，所谓 pointer 设备，是指它的输入最终会被抽象成屏幕上面的一个点。
  
  我们现代的 UI 系统，都源自 WIMP 系统。WIMP 即 Window Icon Menu Pointer 四个要素

  WIMP 是如此成功，以至于今天很多的前端工程师会有一个观点，认为我们能够“点击一个按钮”，实际上并非如此，我们只能够点击鼠标上的按钮或者触摸屏，是操作系统和浏览器把这个信息对应到了一个逻辑上的按钮，再使得它的视图对点击事件有反应。这就引出了我们第一个要讲解的机制:**捕获**与**冒泡**

  点击事件来自触摸屏或者鼠标，鼠标点击并没有位置信息，但是一般操作系统会根据位移的累积计算出来，跟触摸屏一样，提供一个坐标给浏览器。那么，把这个坐标转换为具体的元素上事件的过程 **捕获过程**
  
  冒泡过程，则是符合人类理解逻辑的：当你按电视机开关时，你也按到了电视机 **冒泡过程**

  所以我们可以认为，**捕获是计算机处理事件的逻辑，而冒泡是人类处理事件的逻辑。**

  捕获过程跟冒泡过程总是先后发生
  
  我们实际监听事件时，我建议这样**使用冒泡和捕获机制：默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。**

### addEventListener

  事件名称；
  事件处理函数:事件处理函数不一定是函数，也可以是个 JavaScript 具有 handleEvent 方法的对象；
  捕获还是冒泡：不一定是 bool （false 默认冒泡）值，也可以是个**options**对象包含
    once：只执行一次。
    passive：**承诺此事件监听不会调用 preventDefault，这有助于性能。**
    useCapture：是否捕获（否则冒泡）。

  焦点

  键盘事件是由焦点系统控制的，一般来说，操作系统也会提供一套焦点系统，但是现代浏览器一般都选择在自己的系统内覆盖原本的焦点系统。

  焦点系统认为整个 UI 系统中，有且仅有一个“聚焦”的元素，所有的键盘事件的目标元素都是这个聚焦元素。

  浏览器 API 提供了 API 来操作焦点 focus()  blur() 也规定了从外向内传播的捕获过程。

  自定义事件

  除了来自输入设备的事件，还可以自定义事件，实际上事件也是一种非常好的代码架构，但是 DOM API 中的事件并不能用于普通对象，所以很遗憾，我们只能在 DOM 元素上使用自定义事件。使用 Event 构造器来创造了一个新的事件，然后调用 dispatchEvent 来在特定元素上触发。 我们可以给这个 Event 添加自定义属性、方法 示例:

  ```javascript
  var evt = new Event("look", {"bubbles":true, "cancelable":false});
  document.dispatchEvent(evt);
  ```

  请你找出你所知道的所有事件类型，和它们的目标元素类型。**?**

## 浏览器 API

  整理 API

  从 Window 的属性中，找到 API 名称；
  查阅 MDN 或者 Google，找到 API 所在的标准；
  阅读标准，手工或者用代码整理出标准中包含的 API；
  用代码在 Window 的属性中过滤掉标准中涉及的 API。

  完成所有的 API 到标准的归类 **?**