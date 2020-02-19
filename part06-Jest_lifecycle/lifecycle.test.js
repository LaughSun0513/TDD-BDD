import Counter from './lifecycle';

let counter = new Counter();

test('test addOne', () => {
	counter.addOne();
	expect(counter.number).toBe(1);
});
test('test minusOne', () => {
	counter.minusOne();
	expect(counter.number).toBe(0);
});
// 弊端: counter对象中的number会受到互相影响而改变