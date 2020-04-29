import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../TodoList';

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
        expect(HeaderAddUndoItem).toBeTruthy();
    });

    it('监听到Header组件的add操作时,新增一项', () => {
        const wrapper = shallow(<TodoList />);
        wrapper.instance().addUndoItem('new item');
        expect(wrapper.state('undoList').length).toBe(1);

        wrapper.instance().addUndoItem('new item2');
        expect(wrapper.state('undoList').length).toBe(2);
        
        /* 集成测试
            const Header = wrapper.find('Header');
            const addFunc = Header.prop('addUndoItem');
            const addMsg = 'new item';
            addFunc(addMsg); // 通过调用方法来模拟新增

            const undoList = wrapper.state('undoList');

            expect(undoList.length).toBe(1);
            expect(undoList[0]).toBe(addMsg);
        */
    });

    it('存在UndoList组件时,将初始值undoList数组传递下去变为UndoList组件内的list,并传递deleteItem方法', () => {
        const wrapper = shallow( <TodoList /> );
        
        const UndoList = wrapper.find('UndoList');
        const list = UndoList.prop('list');
        const deleteItem = UndoList.prop('deleteItem');
        
        expect(list).toBeTruthy();
        expect(deleteItem).toBeTruthy();
    });

    it('deleteItem方法被调用 undoList数据项被删除', () => {
        const wrapper = shallow( < TodoList /> );
        const data = [1, 2, 3];
        wrapper.setState({
            undoList:data
        })
        wrapper.instance().deleteItem(1);
        expect(wrapper.state('undoList')).toEqual([1,3]);
    });
})
