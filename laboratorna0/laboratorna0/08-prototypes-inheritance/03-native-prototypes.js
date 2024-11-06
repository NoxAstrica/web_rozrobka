// 1
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  console.log("Hello!");
}

f.defer(1000); // "Hello!" after 1 sec


// 2
Function.prototype.defer = function(ms) {
  let originalFunction = this;
  return function(...args) {
    setTimeout(() => originalFunction.apply(this, args), ms);
  };
};

function f(a, b) {
  console.log(a + b);
}

f.defer(1000)(1, 2); //3 after 1 sec
