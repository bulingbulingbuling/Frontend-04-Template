# 浏览器原理[^第七周] #  

## 排版 ##  

### **根据浏览器属性进行排版** ###  

对应流程里的 **DOM width css ==>layout**  

在css基础上通过排版的计算得到一个带位置的DOM树  

以flex排版为例实现一个排版算法  
在整个css里面 包含三代的排版技术 第一代是正常流 包含了position display float  第二代是flex 第三代是grid 第四代 css houdini  
纵排 横排  
**主轴(Main Axis)** 排版的主要延伸方向 第二排版元素相对于第一个元素的方向 跟主轴垂直就有一个**交叉轴(Cross Axis)**  
在进行排版之前要根据flex属性设置主轴方向的  
代码：  
      flex-direction:row;
      Main:width x left right
      Cross:height y top bottom;
而:  
      flex-direction:column;
      Main:height y top bottom;
      Cross:width x left right
确定添加排版方法的地方：因为flex布局与子元素相关 所以添加在结束标签之前  

总结：  

  >排版预处理：处理flex direction和flex wrap相关属性  
  >将相关主轴交叉轴属性抽象成main-变量和cross-变量 便于以后计算使用  

### **排版｜收集元素进行** ###  

  >收集元素进行是为了后面计算元素位置的准备工作  
  >分行：当元素尺寸超过主轴尺寸时会进行分行。如果设置了no-warap 强制分进第一行  

### **flex布局就是将flex——item元素收集进行内** ###  

  >分行：  
  >>根据主轴尺寸，把元素分进行内  
  >>若设置了no-wrap，则强行分配进第一行  

### **排版｜计算主轴** ###  

计算主轴的方向 所有元素的宽左右都计算出来

+ 找出所有的 Flex元素  

+ 把主轴方向的剩余尺寸按比例分配给这些元素  

+ 若剩余空间为负数，所有Flex元素为0，等比压缩剩余元素  

### **排版｜计算交叉轴** ###  

计算主轴的方向 所有元素的高上下都计算出来  

+ 根据每一行最高的的元素计算高  

+ 根据行高flex-align和item-align,确定元素上下位置  

### **渲染｜绘制单个元素** ###  

+ 依赖images包绘制图片（webGL）  

+ 绘制在viewport上进行  

### **渲染｜绘制DOM** ### 

递归调用渲染函数 render