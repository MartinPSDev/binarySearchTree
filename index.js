function mergeSort(arr) {
    if (arr.length == 1) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    let leftArr = []
    let rightArr = []
    let count = 0
    while (count < mid) {
        leftArr.push(arr[count])
        count++
    }
    count = mid
    while (count < arr.length) {
        rightArr.push(arr[count])
        count++
    }
    leftArr = mergeSort(leftArr)
    rightArr = mergeSort(rightArr)
    return merge(leftArr, rightArr)
    function merge(left, right) {
        let li = 0
        let ri = 0
        let mergedArr = []
        while (mergedArr.length < right.length + left.length) {
            if (left[li] == null) {
                while (ri < right.length) {
                    mergedArr.push(right[ri])
                    ri++
                }
            } else if (right[ri] == null) {
                while (li < left.length) {
                    mergedArr.push(left[li])
                    li++
                }
            } else {
                if (left[li] < right[ri]) {
                    mergedArr.push(left[li])
                    li++
                } else {
                    mergedArr.push(right[ri])
                    ri++
                }
            }
        }
        return mergedArr
    }
}
function mergeSortRemoveDups(arr) {
    arr = mergeSort(arr)
    let index = 0
    while (index < arr.length) {
        if (arr[index + 1] == null) {
            return arr
        } else {
            if (arr[index] == arr[index + 1]) {
                arr.splice(index + 1, 1)
            } else {
                index++
            }
        }
    }
}

class Node {
    constructor(data, leftSide, rightSide) {
        this.data = data
        this.leftSide = leftSide
        this.rightSide = rightSide
    }
}

class Tree {
    constructor(intArray) {
        this.root = buildTree(intArray)
    }
}

function buildTree(intArray) {
    if (intArray.length < 1) return null
    const sortedArray = mergeSortRemoveDups(intArray)
    const midOfArray = Math.floor(sortedArray.length / 2)
    const leftSide = sortedArray.slice(0, midOfArray)
    const rightSide = sortedArray.slice(midOfArray + 1)
    const root = new Node(sortedArray[midOfArray], leftSide, rightSide)
    root.leftSide = buildTree(leftSide)
    root.rightSide = buildTree(rightSide)
    return root
}

const prettyPrint = (root, prefix = "", isLeft = true) => {
  if (root === undefined) {
    return;
  }
  if (root.rightSide !== null) {
    prettyPrint(root.rightSide, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.data}`);
  if (root.leftSide !== null) {
    prettyPrint(root.leftSide, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(value, root) {
    root == undefined ? root = tree.root : null
    if (root.data < value && root.rightSide == null) {
        return root.rightSide = new Node(value)
    } else if (root.data > value && root.leftSide == null) {
        return root.leftSide = new Node(value)
    } 
    root.data < value ? insert(value, root.rightSide) :  insert(value, root.leftSide)
}

function remove(value, parent, curNode) {
    parent == undefined ? parent = tree.root : null
    curNode == undefined ? curNode = tree.root : null
    const emptyLeafs = curNode.rightSide == null && curNode.leftSide == null
    // Case #1 curNode is leaf
    if (value > curNode.data) {
        remove(value, curNode, curNode.rightSide)
    } else if (value < curNode.data) {
        remove(value, curNode, curNode.leftSide)
    }
    if (value == curNode.data && emptyLeafs) return parent.rightSide = null
    // Case #2 curNode has one branch
    if (value == curNode.data && curNode.rightSide == null && parent.rightSide.data == curNode.data) {
        return parent.rightSide = curNode.leftSide
    } else if (value == curNode.data && curNode.rightSide == null && parent.leftSide.data == curNode.data) {
        return parent.leftSide = curNode.leftSide
    } else if (value == curNode.data && curNode.leftSide == null && parent.leftSide.data == curNode.data) {
        return parent.leftSide = curNode.rightSide
    } else if (value == curNode.data && curNode.leftSide == null && parent.rightSide.data == curNode.data) {
        return parent.rightSide = curNode.rightSide
    }
    // Case #3 A node w/ multiple children
        // Find next biggest node (look at rightSide, then recurse down leftSide)
        // replace node with next biggest node
        // Change parent pointer of nextBiggest to nextBiggest.rightSide
        //  ^= no left side because it is smallest node
}

const tree = new Tree([1,2,3,4,5,6,7,8,9,10])
insert(6.5)
insert(12)
remove(10)
remove(2)
prettyPrint(tree.root)

//TODO Write a find function
// Accepts a value and returns the node with the given value

//TODO Write a levelOrder function
// Accepts another function as a parameter
// levelOrder should traverse the tree in breadth-first level order
// Provide each node as the argument to the provided function
// This function can be implemented using either iteration or recursion 
// Return an array of values if no function is given
// Tip: Use an array as a queue to keep track of all the child nodes...
// .. that have yet to traverse and to add new ones to the list (as you saw in the video)

//TODO Write inorder, preorder, and postorder functions
// Accepts a function parameter
// Should traverse the tree in their respective depth-first order 
// yield each node to the provided function given as an argument
// Return an array of values if no function is given

//TODO Write a height function
// Accepts a node and returns its height
// Height is defined as the number of edges in longest path from a given node to a leaf node

//TODO Write a depth function
// Accepts a node and returns its depth
// Depth is defined as the number of edges in path from a given node to the tree’s root node

//TODO Write a isBalanced function
// Checks if the tree is balanced
// A balanced tree is when the difference between heights...
// .. of left subtree and right subtree of every node is not more than 1

//TODO Write a rebalance function
// Rebalances an unbalanced tree
// Tip: You’ll want to use a traversal method to provide a new array to the buildTree function

//TODO Tie it all together
// Write a simple driver script that does the following:
// Create a binary search tree from an array of random numbers
// You can create a function that returns an array of random numbers every time you call it, if you wish
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order
// Unbalance the tree by adding several numbers > 100
// Confirm that the tree is unbalanced by calling isBalanced
// Balance the tree by calling rebalance
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order