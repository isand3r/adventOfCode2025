const fileContents = (await Deno.readTextFile('./5.txt')).trim();
const [rangeStrings, ingredientStrings] = fileContents.split('\n\n').map((r: string) => r.split('\n'));
const ranges = rangeStrings.map((s: string) => s.split('-').map((c: string) => parseInt(c))).sort();
const ingredients = ingredientStrings.map((s: string) => parseInt(s));
// console.log({ranges,ingredients});

function isInRange(igdt: number, range: number[]): boolean {
  return igdt >= range[0] && igdt <= range [1];
}

function doRangesOverlap(r1: number[], r2: number[]): boolean {
  return isInRange(r1[0], r2) || isInRange(r1[1], r2) || isInRange(r2[0], r1) || isInRange(r2[1], r1);
}

function combineRanges(r1: number[], r2: number[]): number[] {
  return [r1[0] > r2[0] ? r2[0] : r1[0], r1[1] > r2[1] ? r1[1] : r2[1]];
}

function areRangesEqual(r1: number[], r2: number): boolean {
  return r1[0] === r2[0] && r1[1] === r2[1];
}

function rangeExists(ranges: number[][], range: number) {
  return ranges.find(r => areRangesEqual(range, r))
}

function mergeRanges(ranges: number[][]): number[][] {
  const combinedRanges: number[][] = [];
  for (let i=0; i < ranges.length; i++) {
    const range = ranges[i];
    const overlap = ranges.find(r => doRangesOverlap(range, r) && !areRangesEqual(range, r)); 
    if (!overlap) {
      if(!rangeExists(combinedRanges, range)) {
        combinedRanges.push(range);
      }
    } else {
      const combinedRange = combineRanges(range, overlap);
      if(!rangeExists(combinedRanges, range)) {
        combinedRanges.push(combinedRange);
      }
    }
  }
  return combinedRanges;
}

function main () {
  // part 2
  // count valid ingredient Ids
  // first, combine overlapping ranges 
  let currentLength = ranges.length;
  let mergedRanges = mergeRanges(ranges);
  
  while(mergedRanges.length < currentLength) {
    currentLength = mergedRanges.length;
    mergedRanges = mergeRanges(mergedRanges);
  }

  // console.log({ranges: ranges.length, mergedRanges: mergedRanges.length});
  // console.log({ranges, mergedRanges});

  let count = 0;
  for(let i=0; i < mergedRanges.length; i++) {
    const range = mergedRanges[i];
    const ids = (1 + range[1] - range[0]);
    count += ids;
  }
  console.log({count});

  // part 1
  // count fresh ingredients
  let freshCount= 0;
  for(let i=0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const fresh = mergedRanges.find((r: number[]) => isInRange(ingredient, r));
    if (fresh) freshCount++;
    // console.log({ingredient, fresh});
  }
  // console.log({ freshCount });
 
}

main()
