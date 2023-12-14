export const genRandomString = ()=>{
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789";
    const lenString = 7;
    let randomString = ''; 

    for (let i = 0; i < lenString; i++) {
        let randomNum = Math.floor(Math.random() * characters.length);
        randomString += characters.substring(randomNum, randomNum + 1);
    }
    console.log(randomString);
    return randomString;
}