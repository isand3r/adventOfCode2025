const TEST = Deno.env.get('TEST');
const fileContents = (await Deno.readTextFile(TEST ? './8.test.txt' : './8.txt')).trim();

const SHORTEST_X = TEST ? 10 : 1000;

// part 1
function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
}

type Junction = number[];

type Distance = {
  val: number
  a: string
  b: string
}

type Circuit = string[]

function merge(circuitA: Circuit, circuitB: Circuit): Circuit {
  const diff = circuitB.filter(c => !circuitA.includes(c))
  return [...circuitA, ...diff]
}

function main() {
  const boxes: Junction[] = fileContents.split('\n').map(l=>l.split(',').map(s => parseInt(s)));
  const distances: Distance[] = [];
  for(let i=0; i < boxes.length - 1; i++) {
    for(let j=i+1; j < boxes.length; j++) {
      const a = boxes[i]
      const b = boxes[j]
      distances.push({ a: a.join(','), b: b.join(','), val: euclideanDistance(a, b) })
    }
  }
  distances.sort((a, b) => a.val - b.val)

  let connections = 0
  let circuits: Circuit[] = []

  while(connections < SHORTEST_X && distances.length > 0) {
    const pair = distances.shift();
    if(!pair) {
      throw new Error('End of data reached')
    }
    const aCircuits = circuits.filter(c => c.includes(pair.a))
    const bCircuits = circuits.filter(c => c.includes(pair.b))
    const xor = circuits.filter(c => !c.includes(pair.a) && !c.includes(pair.b))
    if(aCircuits.length === 0 && bCircuits.length === 0) {
      circuits.push([pair.a, pair.b])
      connections++
    }
    if(aCircuits.length > 0 && bCircuits.length > 0) {
      connections++
      circuits = [...xor, merge(aCircuits[0], bCircuits[0])]
    }
    if(aCircuits.length > 0 && bCircuits.length === 0) {
      aCircuits[0].push(pair.b)
      circuits = [...xor, ...aCircuits]
      connections++
    }
    if(aCircuits.length === 0 && bCircuits.length > 0) {
      bCircuits[0].push(pair.a)
      circuits = [...xor, ...bCircuits]
      connections++
    }
  }
  circuits.sort((a,b) => b.length - a.length)
  const [a,b,c] = circuits
  const ans = a.length * b.length * c.length
  console.log({ans})
}

main();

