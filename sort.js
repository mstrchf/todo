function sort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minimumIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] > array[minimumIndex]) {
                minimumIndex = j
            }  
        }
        // swap
        let temp = array[i]
        array[i] = array[minimumIndex]
        array[minimumIndex] = temp
    }
}

let myArray = [11, 97, 22, 53, 8]
sort(myArray)

console.log(myArray)