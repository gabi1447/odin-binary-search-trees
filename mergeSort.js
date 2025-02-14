export function mergeSort(array) {
    // base case
    if (array.length === 1) {
        return array;
    }

    // recursive call
    const [left, right] = splitArray(array);
    const leftSorted = mergeSort(left);
    const rightSorted = mergeSort(right);
    return merge(leftSorted, rightSorted);
}

function merge(array1, array2) {
    let sortedArray = [];

    let array1Index = 0;
    let array2Index = 0;

    while (array1Index < array1.length && array2Index < array2.length) {
        if (array1[array1Index] < array2[array2Index]) {
            sortedArray.push(array1[array1Index]);
            array1Index++;
            continue;
        } else {
            sortedArray.push(array2[array2Index]);
            array2Index++;
            continue;
        }
    }

    if (array1Index >= array1.length) {
        const restOfArray = array2.slice(array2Index);
        sortedArray = sortedArray.concat(restOfArray);
    } else {
        const restOfArray = array1.slice(array1Index);
        sortedArray = sortedArray.concat(restOfArray);
    }

    return sortedArray;
}

function splitArray(array) {
    const arrayLength = array.length;
    let middle = arrayLength / 2;
    middle = middle % 2 === 0 ? middle : Math.round(middle);
    const leftArray = array.slice(0, middle);
    const rightArray = array.slice(middle);
    return [leftArray, rightArray];
}
