const TEST = Deno.env.get('TEST');
const fileContents = (await Deno.readTextFile(TEST ? './9.test.txt' : './9.txt')).trim();

function area (a, b) {
  const y = Math.abs(a[1] - b[1]) + 1;
  const x = Math.abs(a[0] - b[0]) + 1;
  console.log({a,b})
  return Math.abs(y * x);
}

// is point c on the line between a and b?
function isBetween(a, b, c) {

}

function main () {
  const tiles = fileContents.split('\n');
  const coords = tiles.map(t => t.split(',').map(i => parseInt(i)));
  const areas = [];
  // part 1
  for(let i=0; i < coords.length; i++) {
    const tile1 = coords[i];
    for(let j=i+1; j < coords.length; j++) {
      const tile2 = coords[j];
      areas.push(area(tile1,tile2));
    }
  }
  const sorted = areas.toSorted((a,b) => b-a);
  console.log({coords, sorted})
  console.log({ans: sorted[0]})
}

main();
