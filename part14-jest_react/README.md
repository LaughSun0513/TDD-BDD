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

    
- 循序渐进
```js
import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({
  adapter: new Adapter()
});

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('ReactDOM DOM测试APP组件 只能测试DOM显示 无法测试props和state的数据情况', () => {
  const div = document.createElement('div');
  ReactDOM.render(< App />, div);
  // ReactDOM.unmountComponentAtNode(div);
  const container = div.getElementsByClassName('App');
  expect(container.length).toBe(1);
});

// 引用Enzyme 提供一些抓组件的方法
// 引用jest-enzyme 提供一些toExist的匹配器，使用更简洁的测试语法
it('引用Enzyme 测试 APP组件 是否存在', () => {
  const wrapper = shallow(<App />);
  const container = wrapper.find('[data-test="App"]');
  console.log(wrapper.debug());

  // expect(container.length).toBe(1);
  // expect(.prop("name")).toBe("Yux");
  expect(container).toExist();
  expect(container).toHaveProp("name", "Yux");
})
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