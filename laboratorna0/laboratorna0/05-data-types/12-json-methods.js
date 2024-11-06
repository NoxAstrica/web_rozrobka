//  1
let user = {
  name: "John Smith",
  age: 35
};

let userJson = JSON.stringify(user);
let userCopy = JSON.parse(userJson);

console.log(userJson); //  string JSON
console.log(userCopy); // { name: "John Smith", age: 35 }


// 2
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

console.log(JSON.stringify(meetup, function replacer(key, value) {
  return value === meetup ? undefined : value;
}));
