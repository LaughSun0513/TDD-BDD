import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import {findWrapper} from '../../../../utils/testUtils';

describe('Header 组件测试', () => { 
  it('初始化Header,包含input框', () => {
    const wrapper = shallow(<Header value=""/>);
    const inputEle = findWrapper(wrapper, 'header-input');

    expect(inputEle).toExist();
  });

  it('input框初始值为空', () => {
    const wrapper = shallow(<Header />);
    const inputEle = findWrapper(wrapper, 'header-input');
    const inputValue = inputEle.prop('value');

    expect(inputValue).toBe('');
  });

  it('input框值发生变化,用户输入时,数据跟着变', () => {
    const wrapper = shallow(<Header />);
    const inputEle = findWrapper(wrapper, 'header-input');
    const userInputMsg = 'inputMsg';

    inputEle.simulate('change', {
      target: {
        value: userInputMsg
      }
    });

    // 对数据测试 -- 适合单元测试
    expect(wrapper.state('value')).toEqual(userInputMsg);

    // 对新的DOM测试 -- 适合集成测试
    // const newInputEle = wrapper.find('[data-test="header-input"]');
    // expect(newInputEle.prop('value')).toEqual(userInputMsg);
  });

  it('input框输入回车，无内容时没反应', () => {
    const keyUpEvents = jest.fn();
    const wrapper = shallow(<Header addUndoItem={keyUpEvents}/>);
    const inputEle = findWrapper(wrapper, 'header-input');
    wrapper.setState({
      value: ''
    });

    inputEle.simulate('keyUp', {
      keyCode:13
    });

    expect(keyUpEvents).not.toHaveBeenCalled();
  });

  it('input框输入回车，有内容时,向外触发事件，清空inputValue', () => {
    const keyUpEvents = jest.fn();
    const wrapper = shallow(<Header addUndoItem={keyUpEvents}/>);
    const inputEle = findWrapper(wrapper, 'header-input');
    const userInputMsg = 'Yux';

    wrapper.setState({
      value: userInputMsg
    });

    inputEle.simulate('keyUp', {
      keyCode:13
    });

    expect(keyUpEvents).toHaveBeenCalled();
    expect(keyUpEvents).toHaveBeenLastCalledWith(userInputMsg);
    
    const newInputEle = findWrapper(wrapper, 'header-input');
    expect(newInputEle.prop('value')).toBe('');
  });

  it('Header样式保存,变化后提示', () => {
    const wrapper = shallow(<Header/>);

    expect(wrapper).toMatchSnapshot();
  });
})
