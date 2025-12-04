const MAX = 99;
const START = 50;

let zeroCount = 0;
let position = START;

const fileContents = (await Deno.readTextFile('./1.txt')).trim();
const instructions = fileContents.split('\n');
// console.log(fileContents.split('\n'));

const moveDial = (direction: string, value: number): void => {
  let counter = value;
  while (counter > 0) {
    position = direction === 'L' ? position - 1 : position + 1;
    if (position === -1) position = 99;
    if (position === 100) position = 0;
    if (position === 0) zeroCount++;
    counter--;
  }
}

for(let i = 0; i < instructions.length; i++) {
  const inst = instructions[i];
  const direction = inst.includes('L') ? 'L' : 'R';
  const value = parseInt(inst.replace(/L|R/, ''));
  moveDial(direction, value)
  console.log({inst, direction, value, position})
}

console.log({zeroCount});
