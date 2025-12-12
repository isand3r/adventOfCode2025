const TEST = Deno.env.get('TEST'); const fileContents = (await Deno.readTextFile(TEST ? './7.test.txt' : './7.txt')); const lines = fileContents.split('\n');
const rows = lines.length;
const cols = lines[0].length;
console.log({rows,cols})
const BEAM = '|';
const SPACE = '.';
const SPLIT = '^';

// part 1
const map = lines.map(l => l.split(''));
const nodes: number[][] = [];
function findNodes () {
  const start = lines[0].indexOf('S');
  let beams = [start];
  for(let i=1; i < rows; i++) {
    const currBeams: number[] = [];
    const row = lines[i];
    for(let j=0; j < cols; j++) {
      if(beams.includes(j)) {
        if (row[j] === SPACE) {
          map[i][j] = BEAM
          if(!currBeams.includes(j)) currBeams.push(j);
        } else if (row[j] === SPLIT) {
          nodes.push([i,j]);
          const [a,b] = [j-1,j+1];
          map[i][a] = BEAM;
          map[i][b] = BEAM;
          if(!currBeams.includes(a)) currBeams.push(a);
          if(!currBeams.includes(b)) currBeams.push(b);
        }
      }
    }
    beams = currBeams;
    // console.log(map.map(l => l.join('')).join('\n'));
  }
}
findNodes()
//console.log({nodes, count: nodes.length});

// part 2
type Node = {
  val: string;
  left: string | undefined;
  right: string | undefined;
};

type Tree = {
  [key: string]: Node;
};

type Cache = {
  [key: string]: number;
};

// build a binary tree from the nodes
const leafNodes: Node[] = [];
function findChildren (node: number[]) {
  const [nY, nX] = node;
  const leftChild = nodes.filter(n => (n[1] === (nX-1)) && n[0] > nY);
  const rightChild = nodes.filter(n => (n[1] === (nX+1)) && n[0] > nY);
  if(leftChild.length === 0) {
    const nn = [rows, nX-1];
    leafNodes.push({ val: nn.join('-'), left: undefined, right: undefined });
    leftChild.push(nn);
  }
  if(rightChild.length === 0) {
    const nn = [rows, nX+1];
    leafNodes.push({ val: nn.join('-'), left: undefined, right: undefined });
    rightChild.push(nn);
  }
  return { val: node.join('-'), left: leftChild[0]?.join('-'), right: rightChild[0]?.join('-') };
}
const rootX = nodes[0][0];
const rootY = nodes[0][1];
const tree: Tree = {};
nodes.map(n => {
  tree[n.join('-')] = findChildren(n);
});
leafNodes.map(n => {
  tree[n.val] = n;
});
const memo: Cache = {};
function traverse(root: Node): number {
  if(!root) return 0;
  if(memo[root.val]) return memo[root.val];
  if(!root.left && !root.right) {
    return 1
  }
  const result = (root.left ? traverse(tree[root.left]) : 0) + (root.right ? traverse(tree[root.right]) : 0);
  memo[root.val] = result;
  return result;
}
const ans = traverse(tree[`${rootX}-${rootY}`]);
console.log({tree, ans})
