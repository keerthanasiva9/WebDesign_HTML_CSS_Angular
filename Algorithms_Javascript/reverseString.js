//String reversal

function revString(str) {
    var splitedString = str.split(""); //split the string object into an array of serparate string using split
    var reversedArr = splitedString.reverse(); //Reverse the splitted string.First becomes last and last becomes first using reverse
    var joinedArr = reversedArr.join(""); //Join the reversed string into one using join
    return joinedArr; 
}
 
console.log(revString("avis anahtreek"));
