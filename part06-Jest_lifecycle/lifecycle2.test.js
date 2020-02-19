import Counter from './lifecycle';

let counter = null;
// 通过钩子函数解决执行问题
beforeAll(() => {
	console.log('1----beforeAll')
});
beforeEach(() => {
	counter = new Counter(); // 每次都会执行，解决counter对象互相影响的问题，每次都会创建自己的实例对象
	console.log('2----beforeEach')
});
afterEach(() => {
	console.log('3----afterEach')
});
afterAll(() => {
	console.log('4----afterAll')
});
test('test addOne', () => {
	counter.addOne();
	expect(counter.number).toBe(1);
});
test('test minusOne', () => {
	counter.minusOne();
	expect(counter.number).toBe(-1);
});