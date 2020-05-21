import {
  mount
} from '@vue/test-utils';
import {
  findWrapper
} from '@/containers/TodoList/utils';
import TodoList from '@/containers/TodoList/TodoList';
import store from '../../../../store';

describe('TodoList 组件测试', () => {
  it(` 1.用户会在Header输入框输入内容 
       2.用户回车 
       3.列表项新增一项内容
    `, () => { 
      const wrapper = mount(TodoList, {
        store
      });
      const inputEle = findWrapper(wrapper, 'header-input').at(0);
      const msg = 'Yux'
      inputEle.setValue(msg);
      inputEle.trigger('change')
      inputEle.trigger('keyup.enter');
      
      const listItems = findWrapper(wrapper, 'list-item');
      // console.log(listItems)
      // expect(listItems.length).toBe(1);
      // expect(listItems.contains(msg)).toBe(true);
  })
  
});
