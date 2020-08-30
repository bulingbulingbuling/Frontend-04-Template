# javascript的异步机制

callback回调函数

promise：每个promise都包装成一个函数 then可以return另一个promise race和all

async/await 基于promise上面的一种语法支持和封装 运行时也是靠promise去管理异步的机制

```jsx
<style>
  div {
    background-color: grey;
    display: inline-block;
    margin: 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .green.light {
    background-color: green;
  }

  .red.light {
    background-color: red;
  }

  .yellow.light {
    background-color: yellow;
  }
</style>
<div class="green"></div>
<div class="yellow"></div>
<div class="red"></div>
<script>
  function green() {
    var lights = document.getElementsByTagName("div");
    for (var i = 0; i < lights.length; i++) {
      lights[i].classList.remove("light");
    }
    document.getElementsByClassName("green")[0].classList.add("light")
  }

  function yellow() {
    var lights = document.getElementsByTagName("div");
    for (var i = 0; i < lights.length; i++) {
      lights[i].classList.remove("light");
    }
    document.getElementsByClassName("yellow")[0].classList.add("light")
  }

  function red() {
    var lights = document.getElementsByTagName("div");
    for (var i = 0; i < lights.length; i++) {
      lights[i].classList.remove("light");
    }
    document.getElementsByClassName("red")[0].classList.add("light")
  }

  

  
</script>
```

例子 红绿灯案例（callback）

```jsx
function light() {
    red();
    setTimeout(function () {
      green();
      setTimeout(function () {
        yellow();
        setTimeout(function () {
          light()
        }, 2000)
      }, 5000)
    }, 5000)
  }
  light()
```

例子 红绿灯案例（promise）

```jsx
function sleep(t) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, t)
    })
  }

  function go() {
    green()
    sleep(5000).then(() => {
      yellow();
      return sleep(2000);
    }).then(() => {
      red();
      return sleep(5000)
    }).then(go)
  }
  go()
```

例子 红绿灯案例 async await（promise）

```jsx
async function go() {
    while (true) {
      green()
      await happen(5000);
      yellow()
      await happen(2000);
      red()
      await happen(5000);
    }
  }
```

generator与异步

generator模拟async await

async generator