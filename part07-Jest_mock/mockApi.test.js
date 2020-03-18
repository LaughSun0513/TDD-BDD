import axios from 'axios';
import { getData} from './mock';
jest.mock('axios');

//  mock功能2: 自由设置返回结果，不直接调用接口
//  mock功能3: 改变函数内部实现

test('getData', async () => {
    // axios.get.mockResolvedValue({data:'hello'});
    axios.get.mockResolvedValueOnce({data:'hello1'});
    axios.get.mockResolvedValueOnce({data:'world'});
    await getData().then(data=>{
        // expect(data).toBe('hello');
        expect(data).toBe('hello1');
    });
    await getData().then(data=>{
        expect(data).toBe('world');
    });
});