const TEST = Deno.env.get('TEST')
const fileContents = (await Deno.readTextFile(TEST ? './11.test.txt' : './11.txt')).trim()

type Node = {
  val: string
  children: string[]
}

type Tree = {
  [key: string]: Node
}

type Cache = {
  [key: string]: number
}

const memo: Cache = {}

const tree: Tree = {};
const nodes = fileContents.split('\n').map(l => {
  const row = l.split(' ')
  const val = row[0].replace(':', '')
  const children = row.slice(1, row.length)
  const node = { val, children }
  tree[val] = node
  return node
})


function traverse (node: Node): number {
  if(memo[node.val]) {
    return memo[node.val]
  } else {
    if(!node.children) return 0;
    if(node.children.includes('out')) return 1;
    const results: number[] = node.children.map(n => traverse(tree[n]));
    const result = results.reduce((acc, curr) => acc + curr)
    memo[node.val] = result
    return result
  }
}

function main () {
  const rootNode = nodes.find(n => n.val === 'you')
  console.log({nodes, rootNode})
  const ans = traverse(rootNode!)
  console.log({ans})
}

main()