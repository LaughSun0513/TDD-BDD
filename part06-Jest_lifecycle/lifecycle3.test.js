import Counter from './lifecycle';

describe('测试Counter类', () => {
	console.log('describe 1')
	let counter = null;

	beforeAll(() => {
		console.log('1------beforeAll')
	});
	beforeEach(() => {
		counter = new Counter();
		console.log('2------beforeEach')
	});
	afterEach(() => {
		console.log('3------beforeEach')
	});
	afterAll(() => {
		console.log('4------afterAll')
	});

	describe('测试加法', () => {
		console.log('describe 2')
		beforeEach(() => {
			console.log('5------beforeEach add')
		});
		test.only('test addOne', () => {
			counter.addOne();
			expect(counter.number).toBe(1);
		});
		test('test addTwo', () => {
			counter.addTwo();
			expect(counter.number).toBe(2);
		});
	});


	describe('测试减法', () => {
		console.log('describe 3');
		beforeEach(() => {
			console.log('6------beforeEach minus');
		});
		test('test minusOne', () => {
			counter.minusOne();
			expect(counter.number).toBe(-1);
		});
		test('test minusTwo', () => {
			counter.minusTwo();
			expect(counter.number).toBe(-2);
		});
	});


});
// 单独测试这个文件就可以看到describe
/* 1.describe-- 对测试用例分组
	测试Counter类
		测试加法
		✓ test addOne (5ms)
		✓ test addTwo (2ms)
		测试减法
		✓ test minusOne (3ms)
		✓ test minusTwo (1ms)
*/

/* 2. 每个describe可以有自己的钩子函数，有自己的作用域
		尽量把测试用例写在钩子函数里面，不要写在describe内，否则出现执行顺序的问题
		console.log lifecycle3.test.js:4
				describe 1

		console.log lifecycle3.test.js:22
			describe 2

		console.log lifecycle3.test.js:38
			describe 3

		console.log lifecycle3.test.js:8
			1------beforeAll

		console.log lifecycle3.test.js:12
			2------beforeEach

		console.log lifecycle3.test.js:24
			5------beforeEach add

		console.log lifecycle3.test.js:15
			3------beforeEach

		console.log lifecycle3.test.js:18
			4------afterAll
*/
/* 3. test.only 针对单个测试用例进行测试，排除其他测试用例的干扰
		测试Counter类
		测试加法
		✓ test addOne (9ms)
		○ skipped test addTwo
		测试减法
		○ skipped test minusOne
		○ skipped test minusTwo
*/