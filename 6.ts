const fileContents = (await Deno.readTextFile('./6.txt'));
const lines = fileContents.split('\n');

function mult (numbers: number[]) {
  return numbers.reduce((acc, curr) => acc * curr);
}
function add (numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr);
}

const OPERATIONS = {
  '*': mult,
  '+': add
};

function cleanWhiteSpace(s: string): string {
  return s.replace(/ {2,}/g, ' ').trim();
}

function main () {
  // part 1
  // const numberStrings = lines.slice(0, lines.length - 1).map(l => cleanWhiteSpace(l));
  // const numbers = numberStrings.map(s => s.split(' ').map(c => parseInt(c)));
  // const operations = cleanWhiteSpace(lines[lines.length - 1]).split(' ');
  // console.log({numbers, operations});  

  // let sum = 0;

  // for(let i=0; i < operations.length; i++) {
  //   const op = operations[i];
  //   const oprds = numbers.map(n => n[i]);
  //   const result = OPERATIONS[op](oprds);
  //   console.log({op,oprds,result});
  //   sum += result;
  // }
  // console.log({sum});

  // part 2 
  const len = lines.length;
  const lineLen = lines[0].length;
  const numberStr = lines.slice(0, len - 1);
  const operations = cleanWhiteSpace(lines[lines.length - 1]).split(' ').reverse();
  const problems = [];
  let problem = [];
  for(let i=lineLen-1; i >= 0; i--) {
    const col = numberStr.map(l => l[i]);
    const value = col.join('').replaceAll(' ', '');
    console.log({i,col,value})
    if(value === '' || i === 0) {
      if(i === 0 && value !== '') {
        problem.push(parseInt(value));
      }
      problems.push(problem);
      problem = [];
    } else {
      problem.push(parseInt(value));
    } 
  }
  console.log({problems, operations, p: problems.length, o: operations.length});
  // Deno.writeTextFile('./debug.txt', JSON.stringify({problems,operations}))

  let sum = 0;

  for(let i=0; i < operations.length; i++) {
    const op = operations[i];
    const oprds = problems[i]; 
    const result = OPERATIONS[op](oprds);
    // console.log({op,oprds,result});
    sum += result;
  }
  console.log({sum});


}

main()
