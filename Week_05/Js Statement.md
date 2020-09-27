# Js/Statement运行时相关概念

Grammar

简单语句

ExpressionStatement 表达式语句

EmptyStatement 空语句

DebuggerStatement debugger;调试断点

ThrowStatement 流程控制语句 跑出一场 throw 表达式

ContinueStatement 流程控制语句 跳出本次循环

BreakStatement 流程控制语句 结束循环

ReturnStatement 流程控制语句 返回函数值 纯函数式编程

组合语句

BlockStatement {语句列表} 完成语句树状结构的重要基础设施可容纳多个语句 

语句执行结果 Completion Record

[[type]]:normal

[[value]]:不明

[[target]]:不明

IfStatement 分支

SwitchStatement 建议If代替

IterationStatement 循环语句

while(Expression){Statement}

do {Statement} while(Expression)

for(var/const/let,Expression,Expression){Statement}

for(var/const/let in Expression){Statement}

for( var/const/let of Expression){Statement}

WithStatement with(obj) 不要用

LabelledStatement 给语句起一个名字 可用于任何语句 多用于循环  

TryStatement 三段机构 try{}catch(try抛出的错误){}finally{}

声明

Runtime

Completion Record 

语句执行结果记录

例如 if 语句 判断的结果

我们需要一个数据结构来描述语句的执行结果：是否返回或返回的是什么 语句完成状态的记录

组成

[[type]] normal break continue return throw

[[value]] 基本类型

[[target]] label

Lexical Environment 作用域相关知识

声明 

FunctionDeclaration

4种形态

function + * ::GeneratorDeclaration

async + function ::AsyncFunctionDeclaration

async + function + * :: AsyncGeneratorDeclaration

GeneratorDeclaration

AsyncFunctionDeclaration

AsyncGeneratorDeclaration

VariableStatement 变量声明且具有实际计算的能力

ClassDeclaration class

LexicalDeclaration const/let

对后续的语句发生作用的这种语句归为声明

```jsx
function

function *

async function

async function *

//只认 function body 没有先后关系 他们永远会被当做出现在函数第一行一样去处理

var //声明作用是相当于出现在函数的头部
	// var a = 2 a已经被声明为一个函数级的局部变量 但是等于后的赋值并没有发生
```

```jsx
// 在声明这个变量前使用会报错 这个并不是说他们的声明就没有作用 其实存在预处理的能力 只是说他确保了你只要在他声明之前使用就会报错 多多使用

class

const

let
```

预处理机制(pre-process)

在代码执行之前 javascript引擎会对代码进行一次预先处理

```jsx
var a = 2;
void function(){
	a = 1;
	return;
	var a;
}()
console.log(a)//2
//预处理会预先找到所有的var 并且让他生效 a=1没有改到全局的a 被函数内部的 var a 占据了 预处理这样处理
```

```jsx
var a = 2;
void function(){
	a = 1;
	return;
	const a;
}()
//const 局部变量 不会影响外部的 a
console.log(a)//Uncaught SyntaxError: Missing initializer in const declaration
```

所有的声明都是有预处理机制的 都能把声明的变量变成一个局部变量 区别在于 const声明的变量 在声明之前使用的话 会抛错 可用try catch

作用域

早期 var和function的作用域是整个函数体 不论var位置在哪里

变量的作用范围

```jsx
var a = 2;
void function(){
	a = 1;
	{
		var a;
	}
}();
console.log(a)//a var作用域是整个函数体
```

```jsx
var a = 2;
void function(){
	a = 1;
	{
		const a;
	}
}();
console.log(a)//抛错 const作用域是其所在花括号 (block 语句) 大函数用花括号分割小函数
```