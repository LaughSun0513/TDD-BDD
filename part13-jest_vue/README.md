# part13-jest_vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## jest-vue

-   sudo npm install @vue/cli -g

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

-   jest.config.js 默认配置@vue/cli-plugin-unit-jest
    -   testMatch 配置测试目录,修改根目录为`__test__`下的`unit`文件夹下

### @vue/test-utils 的好处和使用

-   可以对 DOM 的变化进行测试
-   可以对 DOM 的数据进行访问测试(原生 DOM 只有操作 DOM 的能力，有局限性) -- 解决: @vue/test-util 工具
-   API https://vue-test-utils.vuejs.org/zh/api/#shallowmount
    -   组件的渲染方式 生成 wrapper 容器
        -   shallowMount | mount ....
    -   wrapper 的 APIs
        -   find | findAll | props | setProps...
-   复习知识点: toMatchSnapshot 对组件进行渲染

```js
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld';
import Vue from 'vue';

describe('HelloWorld.vue', () => {
	it('DOM测试只能检测UI层面的变化 不方便', () => {
		const root = document.createElement('div');
		root.className = 'root';
		document.body.appendChild(root);
		new Vue({
			render: h => (
				HelloWorld,
				{
					props: {
						msg: 'Yux'
					}
				}
			)
		}).$mount('.root');
		console.log(document.body.innerHTML);
		expect(document.getElementsByClassName('hello').length).toBe(1);
	});

	it('利用shallowMount浅渲染HelloWorld组件,不渲染HelloWorld子组件,适合单元测试', () => {
		const msg = 'hahahah';
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

	it('复习:利用toMatchSnapshot快照进行组件的渲染', () => {
		const wrapper = shallowMount(HelloWorld, {
			propsData: {
				msg: 'Yux-snapshot'
			}
		});
		expect(wrapper).toMatchSnapshot();
	});
});
```

### TodoList 组件(主组件)

1. 初始化 TodoList 组件,由 Header 组件 + UndoList 组件 组成
2. Header 组件负责输入，UndoList 组件负责展示和编辑
3. 初始化放任务的数组 undoList，传递给 UndoList 组件

-   初始化时，undoList 为空

4. 监听 header 组件的 add 事件，触发自身的 addUndoItem 操作，新增一项

-   通过`header.vm.$emit('add', newItem);`(header 组件联动 TodoList 组件，属于集成测试)
-   单元测试 可以模拟设置值`wrapper.setData()`

5. 通过监听 UndoList 组件的 delete 事件触发自身 handleDeleteItem 操作，减少一项
6. 修改为编辑态，通过监听 UndoList 组件的 status 事件触发自身 changeStatus 操作，修改当前下标项
   status 'div' ---> status 'input'
7. 修改为显示态，通过监听到 UndoList 组件的 reset 事件后,修改当前 item 的状态为 div  
   status 'input' ---> status 'div'
8. 保存新内容，通过监听到 UndoList 组件的 change 事件，changeItemValue 事件修改当前 item 的内容

### Header 组件的 TDD 驱动开发（子组件，负责输入）

1. 初始化 Header 组件,包含 input 框

-   通过 `data-test` 给要初始化的 DOM 节点打标记，`wrapper.findAll` 来寻找
-   通过`exists()`方法证明是否存在

2. input 框初始值为空

-   通过`wrapper.vm.inputValue`获取 input 值

3. input 框值发生变化,v-model 数据跟着变

-   通过`setValue`设置值

4. input 框输入回车，无内容时没反应

-   通过`trigger`触发动作
-   通过`wrapper.emitted().fn`触发`fn`自定义方法

5. input 框输入回车，有内容时,向外触发事件，清空 inputValue
6. Header 样式保存,变化后提示

-   通过`toMatchSnapshot()`保存设置好的样式，防止样式变化

### UndoList 组件（子组件，负责展示和编辑）

1. 初始化 UndoList,参数为[],显示总数 count 为 0,列表无内容

    - 设置初始值`propsData`

2. UndoList,参数为[1,2,3],显示总数 count 为 3,列表长度为 3,并且有删除按钮
3. 删除按钮点击时，删除当前点击的项

    - `wrapper.emitted().delete` 触发 delete 事件

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
