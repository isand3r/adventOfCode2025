const fileContents = (await Deno.readTextFile('./3.txt')).trim();
const banks = fileContents.split('\n');

let sum = 0;

const BATTERY_COUNT = 12;

function findLargestValidBattery(values: number[], exclude: number){
  const slice = values.slice(0, values.length - exclude + 1);
  const largest = slice.toSorted()[slice.length - 1];
  console.log({slice: slice.join(''), largest})
  return [largest, values.indexOf(largest)];
}

function findMaxJoltage(joltageValues: number[]): number {
  const maxJoltage: number[] = [];
  let slice = joltageValues;
  for (let j = 0; j < BATTERY_COUNT; j++) {
    const [bty, idx] = findLargestValidBattery(slice, BATTERY_COUNT - j); 
    maxJoltage.push(bty);
    slice = slice.slice(idx + 1, slice.length);
  } 
  return parseInt(maxJoltage.join('')); 
}

for(let i = 0; i < banks.length; i++) {
  const bnk = banks[i];
  const batteries: number[] = bnk.split('').map((c: string) => parseInt(c));
  const maxJoltage = findMaxJoltage(batteries);
  sum += maxJoltage;
  console.log({bnk,maxJoltage});
}

console.log({sum});
