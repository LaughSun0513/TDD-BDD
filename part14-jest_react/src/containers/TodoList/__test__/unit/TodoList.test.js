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
        expect(wrapper.state('undoList')).toEqual([{
                status: 'div',
                value: 'new item'
        }]);

        // wrapper.instance().addUndoItem('new item');
        // expect(wrapper.state('undoList').length).toBe(1);

        // wrapper.instance().addUndoItem('new item2');
        // expect(wrapper.state('undoList').length).toBe(2);
        
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

    it('存在UndoList组件时,传递list,deleteItem,', () => {
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

    it('列表项被点击触发changeStatus事件,div ---> input,其余不变,并且input框里显示的值是当前的值', () => {
        const listData = [
            { status: 'div', value: 'Y' },
            { status: 'div', value: 'U' },
            { status: 'div', value: 'X' }
        ]
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: listData
        });
        wrapper.instance().changeStatus(1); // 触发修改状态
        
        const UndoList = wrapper.find('UndoList');
        const changeStatusEvents = UndoList.prop('changeStatus');

        expect(changeStatusEvents).toBeTruthy();
        expect(wrapper.state('undoList')[1]).toEqual({
            status: 'input',
            value: 'U'
        })
    });

    it('input blur失焦时,UndoList触发onInputBlur,恢复状态为div input ---> div', () => {
        const listData = [
            { status: 'input', value: 'Y' },
            { status: 'div', value: 'U' },
            { status: 'div', value: 'X' }
        ]
        const wrapper = shallow(<TodoList />);
        wrapper.setState({
            undoList: listData
        });
        wrapper.instance().onInputBlur(0); // 触发修改状态
        
        const UndoList = wrapper.find('UndoList');
        const onInputBlurEvents = UndoList.prop('onInputBlur');

        expect(onInputBlurEvents).toBeTruthy();
        expect(wrapper.state('undoList')[0]).toEqual({
            status: 'div',
            value: 'Y'
        });
    });
    
    it('input blur失焦时,触发onInputBlurToSave事件，保存新内容', () => {
        const wrapper = shallow(<TodoList />);
        const listData = [
            { status: 'input', value: 'Y' },
            { status: 'div', value: 'U' },
            { status: 'div', value: 'X' }
        ]
        
        wrapper.setState({undoList: listData});
        const value = 'new item'
        wrapper.instance().onInputBlurToSave(0, value); // 触发修改状态
        
        const UndoList = wrapper.find('UndoList');
        const onInputBlurToSaveEvents = UndoList.prop('onInputBlurToSave');

        expect(onInputBlurToSaveEvents).toBeTruthy();
        expect(wrapper.state('undoList')[0]).toEqual({
            ...listData[0],
            value
        });
    });
})
