# TDD-BDD

## 测试种类

- 单元测试:独立的功能单元进行测试
- 集成测试
- 端到端测试
- 回归测试
- 性能测试
- 压力测试

### Jest

速度快
API 简单
易配置
隔离性好
监控模式
IDE 整合
Snapshot
多项目并行
覆盖率
Mock 丰富

### Jest 的使用

#### Jest 的配置

- 如何配合 babel 使用 ES6
- npx jest --init 揭开 jest 配置文件
- jest --coverage 查看测试覆盖率

#### Jest 的匹配器

- toBe
- toEqual
- toBeNull
- toBeUndefined
- toBedefined
- toBeTruthy
- toBeFalsy
- not
- toBeGreaterThan
- toBeCloseTo
- toMatch
- toContain
- toThrow

#### Jest 下的命令行模式介绍

```txt
jest --watchAll 模式
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

- f 模式: Press f to run only failed tests

  - 只针对错误的用例再跑一遍，而不是所有的

- o 模式: Press o to only run tests related to changed files

  - 前提条件: 必须配合 git
    - 先 git init 初始化仓库
    - 再 git add . 将所有文件加入
    - 再 jest --watchAll 进入 o 模式 只会对当前修改的文件生效
  - 存在多个 test 文件时，再跑一遍当前修改文件里的用例(jest --watch 默认为 o 模式)

- p 模式: Press p to filter by a filename regex pattern

  - 可以根据正则匹配符合的文件 pattern › match2(只找命中 match2 的测试文件，如 match2.test.js)

- t 模式: Press t to filter by a test name regex pattern.
  - 可以根据正则匹配符合的测试用例 pattern › toBe (只找所有测试文件中命中 toBe 的测试用例)

```txt
jest --watch 模式
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

- a 模式: Press a to run all tests
  - 运行所有的测试用例(等价于 jest --watchAll)

#### Jest 异步请求

- 回调函数 添加 done
- Promise 接口
  - return then/catch
  - resolves.toMatchObject/rejects.toThrow
  - async/await

#### Jest 钩子函数

##### 钩子函数

- beforeAll / AfterAll
- beforeEach / AfterEach

##### describe 关键字 -- 对测试用例进行分组

- describe 可以对测试用例进行分组
- describe 有自己的作用域，每个 describe 可以有自己的钩子函数
- test.only 针对单个测试用例进行测试，排除其他测试用例的干扰

#### Jest 中的 Mock 功能

- jest.fn & jest.fn.mock
  - mockReturnValue
  - mockImplementation
  - mockImplementationOnce
  - mockImplementation
  - mockReturnThis
- jest.mock
  - mockResolvedValueOnce

#### Jest 中的 snapshot 功能

- jest 自带的 snapshot 功能 toMatchSnapshot(会生成`__snapshots__`文件夹)
  - 每次更新配置可通过 u 来一次性更新快照
  - 也可以通过 i 来交互性一个个更新
  - 对于动态的配置，例如时间，可以对 toMatchSnapshot 传递参数，例如`expect.any(Date)`
- 利用 prettier 在代码中执行 toMatchInlineSnapshot(执行测试，快照会生成在行内代码中)

#### Jest 中的 Mock 功能 2

- 可通过 jest.mock(`__mock__/fileName`)的方式来修改测试文件的 mock 数据
  - 开启`jest.config.js`中的`automock: true`也会默认先去寻找`__mock__/fileName`下的测试函数
- 如果在`__mock__/fileName`没有找到要测试的函数，可以通过`jest.requireActual`寻找源文件

#### Jest 中的测试时间的 Mock 功能

- jest.useFakeTimers() 开启假时间
  - jest.runAllTimers() 快速过时间 达到模拟等待时间的过程
  - jest.runOnlyPendingTimers() 只执行已经创建的时间函数
  - jest.advanceTimersByTime(3000) 快进
- toHaveBeenCalledTimes 执行次数

#### Jest 中的 Mock 类的实现

