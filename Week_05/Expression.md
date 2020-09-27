# 表达式 Expression|运算符和表达式

内容：语法树跟运算优先级的关系 运算符的左值和右值的区别

运算时

引用类型和转换类型

语法树跟运算优先级的关系 js中使用产生式描述运算优先级的

由高到低是：

member类的运算符 包括 :

a.b 成员访问

a[b] 成员访问

a['b']

foo`string`? 反引号前是函数时 会拆分字符串当函数参数

super.b

super['b']

new.target？

new Foo()

```jsx
new a()()
//第一个括号是new运算的结果
```

New

new Foo

```jsx
new new a()
//括号是跟第二个new
```

reference 对象和key 要指出是哪个对象的哪个属性

扩展：运行时的引用类型 指运行时访问a.b时访问的a的b属性 取出的数据并非是a.b的值 而是引用 这种类型称为标准中的类型 并非语言中的类型

Object

Key 引用

delete

assign

Expression

Call

foo()

super()

foo().b

foo().['b'] 

foo()`atring`

```jsx
new a()['b']
//语法级的优先级多于运算符的优先级 在这里['b']在这里会降级 圆括号跟new new出a对象 访问其b属性

```

Left-Hand-Side Expression & Right-Hand-Side Expression

```jsx
a.b = c;
a+b = c;
//只有Left-Hand-Side Expression能放在赋值左面
```

Update(Right-Hand-Side Expression)

a++

a——

—— a

++ a

```jsx
++a++ //a会先与后面的++结合 不合法
++(a++)
```

Unary 单目运算符

delete a.b

void foo()

typeof a

+a

-a

~a 按位取反

!a

await a 

Exponental ** 右结合运算符

```jsx
3**2**3//先算2**3 值为8 在进行3**8运算
```

Multiplicative

*/%

Additive

+-

Shift 移位运算

<< >> >>>

Relationship 比较

< > ≤ ≥ instanceof in

Equality

= =

! =

= = =

! ==

Bitwise

& ^ |

Logical

&& ||

Conditional 

? : 三目运算符

类型转换

a + b

"false" == false //false

a[o] = 1

boxing 装箱转换

![%E8%A1%A8%E8%BE%BE%E5%BC%8F%20Expression%20%E8%BF%90%E7%AE%97%E7%AC%A6%E5%92%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F%20c31f3f61611c4de4b9c29b29d2fee029/2020-09-24_19.36.07.png](%E8%A1%A8%E8%BE%BE%E5%BC%8F%20Expression%20%E8%BF%90%E7%AE%97%E7%AC%A6%E5%92%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F%20c31f3f61611c4de4b9c29b29d2fee029/2020-09-24_19.36.07.png)

unboxing 拆箱转换 把object转换成基本类型 主要过程 toPremitive（object 参与运算 + ）

toString()

valueOf() 

Symbol.toPrimitive

```jsx
var o={
	toString(){
		return "2"
	},
	valueOf(){
		return 1
	},
	[Symbol.toPrimitive](){
			return 3
	}
}
var x = {}
x[o]=1
//优先调用 Symbol.toPrimitive
console.log("x"+o)//x3
//去除Symbol.toPrimitive 之后优先调用 valueOf
console.log("x"+o)//x1
//o作为属性名时优先调用toString方法
console.log("x"+x[o])//x1
```

boxing

![%E8%A1%A8%E8%BE%BE%E5%BC%8F%20Expression%20%E8%BF%90%E7%AE%97%E7%AC%A6%E5%92%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F%20c31f3f61611c4de4b9c29b29d2fee029/2020-09-24_21.23.07.png](%E8%A1%A8%E8%BE%BE%E5%BC%8F%20Expression%20%E8%BF%90%E7%AE%97%E7%AC%A6%E5%92%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F%20c31f3f61611c4de4b9c29b29d2fee029/2020-09-24_21.23.07.png)