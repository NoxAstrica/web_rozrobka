// 1
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

readMessages.add(messages[0]); //1 and 2 el
readMessages.add(messages[1]);


readMessages.add(messages[0]);  //1 and 2 el

alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();

// 2
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readDates = new WeakMap();

function markAsRead(message) {
  readDates.set(message, new Date());
}

function getReadDate(message) {
  return readDates.get(message) || "Not read yet";
}

markAsRead(messages[0]);
console.log(getReadDate(messages[0])); // read date
console.log(getReadDate(messages[1])); // "Not read yet"
