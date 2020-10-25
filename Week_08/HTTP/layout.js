//预处理css规则
function getStyle(element) {
  //初始化
  if (!element.style) {
    element.style = {};
  }

  for (let prop in element.computedStyle) {
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    //px结尾
    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }

    //纯数字的值(本身是字符串)
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }

  return element.style;
}

function layout(element) {
  //判断的当前元素没有css规则
  if (!element.computedStyle) {
    return;
  }

  //对当前元素的css规则做预处理
  var elementStyle = getStyle(element);

  if (elementStyle.display !== "flex") {
    return;
  }

  // 子元素取出来
  var items = element.children.filter((e) => e.type === "element");

  //不是很清楚 order属性
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });

  var style = elementStyle;

  //没有height和width属性元素大小就设置为空
  ["width", "height"].forEach((size) => {
    if (style[size] === "auto" || style[size] === "") {
      style[size] = null;
    }
  });

  //只是默认属性值 确保用到的属性都得到一个值
  if (!style.flexDirection || style.flexDirection === "auto") {
    style.flexDirection = "row";
  }
  if (!style.alignItems || style.alignItems === "auto") {
    style.alignItems = "stretch";
  }
  if (!style.justifyContent || style.justifyContent === "auto") {
    style.justifyContent = "flex-start";
  }
  if (!style.flexWrap || style.flexWrap === "auto") {
    style.flexWrap = "nowrap";
  }
  if (style.alignContent || style.alignContent === "auto") {
    style.alignContent = "stretch";
  }

  //抽象化属性 之后这些放到计算中
  var mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;
  if (style.flexDirection === "row") {
    mainSize = "width"; //主轴尺寸

    mainStart = "left"; //主轴从左边开始 row-reverse
    mainEnd = "right"; //主轴在右边开始

    mainSign = +1;
    mainBase = 0;

    crossSize = "height"; //交叉轴
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "row-reverse") {
    mainSize = "width"; //主轴尺寸

    mainStart = "right"; //主轴从左边开始 row-reverse
    mainEnd = "left";

    mainSign = -1;
    mainBase = style.width;

    crossSize = "height"; //交叉轴
    crossStart = "top";
    crossEnd = "bottom";
  }

  if (style.flexDirection === "column") {
    mainSize = "height"; //主轴尺寸

    mainStart = "top"; //主轴从上开始 column-reverse
    mainEnd = "bottom";

    mainSign = +1;
    mainBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }

  if (style.flexDirection === "column-reverse") {
    mainSize = "height"; //主轴尺寸

    mainStart = "bottom"; //主轴从上开始 column-reverse
    mainEnd = "top";

    mainSign = -1;
    mainBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }

  //反向换行
  if (style.flexWrap === "wrap-reverse") {
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 父元素没设置width 子元素撑开 父元素的 mainSize 值是所有子元素 mainSize 值的和
  var isAutoMainSize = false;

  if (!style[mainSize]) {
    elementStyle[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (elementStyle[mainSize] !== null || item.style) {
        elementStyle[mainSize] = elementStyle[mainSize] + item.style[mainSize];
      }
    }

    isAutoMainSize = true;
  }

  //收集子元素进行
  var flexLine = []; //行
  var flexLines = [flexLine]; //存放行的数组

  var mainSpace = elementStyle[mainSize]; //剩余空间
  var crossSpace = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemStyle = getStyle(item);

    //当前子元素没有设施主轴尺寸 为0
    if (item[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    //元素有flex属性 即当前元素是可伸缩的
    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
      mainSpace -= item[mainSize];
      //更新交叉轴的尺寸 当前元素有高度且大于当前的crossSpace
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      //换行 flex-wrap

      //子元素大于父元素尺寸 将子元素尺寸压小
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }

      //剩余空间不够子元素尺寸时 新建一行
      if (mainSpace < itemStyle[mainSize]) {
        //现在那个行的主轴剩余尺寸和交叉轴剩余尺寸存起来
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = CrossSpace;
        //创建新行
        flexLine = [item];
        flexLines.push(flexLine);
        //重置剩余空间
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        //剩余空间够子元素尺寸 直接放到行内
        flexLine.push(item);
      }

      // 计算算交叉轴尺寸
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= item[mainSize];
    }
  }

  flexLine.mainSpace = mainSpace;

  //根据Flex属性分配 mainSpace
  if (style.flexWrap === "nowrap" || isAutoMainSize) {
    flexLine.mainSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  //等比压缩元素 单行
  if (mainSpace < 0) {
    var scale = style[mainSize] / (style[mainSize] - mainSpace); //小于1
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);

      //flex不会进行压缩
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }

      itemStyle[mainSize] = itemStyle[mainSize] * scale;

      //求出压缩之后的元素起止 设置元素的主轴宽
      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] =
        itemStyle[mainStart] + mainSign * itemStyle[mainSize];

      //上一个位置的结束位
      currentMain = itemStyle[mainEnd];
    }
  } else {
    //多行

    flexLines.forEach(function (item) {
      var mainSpace = items.mainSpace;
      //flex的值
      var flexTotal = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);

        //有设置flex的元素就加上元素的flex值
        if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
          flexTotal += itemStyle.flex;
          continue;
        }

        //有flex元素的情况下 剩余空间按flex值分配 占满整个行
        if (flexTotal > 0) {
          var currentMain = mainBase;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);

            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
            }

            //求出压缩之后的元素起止 设置元素的主轴宽
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSize];

            //上一个位置的结束位
            currentMain = itemStyle[mainEnd];
          }
        } else {
          //没有flex元素则根据justifyContent规则分配剩余空间
          if (style.justifyContent === "flex-start") {
            var currentMain = mainBase;
            var step = 0;
          }
          if (style.justifyContent === "flex-end") {
            var currentMain = mainSpace * mainSign + mainBace;
            var step = 0;
          }
          if (style.justifyContent === "center") {
            var currentMain = (mainSpace / 2) * mainSign + mainBace;
            var step = 0;
          }
          //元素之间有间隔 step存贮间隔
          if (style.justifyContent === "space-between") {
            var currentMain = mainBace;
            var step = (mainSpace / (items.length - 1)) * mainSign;
          }
          if (style.justifyContent === "space-around") {
            var step = (mainSpace / items.length) * mainSign;
            var currentMain = step / 2 + mainBace;
          }

          for (var i = 0; i < items.length; i++) {
            var item = items[i];

            itemStyle[(mainStart, currentMain)];
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSize];

            //上一个位置的结束位
            currentMain = itemStyle[mainEnd] + step;
          }
        }
      }
    });
  }

  //交叉轴尺寸
  //计算父元素所剩的交叉轴空间
  var crossSpace;

  if (!style[crossSize]) {
    crossSize = 0;
    elementStyle[crossSize] = 0;
    for (var i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] =
        elementStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (var i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  //根据alignContent属性分配交叉轴空间
  if (style.flexWrap === "wrap-reverse") {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  //每一行的lineSize 等于总体的交叉轴尺寸除以行数
  var lineSize = style[crossSize] / flexLines.length;

  var step;

  if (style.alignContent === "flex-start") {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === "flex-end") {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === "center") {
    crossBase += (crossSign * crossSpace) / 2;
    step = 0;
  }
  if (style.alignContent === "space-between") {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === "space-around") {
    step = crossSpace / flexLines.length;
    crossBase += (crossSign * step) / 2;
  }
  if (style.alignContent === "stretch") {
    step = 0;
    crossBase += 0;
  }

  flexLines.forEach(function (items) {
    var lineCrossSize =
      style.alignContent === "stretch"
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;

      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = align === "stretch" ? lineCrossSize : 0;
      }
      if (align === "flex-start") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === "flex-end") {
        itemStyle[crossStart] = crossBase + crossBase;
        itemStyle[crossEnd] =
          itemStyle[crossEnd] + crossSign * itemStyle[crossSize];
      }
      if (align === "center") {
        itemStyle[crossStart] =
          crossBase + crossSign * (lineCrossSize - itemStyle[crossSize] / 2);
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === "stretch") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          crossBase +
          crossSign *
            (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0
              ? itemStyle[crossSize]
              : lineCrossSize);
        itemStyle[crossSize] =
          crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize - step);
  });

  console.log(items);
}

module.exports = layout;
