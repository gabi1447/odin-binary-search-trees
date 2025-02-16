import { mergeSort } from "./mergeSort.js";

function Node(value) {
    const data = value;
    let left = null;
    let right = null;

    return {
        data,
        left,
        right,
    };
}

function Tree(array) {
    let sortedArray = sortUnorderedArray(array);
    let root = buildTree(sortedArray, 0, sortedArray.length - 1);

    function getRoot() {
        return root;
    }

    function sortUnorderedArray(array) {
        const arrayWithoutDuplicates = removeDuplicates(array);
        const sortedArray = mergeSort(arrayWithoutDuplicates);
        return sortedArray;
    }

    function removeDuplicates(array) {
        const setWithoutDuplicates = new Set(array);
        const arrayWithoutDuplicates = Array.from(setWithoutDuplicates);

        return arrayWithoutDuplicates;
    }

    function buildTree(sortedArray, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const root = Node(sortedArray[mid]);

        root.left = buildTree(sortedArray, start, mid - 1);
        root.right = buildTree(sortedArray, mid + 1, end);

        return root;
    }

    function find(value) {
        const root = getRoot();
        let currentNode = root;

        while (currentNode !== null) {
            if (currentNode.data === value) {
                return currentNode;
            } else if (value < currentNode.data) {
                currentNode = currentNode.left;
                continue;
            } else if (value > currentNode.data) {
                currentNode = currentNode.right;
                continue;
            }
        }

        return null;
    }

    function insert(value) {
        const root = getRoot();
        let currentNode = root;

        while (currentNode !== null) {
            if (value < currentNode.data) {
                if (currentNode.left === null) {
                    currentNode.left = Node(value);
                    break;
                } else {
                    currentNode = currentNode.left;
                    continue;
                }
            } else if (value > currentNode.data) {
                if (currentNode.right === null) {
                    currentNode.right = Node(value);
                    break;
                } else {
                    currentNode = currentNode.right;
                    continue;
                }
            } else {
                return;
            }
        }
    }

    function deleteItem(rootNode, value) {
        if (rootNode === null) {
            return rootNode;
        } else if (value < rootNode.data) {
            rootNode.left = deleteItem(rootNode.left, value);
        } else if (value > rootNode.data) {
            rootNode.right = deleteItem(rootNode.right, value);
        } else {
            // Case 1: No Child
            if (rootNode.left === null && rootNode.right === null) {
                rootNode = null;
            }
            // Case 2: One child
            else if (rootNode.left === null) {
                rootNode = rootNode.right;
            } else if (rootNode.right === null) {
                rootNode = rootNode.left;
            }
            // Case 3: Two childs
            else {
                const temp = findMin(rootNode.right);
                rootNode.data = temp.data;
                rootNode.right = deleteItem(rootNode.right, temp.data);
            }
        }

        return rootNode;
    }

    function findMin(treeNodeRight) {
        if (treeNodeRight.left === null) {
            return treeNodeRight;
        }

        return findMin(treeNodeRight.left);
    }

    function levelOrder(callback) {
        if (root === null) {
            return;
        } else if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        }

        let queue = [];
        queue.push(root);

        while (queue.length !== 0) {
            const firstNode = queue[0];
            callback(firstNode.data);
            if (firstNode.left !== null) {
                queue.push(firstNode.left);
            }

            if (firstNode.right !== null) {
                queue.push(firstNode.right);
            }

            queue.shift();
        }
    }

    function preOrder(root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        callback(root.data);
        preOrder(root.left, callback);
        preOrder(root.right, callback);
    }

    function inOrder(root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        inOrder(root.left, callback);
        callback(root.data);
        inOrder(root.right, callback);
    }

    function postOrder(root, callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        postOrder(root.left, callback);
        postOrder(root.right, callback);
        callback(root.data);
    }

    function height(node) {
        if (node === null) {
            return -1;
        }

        return 1 + Math.max(height(node.left), height(node.right));
    }

    function depth(node) {
        let currentNode = root;
        let depth = 0;

        while (currentNode !== null) {
            if (node.data < currentNode.data) {
                currentNode = currentNode.left;
                depth++;
            } else if (node.data > currentNode.data) {
                currentNode = currentNode.right;
                depth++;
            } else {
                return depth;
            }
        }

        return -1;
    }

    function rebalance() {
        let treeNodeSorted = [];
        inOrder(root, (value) => {
            treeNodeSorted.push(value);
        });
        root = buildTree(treeNodeSorted, 0, treeNodeSorted.length - 1);
    }

    function prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    }

    return {
        prettyPrint,
        getRoot,
        find,
        insert,
        deleteItem,
        findMin,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        rebalance,
    };
}
