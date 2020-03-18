export const getData = () => {
    return new Promise(resloved => {
        resloved("(function(){return '123'})()")
    })
}