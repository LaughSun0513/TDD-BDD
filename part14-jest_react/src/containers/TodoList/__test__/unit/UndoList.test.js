import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../components/UndoList';
import {findWrapper} from '../../../../utils/testUtils';

describe('UndoList 组件测试', () => { 
  it('初始化UndoList,存放数组list为[],显示总数count为0,列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]}/>);
    const countEle = findWrapper(wrapper, 'count'); // 显示总数
    const listItems = findWrapper(wrapper, 'item'); // 列表项

    expect(countEle.text()).toEqual('0');
    expect(listItems.length).toEqual(0);
  });
    
  it('UndoList,参数为[1,2,3],显示总数count为3,列表长度为3,并且有删除按钮', () => {
    const listData = [
      { status: 'div', value: 'Y' },
      { status: 'div', value: 'U' },
      { status: 'div', value: 'X' }
    ]
    const wrapper = shallow(<UndoList list={listData}/>);
    const countEle = findWrapper(wrapper, 'count'); // 显示总数
    const listItems = findWrapper(wrapper, 'item'); // 列表项
    const deleteBtns = findWrapper(wrapper, 'deleteBtn'); // 删除按钮
    
    expect(countEle.text()).toBe('3');
    expect(listItems.length).toEqual(3);
    expect(deleteBtns.length).toEqual(3);
  });
    
  it('删除按钮点击时，删除当前点击的项', () => {
    const listData = [
      { status: 'div', value: 'Y' },
      { status: 'div', value: 'U' },
      { status: 'div', value: 'X' }
    ]
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList deleteItem={fn} list={listData}/>);
    const deleteBtns = findWrapper(wrapper, 'deleteBtn'); // 删除按钮
    
    deleteBtns.at(index).simulate('click', {
      stopPropagation: () => { }
    });
    expect(fn).toHaveBeenLastCalledWith(index);
  });

  it('列表项被点击向外触发changeStatus事件', () => {
      const listData = [
        { status: 'div', value: 'Y' },
        { status: 'div', value: 'U' },
        { status: 'div', value: 'X' }
      ]
      const fn = jest.fn();
      const index = 1;
      const wrapper = shallow(< UndoList changeStatus={fn} list={listData}/>);
      const listItems = findWrapper(wrapper, 'item');
      listItems.at(index).simulate('click');
      
      expect(fn).toHaveBeenLastCalledWith(index);
  });

  it('当状态是input,展示input,并且input框里显示的值是当前的值', () => {
      const listData = [
        { status: 'input', value: 'Y' },
        { status: 'div', value: 'U' },
        { status: 'div', value: 'X' }
      ]
      const wrapper = shallow(< UndoList list={listData}/>);
      const inputEle = findWrapper(wrapper, 'input');
      expect(inputEle.length).toBe(1);
  });

  it('input blur失焦时,触发父级onInputBlur', () => {
      const listData = [
        { status: 'input', value: 'Y' },
        { status: 'div', value: 'U' },
        { status: 'div', value: 'X' }
      ]
      const fn = jest.fn();
      const wrapper = shallow(<UndoList onInputBlur={fn} list={listData}/>)
      const inputEle = findWrapper(wrapper, 'input');
      inputEle.simulate('blur');
      
      expect(fn).toHaveBeenLastCalledWith(0);
  });

  it('input blur失焦时,触发change事件通知父组件ToDoList去保存新内容', () => {
      const listData = [
        { status: 'input', value: 'Y' },
        { status: 'div', value: 'U' },
        { status: 'div', value: 'X' }
      ]
      const fn = jest.fn();
      const newValue = '新内容'
      const wrapper = shallow(<UndoList onInputBlurToSave={fn} list={listData}/>)
      const inputEle = findWrapper(wrapper, 'input');
      inputEle.simulate('change', {
        target: {
          value: newValue
        }
      });
      
      expect(fn).toHaveBeenLastCalledWith(0, newValue);
  });
})
