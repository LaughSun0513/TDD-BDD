test('toBe 匹配器', () => {
    expect(10).toBe(10);
});
test('toEqual 匹配器 比较内容', () => {
    const a = {
        one: 1
    }
    expect(a).toEqual({
        one: 1
    });
});
test('toBeNull 匹配器 ', () => {
    const a = null
    expect(a).toBeNull();
});
test('toBeUndefined 匹配器 ', () => {
    const a = undefined
    expect(a).toBeUndefined();
});
test('toBedefined 匹配器 ', () => {
    const a = null
    expect(a).toBeDefined();

    const b = 1
    expect(b).toBeDefined();
});
test('toBeTruthy 匹配器 ', () => {
    const a = true
    expect(a).toBeTruthy();

    const b = 1
    expect(b).toBeTruthy();
});
test('toBeFalsy 匹配器 ', () => {
    const a = false
    expect(a).toBeFalsy();

    const b = 0
    expect(b).toBeFalsy();
});
test('not 匹配器 ', () => {
    const a = true
    expect(a).not.toBeFalsy();
});

//数字相关的
test('toBeGreaterThan ', () => {
    const a = 10;
    expect(a).toBeGreaterThan(9);
});
test('toBeLessThan ', () => {
    const a = 10;
    expect(a).toBeLessThan(11);
});
test('toBeGreaterThanOrEqual ', () => {
    const a = 10;
    expect(a).toBeGreaterThanOrEqual(10);
    expect(a).toBeGreaterThanOrEqual(9);
});
test('toBeCloseTo ', () => {
    const a = 0.1;
    const b = 0.2;
    expect(a + b).toBeCloseTo(0.3);
});

// 字符串
test('toMatch ', () => {
    const a = 'hello';
    expect(a).toMatch('ll');
    expect(a).toMatch(/ll/);
});

// Array Set
test('toContain ', () => {
    const a = ['a','b','c']
    expect(a).toContain('c');

    const b = new Set(a);
    expect(b).toContain('b');
});

// 异常
const throwError = () =>{
    throw new Error('this is a new Error');
}
test('toThrow',()=>{
    expect(throwError).toThrow(/this is a new Error/)
})