let i = 3;

while (i) {
  alert(i--);
} //1

//from 1 to 4
i = 0;
while (++i < 5) alert(i); 

//from 1 to 5
i = 0;
while (i++ < 5) alert(i); 

//////
for (let i = 0; i < 5; i++) alert(i); // 0, 1, 2, 3, 4
for (let i = 0; i < 5; ++i) alert(i); // 0, 1, 2, 3, 4

////
for (let i = 2; i <= 10; i += 2) {
  alert(i);
}

for (let i = 2; i <= 10; i++) {
  if (i % 2 == 0) {
    alert(i);
  }
}

////
i = 0;

while (i < 3) {
  alert(`number ${i}!`);
  i++;
}

let number = prompt('Enter a number greater than 100:', '');

while (number <= 100 && number) {
  number = prompt('Enter a number greater than 100:', '');
}

let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      continue nextPrime;
    }
  }
  alert(i);
}
