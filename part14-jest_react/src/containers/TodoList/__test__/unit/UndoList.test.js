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
    const lisData = [1,2,3];
    const wrapper = shallow(<UndoList list={lisData}/>);
    const countEle = findWrapper(wrapper, 'count'); // 显示总数
    const listItems = findWrapper(wrapper, 'item'); // 列表项
    const deleteBtns = findWrapper(wrapper, 'deleteBtn'); // 删除按钮
    
    expect(countEle.text()).toBe('3');
    expect(listItems.length).toEqual(3);
    expect(deleteBtns.length).toEqual(3);
  });
    
  it('删除按钮点击时，删除当前点击的项', () => {
    const lisData = ['Y', 'U', 'X'];
    const fn = jest.fn();
    const index = 1;
    const wrapper = shallow(<UndoList deleteItem={fn} list={lisData}/>);
    const deleteBtns = findWrapper(wrapper, 'deleteBtn'); // 删除按钮
    
    deleteBtns.at(index).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(index);
  });
})
