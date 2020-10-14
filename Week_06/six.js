function match(string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
}
function start(c) {
  if (c === "a") {
    return foundA;
  } else {
    return start(c);
  }
}
function end(c) {
  return end;
}
function foundA(c) {
  if (c === "b") {
    return foundB;
  } else {
    return start(c);
  }
}
function foundB(c) {
  if (c === "c") {
    return foundC;
  } else {
    return start(c);
  }
}
function foundC(c) {
  if (c === "a") {
    return foundA2;
  } else {
    return start(c);
  }
}
function foundA2(c) {
  if (c === "b") {
    return foundB2;
  } else {
    return start(c);
  }
}
function foundB2(c) {
  if (c === "x") {
    return end;
  } else {
    return foundB(c);
  }
}
// console.log(match("I mabcdefgroot"));
// console.log(match("abcabcdef"));
console.log(match("abcabcabxdef"));
// 使用状态机完成“abababx”的处理
// 可选：我们如何使用状态机处理未知的pattern
//   参考资料 字符串KMP算法
  //https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm