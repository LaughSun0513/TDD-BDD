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
});
