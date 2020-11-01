# 重学 Css

css 语法标准解读：**Css 的顶层样式表由两种规则组成的规则构成，一种被称为 at-rule，也就是 at 规则，另一种是 qualified rule,也就是普通规则**

- at-rule 由一个 **@** 关键字和后续的一个区块组成，at 规则正是掌握 css 的一些高级特性所必备的内容

- qualified rule 才是我们熟识的由选择器和属性指定构成的规则。

## at-rule at 规则

- **@charset**
  CSS 文档最前面 用于提示 css 文件所用的字符编码格式，这条规则只在给出语法解析阶段前使用，并不影响页面上的展示效果。  
  `@charset "utf-8"`
- **@important**
  引入一个 CSS 文件。可以引入一个文件的全部内容 除了@charset 规则不会被引入 .import 还支持 supports 和 media query

```css
@import [ <url> | <string> ] [ supports(
    [ <supports-condition> | <declaration> ]
  ) ]? <media-query-list>?;
@important "mystyle.css"  
@important url("mystyle.css");
```

- **@media**
  **media query** 对设备类型做判断

```css
@media print{
   body:font-size:14pt;
}
```

- **@page**
  分页媒体访问网页时使用的 css 表现设置。页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。有 scroll 就不是分页媒体

```css
@page {
  size: 8.5in 11in;
  margin: 10%;
  @top-left {
    content: "hamlet";
  }
  @top-right {
    content: "page" counter(page);
  }
}
```

- **@counter-style**
  产生一种数据，用于定义列表项的表现 类似于变量

```css
   @counter-style striangle{
     system:cyclic;
     symbols:➡️;符号
     suffix:" ";前缀
   }
```

- **@keyframes**

产生一种数据，用于定义动画关键帧

```css
@keyframes name {
  from {
    left: 0;
    top: 0;
  }
  to {
    left: 100px;
    top: 100px;
  }
}
```

- **@fontface**
  >

```css
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}
p {
  font-family: Gentium, serif;
}
```

- **@supports**  
  support 检查环境的特性，它与 media 比较类似。
- **@namespace**  
  用于跟 XML 命名空间配合的一个规则，表示内部的 CSS 选择器全都带上特定命名空间。
- **@viewport**  
  于设置视口的一些特性，不过兼容性目前不是很好，多数时候被 HTML 的 meta 代替。

## rule

构成：选择器 声明{属性/变量：值/函数}

收集标准 [网址](https://www.w3.org/TR/?tag=css)

```javascript
Array.prototype.slice
  .call(document.querySelector("#container").children)
  .filter((e) => e.getAttribute("data-tag").match(/css/))
  .map((e) => ({
    name: e.children[1].innerText,
    url: e.children[1].children[0].href,
  }));
```

- **简单选择器**

- "\*"
- "tagName"
  HTML 存在命名空间 html svg mathMl 若要选择命名空间内的元素 需要用“｜” 命名空间分隔符 链接 比如 svg|a svg 里的 a 标签 html 语言中命名空间分隔符是冒号
- ".class"
- "#id"
- "[attr=value]"
- ":any-link"
- "::first-line"

- **选择器优先级**

简单选择器 四元数组
#id div.a#id{} 这个选择器的四元数组就是 [0(Inline styles ),2(IDs),1(Classes, attributes and pseudo-classes),1(Elements and pseudo-elements )] 对优先级没有影响:通配选择符（universal selector）（\*）关系选择符（combinators）（+, >, ~, ' ', ||）否定伪类（negation pseudo-class）（:not(null)）,not 中的选择器当做普通选择器进行计数优先级由 s 表示 [所有简单选择器对应优先级参考](https://specifishity.com/)

```javascript
   s = 0*n^3 + 2*n^2 + 1*n^1 + 1  n是足够大的值
```

- **伪类**

链接行为伪类:any-link/:link/:visited/:hover/:active/:focus/:target(a 标签的锚点设计的) 使用:link/:visited 不能修改元素内除字体颜色外的样式
树结构伪类 :empty/:nth-child()/:nth-last-child()/:first-child/:last-child/:only-child
逻辑型伪类 :not()/:where/:has

- **伪元素**

通过css content向页面添加Dom元素 不污染DOM树
    ::before
    ::after
用不存在的元素把一本分文本扩起来进行处理
    ::first-line  排版之后第一行 支持修改的属性：font/color/background/word-spacing/letter-spacing/text-decoration/text-transform/line-height  
    ::first-letter 第一个字母 支持修改的属性(first-line 的都支持)：float/vertical-align/margin/padding/border
[css functions list:](https://css-tricks.com/complete-guide-to-css-functions/)
**为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？（提交至 GitHub）**

```html
<p>first-line 是块级元素内部的文本级行盒子 排版之后才能选中 float属性是在排版时生效的 2是首行是伪类 并没有真正对应的元素</p>
<p>first-letter 是首字母扩起来形成一个选择器</p>
```
