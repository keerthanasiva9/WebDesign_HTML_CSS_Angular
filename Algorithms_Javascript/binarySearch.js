//Binary Search

// The given array should be in sorted order for the binary search to work
let arr = [11, 23, 65, 77, 88, 90]; //input array
let x = 90; //Element that needs to checked whether present or not

let recsv = function (arr, x, start, end) 
{ 
    // Base Condtion 
    if (start > end) return false; 
   
    // Find the middle element 
    let mid=Math.floor((start + end)/2); 
   
    // Compare mid element with given key x 
    if (arr[mid]===x) return true; 
          
    // If element at mid is greater than x, 
    // search in the left half of mid 
    if(arr[mid] > x)  
        return recsv(arr, x, start, mid-1); 
    else
  
        // If element at mid is smaller than x, 
        // search in the right half of mid 
        return recsv(arr, x, mid+1, end); 
} 
      
if (recsv(arr, x, 0, arr.length-1)) 
    document.write("Element present!<br>"); 
else document.write("Element not found!<br>"); 
   