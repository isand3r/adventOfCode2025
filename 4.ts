const EMPTY = '.';
const ROLL = '@';
const ACCESSIBLE = 'x';

const fileContents = (await Deno.readTextFile('./4.txt')).trim();
const startingMap = fileContents.split('\n').map((row: string) => row.split(''));
let map = startingMap;
const rows = map.length;
const cols = map[0].length;

function isEmpty(y: number, x: number): number {
  if (x < 0 || y < 0 || x > (cols - 1) || y > (rows - 1)) return 0;
  return (map[y][x]) === EMPTY ? 0 : 1;
}

function isAccessible(y: number, x: number): boolean {
  const count =
    isEmpty(y+1,x) +
    isEmpty(y+1,x+1) +
    isEmpty(y,x+1) +
    isEmpty(y-1,x+1) +
    isEmpty(y-1,x) +
    isEmpty(y-1,x-1) +
    isEmpty(y,x-1) +
    isEmpty(y+1,x-1);
     
  return count < 4;
}

function removeRolls() {
  let accessibleRolls = 0;
  const workMap: string[][] = Array.from(map.map((r: string[]) => Array.from(r))); 

  for(let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const item = map[row][col];
      if (item === ROLL) {
        if(isAccessible(row, col)) {
          accessibleRolls++;
          workMap[row][col] = EMPTY;
        }
      }
    }
  }
  
  console.clear();
  console.log({accessibleRolls});
  console.log(workMap.map((row: string[]) => row.join('')).join('\n'));
  map = workMap;
  return accessibleRolls;
}

function main () {
  let accessibleRolls = removeRolls();
  let totalRolls = accessibleRolls;
  while(accessibleRolls > 0) {
    accessibleRolls = removeRolls();
    totalRolls += accessibleRolls;
  }
  console.log({totalRolls});
}

main();
