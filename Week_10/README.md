# 重学 Css

## Css排版 盒  

```html
  HTML代码中可以书写开始__标签__，结束__标签__ ，和自封闭_标签___ 。
  一对起止__标签__ ，表示一个_元素___ 。
  DOM树中存储的是__元素__和其它类型的节点（Node）。
  CSS选择器选中的是_元素___ 。
  CSS选择器选中的__元素__ ，在排版时可能产生多个_盒___ 。
  排版和渲染的基本单位是_盒___ 。  
```

html源代码都是标签(tagName)  
表示语义得是元素(element)  
css排版的表现是盒(box)

- **@盒模型**

  排版时所用的基本单位，是一个多层结构  

  ```html
    |--------------------------------------|
    | margin                               |
    |    |----------border-----------|     |
    |    |  padding                  |     |
    |    |   |-------------------|   |     |
    |    |   |     content       |   |     |
    |    |   |                   |   |     |
    |    |   |-content-box:width-|   |     |
    |    |                           |     |
    |    |----border-box:width-------|     |
    |                                      |
    |--------------------------------------|

  ```

  padding: 影响盒内的排版 盒内可排布的 content 的大小
  margin: 影响盒盒之间排布 决定盒周围至少存在的空白区域的大小

- **正常流**

  正常流 ==> Flex ==> Grid ==> CSS Houdini

  css 排版将 **文本** 和 **盒** 安排到正确的位置 设置好尺寸；

  正常流：思路：从左到右 每行对齐 行满另起一行；过程：收集盒和文字进行，计算盒和文字在行内的排布 计算行的排布 规则：
  
  盒：**行内盒(inline box IFC)** **块级盒(block-level-box BFC)** **行盒(line box)**

- **正常流的行级排布**
 [freeType度量字体](https://zhuanlan.zhihu.com/p/84779973)

 ```html
行模型
  line-top 行高大于文字高度出现 与盒混排时会发生偏移

  text-top 文字顶缘 最大的文字决定

  base-line 基线 英文对其

  text-bottom 文字底缘 最大的文字决定

  line-bottom 行高大于文字高度出现
```

盒和文字混排时 盒对其的**位置和高度**都会影响 **line-top** 和 **line-bottom**;
盒子里没有文本时盒子与和他混排的文本基线对其；盒子里有文本时 盒子里最后一行文本的基线与盒外文本基线对其；
用**vertical-align**设置对其方式

- **正常流的行级排布**

float 先正常流排版到正确位置再向右移或左移 行盒的宽度要根据float元素占据的宽度进行调整
clear 强制换行 防止浮动元素堆叠现象 找一个干净的空间执行浮动
float 布局会影响生成的行盒的尺寸 重排现象

margin折叠：上下块级元素margin重叠 以最大的margin为准 只会发生在正常流的BFC

- **BFC合并** BFC(**Block Formatting Context**)块级格式化上下文 涉及的基本概念

  Block Container：能容纳BFC的 能容纳正常流的盒 里面就有BFC ：**block inline-block table-cell flex item grid item table caption**
  Block-level-Box:外面有BFC的**display为 inline-block inline-table inline-grid inline-flex**
  Block Box = Block Container + Block-level Box:里外都有BFC

  ```html
  设立BFC
  · floats
  · absolutely positioned elements
  · block Containers(such as inline-block,table-cell,table-captions,flex item,grid cell)that are not block boxes
  · and block boxes width 'overflow' other than 'visible'
  总结：默认能容纳正常流的盒 都会创建BFC 除了Block Box 里外都是BFC 并且overflow是visible
  ```

  BFC合并： block box里外都是BFC 且overflow为visible 会发生BFC合并

  BFC合并与Float
  BFC合并与边距折叠
- **Flex排版**

·收集盒进行

·计算盒在主轴的大小位置

·计算盒在交叉轴的大小位置

·分行：根据主轴剩余空间盒盒子大小比较 放不下新建行 设置no-wrap强制分进一行

·计算主轴方向：找出所有的设置flex属性的元素 把主轴的剩余空间按比例分配给这些元素 若剩余空间是负数 这些元素flex属性值置为0 等比压缩元素

·计算交叉轴方向：根据每一行最高的元素设置行高度 根据行高 flex-align align-items，确定元素具体位置。

- **动画与绘制｜动画**

### **--Animation**

  @keyframe定义 定义动画关键帧

  animation使用

&nbsp;&nbsp;&nbsp;&nbsp;animation-name 执行动画名称 name

&nbsp;&nbsp;&nbsp;&nbsp;animation-duration 执行动画时间

&nbsp;&nbsp;&nbsp;&nbsp;animation-timing-functions 动画时间曲线

&nbsp;&nbsp;&nbsp;&nbsp;animation-delay 动画延迟

&nbsp;&nbsp;&nbsp;&nbsp;animation-iteration-count 动画执行次数

&nbsp;&nbsp;&nbsp;&nbsp;animation-direction 动画的方向


```css
@keyframes mykf {
  from{
    background:red;
  }
  to{
    background:green;
  }
}
div{
  animation:mykf 5s infinite
}
```

使用animation 的技巧 **在animation中使用transition**

```css
@keyframes mykf{
  0%{
    top:0;
    transition: top ease;
  }
  50%{
    top:30px;
    transition: top ease-in;
  }
  75%{
    top:10px;
    transition: top ease-out;
  }
  100%{
    top:0;
    transition: top linear;
  }
}
```

### **--transition**

属性：

  transition-property 要变幻的属性

  transition-duration 变幻的时长

  transition-timing-function 变化的时间曲线

  --ease 经典缓动曲线 最接近人们认知

  --ease-in 开始缓动 退出动画

  --ease-out 结束缓动

  transition-delay 变换的延迟

自定制时间曲线:[cubic-bezier](https://cubic-bezier.com/#.71,.15,.77,1.68)

- **css动画与绘制｜颜色**

颜色表示的方法

  CMY RGB的补色 品红 黄 蓝 印刷  CMYK 

  RGB 红 绿 蓝

  HSL hue 色相 saturation 纯度越高越鲜艳 lightness 亮度 0黑 100白色

  HSV hue 色相 saturation 纯度越高越鲜艳 value 理解为brightness明度 越高 颜色越亮越纯


- **css动画与绘制｜绘制**

- +几何图形

- -- border

- -- box-shadow

- -- border-radius

- +文字

- -- font 既影响绘制也影响排版 font文件中有规定每个文字的字形 glyph 矢量

- -- text-decoration

- +位图

- -- background-image 绘制图片有图形库 例如 skia GDI shader 点上色-->绘制所有的点

**应用技巧：**

  data uri+svg
  data:image/svg+xml,<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><ellipse cx='300' cv='150' rx="200" ry="80" style="fill:rgba(200,100,50); stroke:rgb(0,0,100);stroke-width:2"/></svg>
