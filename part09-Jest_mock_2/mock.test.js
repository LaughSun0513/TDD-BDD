// --- jest.mock会自动去寻找'__mocks__'下文件名相同的文件getData代替当前mock.js里的getData
// jest.config.js里的 automock: true 配置起到同样的效果
jest.mock('./mock');

import { getData } from "./mock";
const { getNum } = jest.requireActual('./mock');

test('测试getData',()=>{
    return getData().then(data=>{
        expect(eval(data)).toEqual('123')
    })
});

// getNum 在'__mocks__/mock.js下找不到' 需要通过jest.requireActual找到原始的'./mock'
test('测试getNum',()=>{
    expect(getNum()).toEqual(123)
});