export const genRandomString = (lenString: number)=>{
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789abcdefghijklmnopqrstuvwxyz";
    let randomString = ''; 

    for (let i = 0; i < lenString; i++) {
        let randomNum = Math.floor(Math.random() * characters.length);
        randomString += characters.substring(randomNum, randomNum + 1);
    }
    console.log(randomString);
    return randomString;
}