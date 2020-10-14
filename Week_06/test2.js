function match(string) {
  let state = start,
    i = 0;
  for (let c of string) {
    i++;
    state = state(c);
  }
  return state === end;
}
function end(c) {
  return end;
}
// a
function start(c) {
  if (c === "a") {
    return foundAB;
  } else {
    return start(c);
  }
}
//ab
function foundAB(c) {
  if (c === "b") {
    return foundABA;
  } else {
    return start(c);
  }
}
//aba
function foundABA(c) {
  if (c === "a") {
    return foundABAB;
  } else {
    return start(c);
  }
}
//abab
function foundABAB(c) {
  if (c === "b") {
    return foundABABA;
  } else {
    return foundAB(c);
  }
}

function foundABABA(c) {
  if (c === "a") {
    return foundABABAB;
  } else {
    return foundABAB(c);
  }
}

function foundABABAB(c) {
  if (c === "b") {
    return foundABABABX;
  } else {
    return foundABAB(c);
  }
}
function foundABABABX(c) {
  if (c === "x") {
    return end;
  } else {
    return start(c);
  }
}

// abababx
console.log(match("abababxed"));
