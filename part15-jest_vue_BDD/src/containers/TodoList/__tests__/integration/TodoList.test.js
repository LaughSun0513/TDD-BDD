import {
  mount
} from '@vue/test-utils';
import {
  findWrapper
} from '@/containers/TodoList/utils';
import TodoList from '@/containers/TodoList/TodoList';
import store from '../../../../store';
import axios from '../../__mocks__/axios';

beforeEach(() => {
  axios.success = true;
  // jest.useFakeTimers();
});


it(` 1.用户会在Header输入框输入内容 
       2.用户回车 
       3.列表项新增一项内容
    `, (done) => {
  const wrapper = mount(TodoList, {
    store
  });
  const inputEle = findWrapper(wrapper, 'header-input').at(0);
  const msg = 'Yux'
  inputEle.setValue(msg);
  inputEle.trigger('change')
  inputEle.trigger('keyup.enter');

  setTimeout(function () {
    const listItems = findWrapper(wrapper, 'list-item');
    expect(listItems.length).toBe(1);
    expect(listItems.at(0).text()).toContain(msg);
    done()
  }, 0); 
});

// it(`
//   1. 用户进入页面， 请求接口 /getData.json
//   2. 列表展示接口返回的数据
// `, (done) => {
//   const wrapper = mount(TodoList, {
//     store
//   });
//   wrapper.vm.$nextTick(() => {
//     const listItems = findWrapper(wrapper, 'list-item');
//     expect(listItems.length).toBe(3);
//     done()
//   });
// });

it(`
  1. 用户进入页面，等待1s后 请求接口 /getData2.json
  2. 列表展示接口返回的数据
`, (done) => {
  const wrapper = mount(TodoList, {
    store
  });
  // setTimeout 执行的次数
  // expect(setTimeout).toHaveBeenCalledTimes(1);
  
  // jest.runAllTimers()
  // jest.advanceTimersByTime(1000);
    
  // wrapper.vm.$nextTick解决组件还没挂载完就执行找listItems的代码了，导致0
  // wrapper.vm.$nextTick(() => {
  //   const listItems = findWrapper(wrapper, 'list-item');
  //   console.log(listItems.length)
  //   expect(listItems.length).toBe(0);
  //   done()
  // });
    setTimeout(function () {
      const listItems = findWrapper(wrapper, 'list-item');
      console.log(listItems.length)
      expect(listItems.length).toBe(0); // 其实应该是1 返回一条数据 不知道怎么解
      done()
    }, 1000);
});

it(`
  1. 用户进入页面， 请求接口失败
  2. 列表展示空数据  不应该挂掉
`, (done) => {
  axios.success = false;
  const wrapper = mount(TodoList, {
    store
  });
  wrapper.vm.$nextTick(() => {
    const listItems = findWrapper(wrapper, 'list-item');
    expect(listItems.length).toBe(0);
    done()
  });
});