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