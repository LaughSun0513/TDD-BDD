import {
  shallowMount
} from '@vue/test-utils';
import UndoList from '@/containers/TodoList/components/UndoList';
import {
  findWrapper
} from '@/containers/TodoList/utils';

describe('UndoList 组件测试', () => {
  it('初始化UndoList,参数为[],显示总数count为0,列表无内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: []
      }
    });
    const countEle = findWrapper(wrapper, 'count'); // 显示总数
    const listItems = findWrapper(wrapper, 'item'); // 列表项

    expect(countEle.at(0).text()).toEqual('0');
    expect(listItems.length).toEqual(0);
  });

  it('UndoList,参数为[1,2,3],显示总数count为3,列表长度为3,并且有删除按钮', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'div',
      value: 2
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });
    const countEle = findWrapper(wrapper, 'count'); // 显示总数
    const listItems = findWrapper(wrapper, 'item'); // 列表项
    const deleteBtns = findWrapper(wrapper, 'deleteBtn'); // 删除按钮

    expect(countEle.at(0).text()).toEqual('3');
    expect(listItems.length).toEqual(3);
    expect(deleteBtns.length).toEqual(3);
  });

  it('删除按钮点击时，删除当前点击的项', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'div',
      value: 2
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });
    const curDeleteBtn = findWrapper(wrapper, 'deleteBtn').at(1); // 删除按钮
    curDeleteBtn.trigger('click');

    const deleteEvents = wrapper.emitted().delete;
    // console.log(deleteEvents); // [ [ 1 ] ]

    expect(deleteEvents).toBeTruthy();
    expect(deleteEvents[0][0]).toBe(1);
  });

  it('列表项被点击向外触发status事件', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'div',
      value: 2
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });
    const curItem = findWrapper(wrapper, 'item').at(1);

    curItem.trigger('click');
    const curItemToEdit = wrapper.emitted().status;

    expect(curItemToEdit).toBeTruthy();
    expect(curItemToEdit[0][0]).toBe(1);
  });

  it('列表项被点击变为input框,其余不变,并且input框里显示的值是当前的值', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'input',
      value: 2
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });

    const curItemInput = findWrapper(wrapper, 'input');
    const curItemInputValue = curItemInput.at(0).element.value;

    expect(curItemInput.length).toBe(1);
    expect(curItemInputValue).toBe('2');
  });

  it('input blur失焦时,恢复状态为div', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'input',
      value: 2
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });
    const curItem = findWrapper(wrapper, 'input').at(0);

    curItem.trigger('blur');
    const curItemToResetStatus = wrapper.emitted().reset;

    expect(curItemToResetStatus).toBeTruthy();
  });

  it('input blur失焦时,触发change事件通知父组件ToDoList去保存新内容', () => {
    const initData = [{
      status: 'div',
      value: 1
    }, {
      status: 'input',
      value: 123
    }, {
      status: 'div',
      value: 3
    }]
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: initData
      }
    });
    const curItem = findWrapper(wrapper, 'input').at(0);

    curItem.trigger('change');
    const curItemEditToSave = wrapper.emitted().change;

    expect(curItemEditToSave).toBeTruthy();
    expect(curItemEditToSave[0][0]).toEqual({
      "index": 1,
      "value": "123"
    });
  });
});
