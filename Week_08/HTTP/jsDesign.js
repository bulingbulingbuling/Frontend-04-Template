// 具有一个隐式的迭代器 for of用到
class Range {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
  }
  [Symbol.iterator]() {
    let value = this.begin;
    let end = this.end;
    return {
      next() {
        if (value >= end) return { done: true };
        return { value: value++ };
      },
    };
  }
}

//generator 继承iterator原型
class generatorRange {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
  }
  *[Symbol.iterator]() {
    for (let v = this.begin; v <= this.end; ++v) {
      yield v;
    }
  }
}

let r = new Range(1, 5);
let r1 = new generatorRange(1, 5);
// iterator  和结构用的就是for of  的关系
//一个 iterator 也是一个 iterate
//r[Symbol.iterator]()也是可迭代的
let [a, b, ...c] = r[Symbol.iterator]().map(x=>x+1);
let [a, b, c, d] = console.log(a, b, c);


for (let x of r) {
  console.log(x);
}
//r1 可以反复使用
for (let x of r1) {
  console.log(x);
}
for (let x of r1) {
  console.log(x);
}
//arrow function函数引用可以多次使用
//或者编程iterator而不是iterate 就可以重复使用
let r = ()=>range(1,5);
for (let x of r()) {
  console.log(x);
}
for (let x of r()) {
  console.log(x);
}
//iterator 是一次使用的
//12345
for (let x of r[Symbol.iterator]()) {
  console.log(x);
}
for (let x of r[Symbol.iterator]()) {
  console.log(x);
}
//1234
let it =  r[Symbol.iterator]();
for (let x of it) {
  console.log(x);
}
for (let x of it) {
  console.log(x);
}
//js 不会编译 for of原理构造g
function Reverse(range) {
  let value = range.end;
  let end = range.begin;
  return {
    next() {
      if (value >= end) return { done: true };
      return { value: value++ };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}
//内件iterator的
//数组
let a=[1,2,3];
for (let iterator of a) {console.log(iterator)};
for (let iterator of a.entries()) {console.log(iterator)};


//tc39
//w3c
//JSCIG 中文讨论深层次的js 原理性的讨论
// 结构赋值位置讨论 为什么...不能在前面  
// 双端迭代器 两边都可以 ... 实现方法 双指针
let [first,...second, rest] = iterable;
// 方法
let [first,...second] = iterable;
let last = second.pop();
//常用的generator
Array.prototype.values = function *values() {
  let = 0
  while(i < this.length){
    yield this[i++]
  }
}
// 理想双端后
Array.prototype.values = function *value(){
  let front = 0,back = 0;
  while(front+back>length){
    if(function sent === 'back') 
    yield this[this.length - (++back)]
    else yield arr[front++]
  }
}
//想法大概是
const iter = Iterator.from([1,2,3,4,5,6]);
iter.next()//{value:1}
iter.nextBack()//{value:6}
iter.nextBack()//{value:5}
iter.next()//{value:2}
iter.next()//{value:3}
iter.next()//{value:4}
iter.next()//{done:true}
iter.nextBack()//{done:true}
//if(function sent === 'back') 是给next传参数的方法
// 结果大概是
const iter = Iterator.from([1,2,3,4,5,6]);
iter.next()//{value:1}
iter.next('back')//{value:6}
iter.next('back')//{value:5}
iter.next()//{value:2}
iter.next()//{value:3}
iter.next()//{value:4}
iter.next()//{done:true}
iter.next('back')//{done:true}

// https://stackoverflow.com
let [first, second, ...rest] = iterable;
//replace 方法 暂时不支持...
string.replace(pattern,(fullMatch, ...submatches, matchIndex, fillString)=>{

})

//iterate和iterable(能推论的；能推理的)关系和区别
//语言规范的理解和原理出现的原因 为什么会有语言规范