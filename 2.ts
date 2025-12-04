const fileContents = (await Deno.readTextFile('./2.txt')).trim();
const ranges = fileContents.split(',');

let sum = 0;
let invalidIds: number[] = [];

function idIsInvalid(id: number): boolean {
  const str = id.toString();
  const invalid = str.match(/^(\d+)\1+$/gm);
  // console.log({id, invalid});
  return !!(invalid?.length);
}

for(let i = 0; i < ranges.length; i++) {
  const rng = ranges[i];
  const [min, max] = rng.split('-').map((v: string) => parseInt(v)); 
  for(let j = min; j <= max; j++) {
    if(idIsInvalid(j)) {
      invalidIds.push(j);
      sum += j;
    }
  }
  console.log({rng,min,max,invalidIds})
}

console.log({sum});
