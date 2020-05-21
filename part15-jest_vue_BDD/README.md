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
