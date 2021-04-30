// Quick sort

let arr = [51,23,37,16,22,99]; //The array which needs to be sorted

//Function to swap both left and right pointers with each other
function swap(arr, left, right){
    var temp = arr[left]; //assign it to temporary variable
    arr[left] = arr[right];
    arr[right] = temp;
}

function partition(arr, left, right) {
    var pivot   = arr[Math.floor((right + left) / 2)], //middle element of the array
        l       = left, //left pointer
        r       = right; //right pointer
    while (l <= r) {
        while (arr[l] < pivot) {
            l++;
        }
        while (arr[r] > pivot) {
            r--;
        }
        if (l <= r) {
            swap(arr, l, r); //swaping both the elements 
            l++;
            r--;
        }
    }
    return l;
}

function quickSort(arr, left, right) {
    var pos;
    if (arr.length > 1) {
        pos = partition(arr, left, right); //index returned from partition
        if (left < pos - 1) { //If there are more elements on the left side of the pivot
            quickSort(arr, left, pos - 1);
        }
        if (pos < right) { //If there are more elements on the right side of the pivot
            quickSort(arr, pos, right);
        }
    }
    return arr;
}
//call the quick sort function and pass arguments
let sortedArray = quickSort(arr, 0, arr.length - 1);
console.log(sortedArray); //prints the output in the sorted order