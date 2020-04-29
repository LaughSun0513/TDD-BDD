import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../TodoList';
import Header from '../../components/Header';

describe('TodoList 组件测试', () => { 
    it('初始化时，存放空数组undoList', () => {
        const wrapper = shallow(<TodoList/>);
        const undoList = wrapper.state('undoList');

        expect(undoList).toEqual([]);
    });
    
    it('监听到Header组件的add操作时,传递addUndoItem方法给Header组件', () => {
        const wrapper = shallow(<TodoList />);
        const Header = wrapper.find('Header');
        
        const HeaderAddUndoItem = Header.prop('addUndoItem');
        const TodoListAddUndoItem = wrapper.instance().addUndoItem;

        expect(HeaderAddUndoItem).toEqual(TodoListAddUndoItem);
    });

    it('监听到Header组件的add操作时,新增一项', () => {
        const wrapper = shallow( <TodoList /> );
        const Header = wrapper.find('Header');
        const addFunc = Header.prop('addUndoItem');
        const addMsg = 'new item';
        addFunc(addMsg); // 通过调用方法来模拟新增

        const undoList = wrapper.state('undoList');
        
        expect(undoList.length).toBe(1);
        expect(undoList[0]).toBe(addMsg);
    });
})
