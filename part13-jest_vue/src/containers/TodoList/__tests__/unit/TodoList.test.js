import { shallowMount } from '@vue/test-utils'
import TodoList from '@/containers/TodoList/TodoList'
import Header from '@/containers/TodoList/components/Header'


describe('TodoList 组件测试', () => {
	it('初始化时，undoList为空', () => {
		const wrapper = shallowMount(TodoList);
		const undoList = wrapper.vm.undoList;

		expect(undoList).toEqual([]);
	});

	it('监听到Header组件的add操作时,执行addItem操作,往undoList数组里新增一项', () => {
		const wrapper = shallowMount(TodoList);
		const header = wrapper.find(Header);
		const undoList = wrapper.vm.undoList;
		const newItem = 'add one item';

		header.vm.$emit('add', newItem);
		// wrapper.vm.addUndoItem('add one item');
		expect(undoList).toEqual([newItem]);
	});
})