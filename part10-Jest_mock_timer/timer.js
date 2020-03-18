export default (callback)=>{
    console.log('Ready....go!');
    setTimeout(()=>{
        console.log("Time's up111 -- stop!");
        callback();
        setTimeout(()=>{
            console.log("Time's up222 -- stop!");
            callback()
        },3000);
    },3000);
}