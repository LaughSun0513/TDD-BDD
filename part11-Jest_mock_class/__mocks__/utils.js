const Utils = jest.fn(()=>{
    console.log('1111111')
});
Utils.prototype.a = jest.fn(()=>{
    console.log('222222')
});
Utils.prototype.b = jest.fn(()=>{
    console.log('333333')
});
export default Utils;