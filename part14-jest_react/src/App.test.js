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
  // expect(container.prop("name")).toBe("Yux");
  expect(container).toExist();
  expect(container).toHaveProp("name", "Yux");
})