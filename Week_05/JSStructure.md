# JS结构化程序设计|宏任务和微任务

JS执行粒度(运行时)

宏任务 传给javascript引擎的任务

微任务(Promise产生) 在javascript引擎内部的任务

函数调用(Execution context)

语句/声明(Completion Record)

表达式(Reference)

直接量/变量/this...

javascript 其实是一个静态库 我们使用时会给他一段代码

```jsx
var x = 1;
var p = new Promise(resolve=>{resolve()});
p.then(()=>x=3);
x = 2;
```

这段代码交给 Javascript Engine

```jsx
x = 1
p=...
x=2
//第一个微任务
```

```jsx
//then 异步
x=3
//第二个微任务
```

两个异步称为MicroTask(Job)

```jsx
上述运行结果 //3
```

整个过程称为宏任务

事件循环

![JS%E7%BB%93%E6%9E%84%E5%8C%96%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%20%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1%20a5af054949c74670828a6357bd6eab63/2020-09-26_23.29.51.png](JS%E7%BB%93%E6%9E%84%E5%8C%96%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%20%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1%20a5af054949c74670828a6357bd6eab63/2020-09-26_23.29.51.png)

如何使用javascript引擎(jsc)的过程 event loop 类似node

获取代码 get code

执行 execute

等待继续获取代码的信号(锁) wait

函数调用

```jsx
inimport{foo}from "foo.js"
var i = 0;
console.log(i);
foo();
console.log(i);
i++
```

```jsx
function foo(){
	console.log(i);
}
export foo
```

注意i的作用范围 stack 函数调用形成了stack数据结构

Execution Context 执行上下文

ECMAScript Code Execution Context

code evaluation state

Function

Script or Module

Realm

LexicalEnvironment

VariableEnvironment

Generator Execution Context

code evaluation state

function

Script or Module

Realm

LexicalEnvironment this new.target super 变量

VariableEnvironment 仅仅用于处理var声明 

Generator

闭包

Realm

在JS中，函数表达式和对象直接量均会创建对象

使用.做隐式转换也会创建对象

这些对象也是有原型的，如果我们没有Realm,就不知道他们的原型是什么

在一个Javascript 实例里面它所有的内置对象都会放到一个realm里面去 不同的Realm实例事件内置对象是完全独立的，realm实例之前是可以传递对象的 但是传递后对象的prototype是不一样的

```jsx
var x = {}//直接量创建object
toString()//装箱产生Number对象
```

找出javascript引擎中Realm的所有内置对象 使用一个JS的数据可视化框架 蚂蚁前端G6 做一个Realm可视化