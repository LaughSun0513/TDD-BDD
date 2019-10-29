function add(a, b) {
    return a + b
}
function minus(a, b) {
    return a - b 
}
function multiply(a, b) {
    return a * b
}
// 解决浏览器无法解析module的问题
// 测试代码走try里面
try{
    module.exports = {
        add,
        minus,
        multiply
    }
}catch(e){}
