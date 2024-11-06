alert(null || 2 || undefined); // 2

alert(alert(1) || 2 || alert(3)); //  1, then 2

alert(1 && null && 2); // alert will show null, because it is the first falsy value

alert(alert(1) && alert(2)); // 1, then undefined

alert(null || 2 && 3 || 4); // 3


let age = prompt('Enter your age', 0);

if (age >= 14 && age <= 90) {
  alert('Your age is between 14 and 90');
}


if (!(age >= 14 && age <= 90)) {
  alert('Your age is not between 14 and 90');
}

if (age < 14 || age > 90) {
  alert('Your age is not between 14 and 90');
}


// Task 8
if (-1 || 0) {
  alert('first');
} // 'first', since -1 is truth

if (-1 && 0) {
  alert('second');
} // alert will not show

if (null || -1 && 1) {
  alert('third');
} // 'third'

let login = prompt('Enter your username', '');

if (login == 'Admin') {
  let password = prompt('Enter your password', '');

  if (password == 'TheMaster') {
    alert('Welcome!');
  } else if (password == '' || password == null) {
    alert('Canceled');
  } else {
    alert('Wrong password');
  }
} else if (login == '' || login == null) {
  alert('Canceled');
} else {
  alert('I don\'t know you');
}
