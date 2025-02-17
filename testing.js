import { Tree } from "./bst.js";

function generateRandomArray(length, limit) {
    let array = [];
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * limit);
        array.push(randomNumber);
    }

    return array;
}

const array = generateRandomArray(20, 100);
console.log(array);

const bst = Tree(array);

bst.prettyPrint(bst.getRoot());

console.log(bst.isBalanced(bst.getRoot()));

console.log("\n");

bst.levelOrder((value) => {
    console.log(value);
});

console.log("\n");

bst.preOrder(bst.getRoot(), (value) => {
    console.log(value);
});

console.log("\n");

bst.inOrder(bst.getRoot(), (value) => {
    console.log(value);
});

console.log("\n");

bst.postOrder(bst.getRoot(), (value) => {
    console.log(value);
});

bst.insert(101);
bst.insert(105);
bst.insert(104);
bst.insert(123);
bst.insert(167);
bst.insert(185);
bst.insert(155);

bst.prettyPrint(bst.getRoot());

console.log(bst.isBalanced(bst.getRoot()));

bst.rebalance();

bst.prettyPrint(bst.getRoot());

console.log(bst.isBalanced(bst.getRoot()));

console.log("\n");

bst.levelOrder((value) => {
    console.log(value);
});

console.log("\n");

bst.preOrder(bst.getRoot(), (value) => {
    console.log(value);
});

console.log("\n");

bst.inOrder(bst.getRoot(), (value) => {
    console.log(value);
});

console.log("\n");

bst.postOrder(bst.getRoot(), (value) => {
    console.log(value);
});
