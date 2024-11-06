function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // true

/*
Setting A. and B.prototype to same thing a’s prototype chain includes the shared prototype.
a instanceof B returns true bc B.prototype is in a's prototype chain, even though a was created by A and not B.
*/