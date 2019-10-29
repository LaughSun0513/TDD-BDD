// 将测试函数直接在浏览器中运行
//--------test1:add-----------
var res = add(3, 7);
var expected = 10;

if (res !== 10) {
    throw Error(`3+7应该等于${expected},结果却是${res}`)
}

//--------test2:minus-----------
var res = minus(3, 3);
var expected = 0;

if (res !== 0) {
    throw Error(`3-3应该等于${expected},结果却是${res}`)
}

//--------test3:multiply-----------
var res = multiply(3, 3);
var expected = 9;

if (res !== 0) {
    throw Error(`3*3应该等于${expected},结果却是${res}`)
}

// 优化测试写法1
function expect(res) {
    return {
        toBe: function (actual) {
            if (res !== actual) {
                throw new Error('预期和实际值不相等'); //提示错误不明显
            }
        }
    }
}
expect(add(3, 7)).toBe(10);
expect(minus(3, 3)).toBe(0);
expect(multiply(3, 3)).toBe(9);


// 优化测试写法2 
function expect(res) {
    return {
        toBe: function (actual) {
            if (res !== actual) {
                throw new Error('预期和实际值不相等');
            }
        }
    }
}
// 通过test函数+try/catch捕获错误信息
function test(desc, fn) {
    try {
        fn();
        console.log(`${desc} 通过测试`)
    } catch (e) {
        console.log(`${desc} 没有通过测试`)
    }
}
test('测试加法 5+5', () => {
    expect(add(5, 5)).toBe(10);
})
test('测试减法 5-5', () => {
    expect(minus(5, 5)).toBe(0);
})
test('测试乘法 5*5', () => {
    expect(multiply(5, 5)).toBe(25);
})


// 优化测试写法3 -- 补充错误信息
function expect(res) {
    return {
        toBe: function (actual) {
            if (res !== actual) {
                throw new Error(`预期和实际值不相等 预期值是${actual} 实际是${res}`); //将错误信息打印出来
            }
        }
    }
}
// 完善错误信息
function test(desc, fn) {
    try {
        fn();
        console.log(`${desc} 通过测试`)
    } catch (e) {
        console.log(`${desc} 没有通过测试 ${e}`) //捕获错误信息e
    }
}
test('测试加法 5+5', () => {
    expect(add(5, 5)).toBe(10);
})
test('测试减法 5-5', () => {
    expect(minus(5, 5)).toBe(0);
})
test('测试乘法 5*5', () => {
    expect(multiply(5, 5)).toBe(25);
})