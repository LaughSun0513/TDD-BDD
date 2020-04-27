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

