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
    };
}
