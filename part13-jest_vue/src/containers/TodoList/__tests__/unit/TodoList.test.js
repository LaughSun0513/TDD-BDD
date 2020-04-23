import { shallowMount } from '@vue/test-utils';
import TodoList from '@/containers/TodoList/TodoList';
import Header from '@/containers/TodoList/components/Header';
import UndoList from '@/containers/TodoList/components/UndoList';

describe('TodoList 组件测试', () => {
	it('初始化时，undoList为空', () => {
		const wrapper = shallowMount(TodoList);
		const undoList = wrapper.vm.undoList;

		expect(undoList).toEqual([]);
	});

	it('监听到Header组件的add操作时,执行addUndoItem操作,往undoList数组里新增一项', () => {
		// Header组件和undoList组件的联动 -- 属于集成测试
		// const wrapper = shallowMount(TodoList);
		// const header = wrapper.find(Header);
		// const undoList = wrapper.vm.undoList;
		// const newItem = 'add one item';

		// header.vm.$emit('add', newItem);
		// expect(undoList).toEqual([newItem]);

		const wrapper = shallowMount(TodoList);
		wrapper.setData({
			undoList: [1, 2, 3]
		});

		wrapper.vm.addUndoItem(4);
		expect(wrapper.vm.undoList).toEqual([1, 2, 3, 4])
	});

	it('存在UndoList组件时,将初始值undoList数组传递下去变为UndoList组件内的list', () => {
		const wrapper = shallowMount(TodoList);
		const undoList = wrapper.find(UndoList);
		const list = undoList.props('list');

		expect(list).toBeTruthy();
	});

	it('handleDeleteItem被调用时,undoList数组里减少一项', () => {
		const wrapper = shallowMount(TodoList);
		wrapper.setData({
			undoList: [1,2,3]
		})
		wrapper.vm.handleDeleteItem(1);
		const undoList = wrapper.vm.undoList;

		expect(undoList).toEqual([1, 3]);
	});
});
