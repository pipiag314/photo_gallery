export const numberFormatter = (num: number ) => {
    if(!num) return;
    const charArray = num.toString().split("").reverse();
    const formattedArray = charArray.map((char, index) => {
        if(index === charArray.length - 1) {
            return char;
        }
        
        if((index + 1) % 3 === 0) {
            return "," + char;
        }

        return char;
    })
    const formattedNumber = formattedArray.reverse().join("")
    return formattedNumber;
}