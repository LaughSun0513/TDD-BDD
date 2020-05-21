# BDD测试-VUE	

### BDD
- mount挂载 深层挂载
- 行为驱动 集成测试
```js
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
      
      expect(listItems.length).toBe(1);
      expect(listItems.contains(msg)).toBe(true);
  })
```
### VUEX
 - npm i install vuex --save
 ```js
 // store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		inputValue: ''
	},
	mutations: {
		changeInputValue(state, payload) {
			state.inputValue = payload;
		}
	}
});

export default store;
```
```js
import Vue from 'vue';
import store from './store';

new Vue({
	render: h => h(App),
	store
}).$mount('#app');
```
```js
// Header.vue
import { mapState, mapMutations } from 'vuex';
export default {
	name: 'Header',
	computed: {
		...mapState({
			inputValue: state => state.inputValue
		})
	},
	methods: {
		addTodoItem() {
			if (this.inputValue) {
				this.$emit('add', this.inputValue);
				this.changeInputValue('');
			}
		},
		...mapMutations(['changeInputValue'])
	}
};
```
### 异步代码测试
 - npm i axios --save
 - wrapper.vm.$nextTick + done 异步代码执行

#### case1
 ```js
 mounted() {
	axios
		.get('/getData.json')
		.then(res => {
			this.undoList = res.data;
		})
		.catch(e => {
			console.log(e);
		});
 }
 ```
 ```js
 // __mocks__ 模拟请求
 it(`
  1. 用户进入页面， 请求接口 /getData.json
  2. 列表展示接口返回的数据
`, (done) => {
  const wrapper = mount(TodoList, {
    store
  });
  wrapper.vm.$nextTick(() => {
    const listItems = findWrapper(wrapper, 'list-item');
    expect(listItems.length).toBe(3);
    done()
  });
});
 ```

 #### case2 -- setTimeout 5s等延迟执行axios的异步代码情况
 - jest.useFakeTimers()
	- jest.runAllTimers()
	- jest.advanceTimersByTime
- toHaveBeenCalledTimes
- wrapper.vm.$nextTick + done
 ```js
setTimeout(() => {
	axios
		.get('/getData2.json')
		.then(res => {
			this.undoList = res.data;
		})
		.catch(e => {
			console.log(e);
		});
}, 5000);
 ```
 ```js
 beforeEach(() => {
   jest.useFakeTimers()
 });
 it(`
  1. 用户进入页面，等待1s后 请求接口 /getData2.json
  2. 列表展示接口返回的数据
`, (done) => {
  const wrapper = mount(TodoList, {
    store
  });
  // setTimeout 执行的次数
  expect(setTimeout).toHaveBeenCalledTimes(1);
  
  jest.runAllTimers()
  // jest.advanceTimersByTime(1000);
    
  // wrapper.vm.$nextTick解决组件还没挂载完就执行找listItems的代码了，导致0
  wrapper.vm.$nextTick(() => {
    const listItems = findWrapper(wrapper, 'list-item');
    console.log(listItems.length)
    expect(listItems.length).toBe(1);
    done()
  });
});
 ```
#### case3 -- 错误情况
 - 根据this.success判断
```js
export default {
	get(url) {
		return new Promise((resolve, reject) => {
			if (url === '/getData.json' && this.success) {
				resolve(initUndoList);
			} 
			else if (url === '/getData2.json' && this.success) {
				resolve(initUndoList2);
			} 
			else {
				reject(new Error());
			}
		});
	}
};
```
```js
beforeEach(() => {
  axios.success = true;
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
```
### 路由页面的代码组织
- npm i vue-router --save
- vue-router
- Not-Found页面
- 目录结构规整
```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		component: TodoList
	},
	{
		path: '*',
		component: NotFoundPage
	}
];
const router = new VueRouter({
	routes
});
new Vue({
	render: h => h(App),
	store,
	router
}).$mount('#app');
```
```js
// App.vue  <router-view />
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>
```