- 对单个类的引用函数的测试是单元测试，顺便测一下这个类内部的方法叫做集成测试
- jest.mock()引用类，将类里面的方法转换成了 jest.fn()
- 也可以在`__mocks__`里面去模拟 jest.mock 的实现
- 在 jest.mock(path,callback）中可以通过 callback 里的实现去模拟`__mocks__`里的功能，同时进行扩展

```js
jest.mock("./utils", () => {
  const Utils = jest.fn(() => {
    console.log("3333");
  });
  Utils.prototype.a = jest.fn(() => {
    console.log("222222");
  });
  Utils.prototype.b = jest.fn(() => {
    console.log("11111");
  });
  return Utils;
});
```

#### Jest 中的 DOM 测试

- jest 运行在 node 环境，因为自己实现里一套 DOM API（jsDOM），所以可以直接使用 DOM 操作

### TDD--Test Driven Development

#### 开发流程（Red-Green Development）

- 编写测试用例
- 运行测试，测试用例无法通过测试
- 编写代码，使测试用例通过测试
- 优化代码，完成开发
- 重复上述步骤

#### 优势

- 长期减少回归 bug
- 代码质量更好（组织，可维护性）
- 测试覆盖率高
- 错误测试代码不容易出现

###  jest-vue

- sudo npm install @vue/cli -g
```
Vue CLI v4.3.0
? Please pick a preset: Manually select features 手动配置
? Check the features needed for your project: Babel, CSS Pre-processors, Linter, Unit
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Stylus
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save, Lint and fix on commit
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files 单独的文件
? Save this as a preset for future projects? No
? Pick the package manager to use when installing dependencies: NPM
```
- jest.config.js默认配置@vue/cli-plugin-unit-jest
  - testMatch配置测试目录,修改根目录为`__test__`下的`unit`文件夹下

##### @vue/test-utils的好处和使用
- 可以对DOM的变化进行测试
- 可以对DOM的数据进行访问测试(原生DOM只有操作DOM的能力，有局限性) -- 解决: @vue/test-util工具
- API https://vue-test-utils.vuejs.org/zh/api/#shallowmount
    - 组件的渲染方式 生成wrapper容器
      - shallowMount | mount ....
    - wrapper的APIs
      - find | findAll | props | setProps...
- 复习知识点: toMatchSnapshot 对组件进行渲染

```js
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";

describe("HelloWorld.vue", () => {
	it("DOM测试只能检测UI层面的变化 不方便", () => {
		const root = document.createElement("div");
		root.className = "root";
		document.body.appendChild(root);
		new Vue({
			render: h => (
				HelloWorld, {
					props: {
						msg: "Yux"
					}
				}
			)
		}).$mount(".root");
		console.log(document.body.innerHTML);
		expect(document.getElementsByClassName('hello').length).toBe(1);
	});

	it("利用shallowMount浅渲染HelloWorld组件,不渲染HelloWorld子组件,适合单元测试", () => {
		const msg = "hahahah";
		// shallowMount浅渲染组件
		const wrapper = shallowMount(HelloWorld, {
			propsData: {
				msg
			}
		});

		// wrapper上的方法 props/findAll/setProps
		expect(wrapper.props('msg')).toEqual(msg);
		expect(wrapper.findAll('.myTitle').length).toBe(1);

		wrapper.setProps({
			msg: 'Yux'
		});
		expect(wrapper.props('msg')).toEqual('Yux');
	});

	it("复习:利用toMatchSnapshot快照进行组件的渲染", () => {
		const wrapper = shallowMount(HelloWorld, {
			propsData: {
				msg: 'Yux-snapshot'
			}
		});
		expect(wrapper).toMatchSnapshot();
	});
});
```
##### TodoList组件(主组件)
1. 初始化TodoList组件,由Header组件 + UndoList组件 组成
2. Header组件负责输入，UndoList组件负责展示和编辑
3. 初始化放任务的数组undoList，传递给UndoList组件
    - 初始化时，undoList为空
4. 监听header组件的add事件，触发自身的addUndoItem操作，新增一项
    - 通过`header.vm.$emit('add', newItem);`(header组件联动TodoList组件，属于集成测试)
    - 单元测试 可以模拟设置值`wrapper.setData()`
5. 通过监听UndoList组件的delete事件触发自身handleDeleteItem操作，减少一项
6. 修改为编辑态，通过监听 UndoList 组件的 status 事件触发自身 changeStatus 操作，修改当前下标项
   - status 'div' ---> status 'input'
7. 修改为显示态，通过监听到 UndoList 组件的 reset 事件后,修改当前 item 的状态为 div  
   - status 'input' ---> status 'div'
8. 保存新内容，通过监听到 UndoList 组件的 change 事件，changeItemValue 事件修改当前 item 的内容

##### Header 组件的 TDD 驱动开发（子组件，负责输入）
1. 初始化 Header 组件,包含 input 框

    - 通过 `data-test` 给要初始化的 DOM 节点打标记，`wrapper.findAll` 来寻找
    - 通过`exists()`方法证明是否存在

2. input 框初始值为空
    - 通过`wrapper.vm.inputValue`获取input值

3. input 框值发生变化,v-model 数据跟着变
    - 通过`setValue`设置值

4. input 框输入回车，无内容时没反应
    - 通过`trigger`触发动作
    - 通过`wrapper.emitted().fn`触发`fn`自定义方法

5. input 框输入回车，有内容时,向外触发事件，清空 inputValue
6. Header 样式保存,变化后提示
    - 通过`toMatchSnapshot()`保存设置好的样式，防止样式变化

##### UndoList 组件（子组件，负责展示和编辑）
1. 初始化UndoList,参数为[],显示总数count为0,列表无内容
    - 设置初始值`propsData`
2. UndoList,参数为[1,2,3],显示总数count为3,列表长度为3,并且有删除按钮
3. 删除按钮点击时，删除当前点击的项
    - `wrapper.emitted().delete` 触发delete事件
4. 编辑功能 - 将扁平的数据结构扩展
    ```js
    {
        status: 'div',
        value: 3
    }

    --->
    {
        status: 'input',
        value: 3
    }
    ```
    -   4.1 修改为编辑态，列表项被点击向外触发 status 事件，修改 status 'div' ---> status 'input'
    -   4.2 修改为编辑态，列表项被点击变为 input 框,其余不变,并且 input 框里显示的值是当前的值
    -   4.3 修改为显示态, input blur 失焦时,恢复状态 status 'input' ---> status 'div'
    -   4.4 保存新内容, input blur 失焦时,触发 change 事件通知父组件 ToDoList 去保存新内容


### 测试覆盖率

1. 在`jest.config.js`配置属性

```js
collectCoverageFrom: [
	'src/**/*.{js,vue}',
	'!**/node_modules/**', // 排除node_modules
	'!**/vendor/**', // 排除vendor
	'!src/**/App.vue', // 排除App.vue
	'!src/**/main.js' // 排除main.js
];
```

2. 配置`package.json`

```js
 "coverage": "vue-cli-service test:unit --coverage"
```

3. 执行`npm run coverage`
4. 结果

```
---------------------|----------|----------|----------|----------|-------------------|
File                 |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
---------------------|----------|----------|----------|----------|-------------------|
All files            |      100 |      100 |      100 |      100 |                   |
 TodoList            |      100 |      100 |      100 |      100 |                   |
  TodoList.vue       |      100 |      100 |      100 |      100 |                   |
 TodoList/components |      100 |      100 |      100 |      100 |                   |
  Header.vue         |      100 |      100 |      100 |      100 |                   |
  UndoList.vue       |      100 |      100 |      100 |      100 |                   |
 TodoList/utils      |      100 |      100 |      100 |      100 |                   |
  index.js           |      100 |      100 |      100 |      100 |                   |
---------------------|----------|----------|----------|----------|-------------------|
```

## jest-vue 总结

-   TDD 代码质量高
-   单元测试 测试覆盖率高 代码量大 业务耦合度高 过于独立


## jest-react

### 初始化项目
- npm i create-react-app -g
- npx create-react-app <ProjectName>
- npm run eject 打开所有隐藏配置
- 将`package.json`里`jest`属性移入`jest.config.js`内,也可以放在里面

### Enzyme工具 -- 类似Vue里的@vue/test-utils
- React 16.8后，使用`@testing-library/react`来测试 hooks 相关的内容
- ReactDOM测试，可以测试DOM显示，但是DOM变化就需要手动更新，无法测试Props和State的数据变化
- React 16.8前 , 可以引用`Enzyme` 提供一些抓组件的方法
    - [Enzyme API官网](https://enzymejs.github.io/enzyme/docs/installation/)
    - npm i --save-dev enzyme enzyme-adapter-react-16
    - 引入Enzyme
    ```js
        import Enzyme, { shallow } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';
        Enzyme.configure({
            adapter: new Adapter()
        });

        it('引用Enzyme 测试 APP组件 是否存在', () => {
            const wrapper = shallow(<App />);
            const container = wrapper.find('[data-test="App"]');
            console.log(wrapper.debug());

            expect(container.length).toBe(1);
            expect(container.prop("name")).toBe("Yux");
        });
    ```
- 引用`jest-enzyme` 提供一些toExist的匹配器，使用更简洁的测试语法
     - 初始化jest-enzyme 在 `jest.config.js`内
     ```js
        setupFilesAfterEnv: [
            "<rootDir>/node_modules/jest-enzyme"
        ]
     ```
     ```js
        import Enzyme, { shallow } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';
        Enzyme.configure({
            adapter: new Adapter()
        });

        it('引用Enzyme 测试 APP组件 是否存在', () => {
            const wrapper = shallow(<App />);
            const container = wrapper.find('[data-test="App"]');

            expect(container).toExist();
            expect(container).toHaveProp("name", "Yux");
        });
    ```

- 通过预加载Enzyme，不需要在每个测试用例里初始化Enzyme
    ```js
        // setupTests.js
        import Enzyme from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';

        Enzyme.configure({
            adapter: new Adapter()
        });

        //jest.config.js
        setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
    ```


### Header组件的TDD
- 初始化Header,包含input框
    - `shallow()`方法挂载组件
    - `wrapper.find()`寻找组件
- input框初始值为空
    - `element.prop()`寻找input属性上的值
- input框值发生变化,用户输入时,数据跟着变
     - `element.simulate()`触发事件
     - `wrapper.state()` 获取Header组件上的state值
- input框输入回车，无内容时没反应
    - `toHaveBeenCalled()`
- input框输入回车，有内容时,向外触发事件，清空inputValue
    - `toHaveBeenLastCalledWith()`
- Header样式保存,变化后提示
    - `toMatchSnapshot()`

### TodoList 组件的TDD(父组件)
- 初始化时，存放空数组undoList
- 监听到Header组件的add操作时,传递addUndoItem方法给Header组件
    - 获取自身实例上的方法`wrapper.instance().funcName`
- 监听到Header组件的add操作时,新增一项
    - 通过获取自身add方法，调用-->模拟add事件
- 存在UndoList组件时,将初始值undoList数组传递下去变为UndoList组件内的list,并传递deleteItem方法
    - `UndoList.prop('list');`获取数组list
    - `UndoList.prop('deleteItem')` 获取deleteItem方法
- deleteItem方法被调用 undoList数据项被删除
    - `wrapper.instance().deleteItem(1);` 模拟调用deleteItem方法
- 列表项被点击触发changeStatus事件,div ---> input,其余不变,并且input框里显示的值是当前的值
- input blur失焦时,UndoList触发onInputBlur,恢复状态为div input ---> div
- input blur失焦时,触发onInputBlurToSave事件，保存新内容
  
### UndoList 组件的TDD
- 初始化UndoList,存放数组list为[],显示总数count为0,列表无内容
    - `const wrapper = shallow(<UndoList list={[]}/>);`
    - 获取元素上的内容`element.text()`
- UndoList,参数为[1,2,3],显示总数count为3,列表长度为3,并且有删除按钮
- 删除按钮点击时，删除当前点击的项
    - 利用`jest.fn` mock 删除时调用的事件 
        ```js
        const wrapper = shallow(<UndoList deleteItem={fn}/>);
        ```
    - 模拟点击项
        ```js
            const index = 1;
            deleteBtns.at(index).simulate('click');
            expect(fn).toHaveBeenLastCalledWith(index);
        ```
- 列表项被点击向外触发changeStatus事件
- 当状态是input,展示input,并且input框里显示的值是当前的值
- input blur失焦时,触发父级onInputBlur
- input blur失焦时,触发change事件通知父组件ToDoList去保存新内容

### 测试覆盖率
  ```js
    "cov": "node scripts/test.js --coverage --watchAll=false"

    // npm run cov
  ```
### jest-react 总结
- TDD 
  - 代码质量高
- 单元测试 
  - 测试覆盖率高 代码量大 业务耦合度高 过于独立

## BDD -- Behavior Driven Development 行为驱动开发
### VUE
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
#### VUEX
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

## jest-react-BDD

### 先编写完代码 再测试
```js
import React from 'react';
import { mount } from 'enzyme';
import TodoList from '../../TodoList';
import {
    findWrapper
} from '../../../../utils/testUtils';


it(`
    1. 找到Header组件的input框
    2. 在input框内输入内容
    3. 点击回车，触发change和回车事件
    4. undoList里的列表项新增一项
`, () => { 
    const wrapper = mount(<TodoList/>);
    const HeaderInput = findWrapper(wrapper, 'header-input');
    const content = '123';
    HeaderInput.simulate('change', {
        target: {
            value: content
        }
    });
    HeaderInput.simulate('keyUp', {
        keyCode:13
    });
    const listItems = findWrapper(wrapper, 'item');

    expect(listItems.length).toBe(1);
    expect(listItems.text()).toContain(content);
})
```

### Redux相关的测试
- npm i redux reeact-redux --save
- 连接Redux
    - 1. 创建全局Store
    ```js
        // createStore.js
        import { createStore, combineReducers} from "redux";
        import { reducer as todoReducer} from '../containers/TodoList/store';

        const reducer = combineReducers({
            todo: todoReducer
        });
        const store = createStore(reducer);
        export default store;
    ```
    ```js
        // index.js
        import { Provider } from "react-redux";
        import store from "./store/createStore";

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById("root")
        );
    ```
    - 2. 创建局部的reducer
        ```js
            import { CHANGE_INPUT_VALUE } from './constants';

            const initialState = {
                inputValue: ''
            }
            export default (state = initialState, action) => {
                switch (action.type) {
                    case CHANGE_INPUT_VALUE:
                        return {
                            inputValue: action.value
                        }   
                    default:
                        return state;
                }
            }
        ```
    - 3. 连接store和组件
        ```js
            import { connect } from "react-redux";
            const mapStateToProps = state => { 
                return {
                    value: state.todo.inputValue
                }
            }
            const mapDispatchToProps = dispatch => ({
                handleInputChange(value) {
                    dispatch(actions.handleInputChange(value));
                }
            })
            export default connect(mapStateToProps, mapDispatchToProps)(Header)
        ```
    - 4. 组件派发actions
        ```js
            import { actions } from '../store';
            const mapDispatchToProps = dispatch => ({
                    handleInputChange(value) {
                        dispatch(actions.handleInputChange(value));
                    }
            })  
        ```
        ```js
            import { CHANGE_INPUT_VALUE } from './constants';

            export const handleInputChange = value => ({
                type: CHANGE_INPUT_VALUE,
                value
            });
        ```
    - 5. reducer处理actions
        ```js
            import { CHANGE_INPUT_VALUE } from './constants';

            const initialState = {
                inputValue: ''
            }

            export default (state = initialState, action) => {
                switch (action.type) {
                    case CHANGE_INPUT_VALUE:
                        return {
                            inputValue: action.value
                        }   
                    default:
                        return state;
                }
            }
         ```
- 组件Redux测试
```js
    // 由于组件没有store，只需要将store下发即可
    import { Provider } from 'react-redux';
    import store from '../../../../store/createStore';
    const wrapper = mount(
        <Provider store={store}><TodoList/></Provider>
    );
```

### 异步代码的测试
- axios请求接口的模拟
    ```js
        componentDidMount() { 
            axios.get('/undoList.json').then(res => {
                this.setState({
                    undoList: res.data
                });
            }).catch(e => {
                console.log(e);
            });
        }
    ```
    ```js
      // __mocks__
        const mockData = {
            data: [
                {
                    status: 'div',
                    value: 'value from api'
                }
            ],
            success: true
        }
        export default {
            get(url) { 
                if (url === '/undoList.json') {
                    return new Promise((resolve, reject) => {
                         resolve(mockData)
                    });
                }
            }
        }
    ```
    ```js
        // setTimeout + done
        // process.nextTick + done
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
                done();
            });
        })
    ```

- 延迟异步代码的测试
```js
    componentDidMount() { 
        setTimeout(() => { 
            axios.get('/undoList2.json').then(res => {
                this.setState({
                    undoList: res.data
                });
            }).catch(e => {
                console.log(e);
            });
        },4000)
    }
```
```js
    const mockData2 = {
        data: [{
            status: 'div',
            value: 'value from api after 4s'
        }],
        success: true
    }
    export default {
        get(url) { 
            if (url === '/undoList2.json') {
                return new Promise((resolve, reject) => {
                    resolve(mockData2)
                });
            }
        }
    }
```
```js
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it(`
        1.用户打开页面
        2.5s后展示接口返回的数据
    `, (done) => { 
        const wrapper = mount(
            <Provider store={store}><TodoList /></Provider>
        ); 
        
        // 快进等待时间
        jest.runAllTimers(); 

        // 2  查看setTimeout执行的次数
        expect(setTimeout).toHaveBeenCalledTimes(1); 
            
        //3
        process.nextTick(() => {
            wrapper.update();
            const listItems = findWrapper(wrapper, 'item');
            expect(listItems.length).toBe(1);
            done();
        });
    })  
```

- 请求接口失败的情况
```js
    // 利用 this.success
    const mockData = {
        data: [
            {
                status: 'div',
                value: 'value from api'
            }
        ],
        success: true
    }

    export default {
        get(url) { 
            if (url === '/undoList.json') {
                return new Promise((resolve, reject) => {
                    if (this.success) { 
                        resolve(mockData)
                    } else {
                        reject(new Error('axios error'));
                    }
                });
            }
        }
    }
```
```js
    beforeEach(() => {
        axios.success = true;
    });

    it(`
        1.用户打开页面请求失败，也可以返回页面
    `, (done) => {
        // 1
        axios.success = false;

        const wrapper = mount(
            <Provider store={store}><TodoList /></Provider>
        );
        jest.runAllTimers();
        process.nextTick(() => {
            wrapper.update();
            const listItems = findWrapper(wrapper, 'item');
            expect(listItems.length).toBe(0);
            done();
        });
    })
```
### react-router-dom
- npm i react-router-dom --save
- 添加 NotFoundPage 404页面
```js
// App.js
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={TodoList} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
```

#### 目录结构的规整
- 可以按照页面级别放置
    - tree -I "node_modules" -L 2
    ```txt
    containers
        │   ├── NotFoundPage
        │   │   └── index.js
        │   └── TodoList
        │       ├── TodoList.js
        │       ├── __mocks__
        │       ├── __test__
        │       ├── components
        │       ├── index.css
        │       └── store  
    ```
- 也可以将components放置在外层
    ```txt
    components
    containers
        │   ├── NotFoundPage
        │   │   └── index.js
        │   └── TodoList
        │       ├── TodoList.js
        │       ├── __mocks__
        │       ├── __test__
        │       ├── index.css
        │       └── store  
    ```
