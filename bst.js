function Node() {
  let right = null,
      left = null,
      val = null;
  return {val, right, left};
}

function Tree(arr) {
  let root = buildTree(arr);

  function buildTreeHelper(arr, start, end) {
    if (start > end) return null;
    const middle = parseInt((start + end) / 2);
    const root = Node();
    root.val = arr[middle];
    root.left = buildTreeHelper(arr, start, middle - 1);
    root.right = buildTreeHelper(arr, middle + 1, end);
    return root;
  }

  function insertHelper(root, val) {
    if (root === null) {
      root = Node();
      root.val = val;
    } else if (val < root.val) {
      root.left = insertHelper(root.left, val);
    } else {
      root.right = insertHelper(root.right, val);
    }
    return root;
  }

  function removeHelper(root, val) {
    if (root === null) {
      return root;
    } else if (val < root.val) {
      root.left = removeHelper(root.left, val);
    } else if (val > root.val) {
      root.right = removeHelper(root.right, val);
    } else {
      if (root.left === null && root.right === null) {
        root = null;
      } else if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      } else {
        const temp = findMinVal(root.right);
        root.val = temp.val;
        root.right = removeHelper(root.right, temp.val);
      }
    }
    return root;
  }

  function buildTree(arr) {
    const newArr = [...new Set(arr)];
    newArr.sort((a, b) => a - b);
    return buildTreeHelper(newArr, 0, newArr.length - 1);
  }

  function insert(val) {
    root = insertHelper(root, val);
  }

  function findMinVal(root) {
    let currentNode = root;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  
  function remove(val) {
    root = removeHelper(root, val);
  }

  function find(val, node = root) {
    if (node === null || node.val === val) {
      return node;
    } else if (val < node.val) {
      return find(val, node.left);
    } else {
      return find(val, node.right);
    }
  }

  function levelOrder(node = root) {
    const queue = [],
          vals = [];
    if (node !== null) queue.push(node);
    while (queue.length) {
      const currentNode = queue.shift();
      vals.push(currentNode.val);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    return vals;
  }

  function preorder(node = root) {
    let vals = [];
    const preorderHelper = node => {
      if (node === null) return;
      vals.push(node.val);
      preorderHelper(node.left);
      preorderHelper(node.right);
    }
    preorderHelper(node);
    return vals;
  }

  function inorder(node = root) {
    let vals = [];
    const inorderHelper = node => {
      if (node === null) return;
      inorderHelper(node.left);
      vals.push(node.val);
      inorderHelper(node.right);
    }
    inorderHelper(node);
    return vals;
  }

  function postorder(node = root) {
    let vals = [];
    const postorderHelper = node => {
      if (node === null) return;
      postorderHelper(node.left);
      postorderHelper(node.right);
      vals.push(node.val);
    }
    postorderHelper(node);
    return vals;
  }

  function height(node = root) {
    if (node === null) return -1;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node, rootNode = root, distance = 0) {
    if (rootNode === null) {
      return -1;
    } else if (rootNode.val === node.val) {
      return distance;
    } else if (node.val < rootNode.val) {
      return depth(node, rootNode.left, distance + 1);
    } else {
      return depth(node, rootNode.right, distance + 1);
    }
  }

  function isBalanced(node = root) {
    if (node === null) return true;
    return Math.abs(height(node.left) - height(node.right)) <= 1 &&
           isBalanced(node.left) &&
           isBalanced(node.right);
  }

  function rebalance() {
    if (root === null) return null;
    if (!isBalanced()) root = buildTree(inorder());
  }

  function prettyPrint(node = root, prefix = '', isLeft = true) {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  return {
    buildTree,
    insert,
    remove,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint
  };
}

const generateArray = (size, min, max) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return arr;
}

const arr = generateArray(50, 0, 50);
const additionalVals = generateArray(50, 100, 150);
const tree = Tree(arr);
console.log(`Tree balanced: ${tree.isBalanced()}`);
console.log(`Tree in level order: ${tree.levelOrder()}`);
console.log(`Tree preorder: ${tree.preorder()}`);
console.log(`Tree inorder: ${tree.inorder()}`);
console.log(`Tree postorder: ${tree.postorder()}`);
for (const val of additionalVals) {
  tree.insert(val);
}
console.log(`Tree balanced: ${tree.isBalanced()}`);
tree.prettyPrint();
tree.rebalance();
console.log(`Tree balanced: ${tree.isBalanced()}`);
tree.prettyPrint();
console.log(`Tree in level order: ${tree.levelOrder()}`);
console.log(`Tree preorder: ${tree.preorder()}`);
console.log(`Tree inorder: ${tree.inorder()}`);
console.log(`Tree postorder: ${tree.postorder()}`);
