import { add, minus, multiply } from './math.js'

test('测试加法 5+5', () => {
    expect(add(5, 5)).toBe(10);
})
test('测试减法 5-5', () => {
    expect(minus(5, 5)).toBe(0);
})
test('测试乘法 5*5', () => {
    expect(multiply(5, 5)).toBe(25);
})

