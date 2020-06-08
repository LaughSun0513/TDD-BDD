import React from 'react';
import { mount } from 'enzyme';
import TodoList from '../../TodoList';
import {
    findWrapper
} from '../../../../utils/testUtils';

import { Provider } from 'react-redux';
import store from '../../../../store/createStore';
import axios from '../../__mocks__/axios';

beforeEach(() => {
    jest.useFakeTimers();
    axios.success = true;
});

it(`
    1. 找到Header组件的input框
    2. 在input框内输入内容
    3. 点击回车，触发change和回车事件
    4. undoList里的列表项新增一项
`, () => {
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    const HeaderInput = findWrapper(wrapper, 'header-input');
    const content = '123';
    HeaderInput.simulate('change', {
        target: {
            value: content
        }
    });
    HeaderInput.simulate('keyUp', {
        keyCode: 13
    });
    const listItems = findWrapper(wrapper, 'item');

    expect(listItems.length).toBe(1);
    expect(listItems.text()).toContain(content);
});

it(`
    1.用户打开页面
    2.展示接口返回的数据
`, (done) => { 
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    console.log('--------同步代码先执行了，没有找到数据就去找list-item了----------');
    
    // 写法一:
    // setTimeout(() => { 
    //     wrapper.update(); // 数据回来wrapper就不是原来那个wrapper了,所以需要更新DOM
    //     console.log(wrapper.debug()); // <li data-test="item" className="item" onClick={[Function: onClick]}>  value from reseful api </li>
    //     const listItems = findWrapper(wrapper, 'item');
    //     expect(listItems.length).toBe(1);
    //     done();
    // },0);
    
    // 写法二:
    process.nextTick(() => {
        wrapper.update();
        const listItems = findWrapper(wrapper, 'item');
        expect(listItems.length).toBe(1);
        console.log('11111111')
        done();
    });
})

it(`
    1.用户打开页面
    2.5s后展示接口返回的数据
`, (done) => { 
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    ); 
    // 1
		jest.runAllTimers(); 

    // 2
		expect(setTimeout).toHaveBeenCalledTimes(1); 
		
    //3
    process.nextTick(() => {
        wrapper.update();
        const listItems = findWrapper(wrapper, 'item');
        expect(listItems.length).toBe(1);
        console.log('2222222')
        done();
    });
})

it(`
    1.用户打开页面请求失败，也可以返回页面
`, (done) => {
    axios.success = false;
    const wrapper = mount(
        <Provider store={store}><TodoList /></Provider>
    );
    process.nextTick(() => {
        wrapper.update();
        const listItems = findWrapper(wrapper, 'item');
        expect(listItems.length).toBe(0);
        done();
    });
})