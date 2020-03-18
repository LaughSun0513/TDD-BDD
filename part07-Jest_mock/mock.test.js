import { runCallback , testInstances} from './mock';

//  mock功能1: 捕获函数的调用，返回结果，this 指向，执行顺序

test('test runCallback by  jest.fn', () => {
    const mockFn = jest.fn(()=>{
        return '456'
    });
    // mockFn.mockReturnValue('123');
    // mockFn.mockReturnValue('789');
    mockFn.mockReturnValue('123').mockReturnValue('1111');

    mockFn.mockImplementation(()=>{
        console.log('222222')
        return '333333'
    });

    mockFn.mockImplementationOnce(()=>{
        console.log('4444')
        return '5555'
    });
    mockFn.mockImplementationOnce(()=>{
        console.log('6666')
        return '7777'
    });

    mockFn.mockImplementation(()=>{
        return this;
    });
    mockFn.mockReturnThis();

    runCallback(mockFn); // 每次调用mock的Fn，就会在mockFn.mock的calls里面展示测试函数runCallback的返回值
    runCallback(mockFn);
    runCallback(mockFn);

    expect(mockFn).toBeCalled();
    expect(mockFn.mock.calls.length).toBe(3);

    expect(mockFn.mock.calls[0]).toEqual(['abc']);
    expect(mockFn).toBeCalledWith('abc');

    // expect(mockFn.mock.results[0].value).toBe('1111');
    // expect(mockFn.mock.results[0].value).toBe('333333');
    expect(mockFn.mock.results[0].value).toBe('5555');
    expect(mockFn.mock.results[2].value).toBeUndefined();

    console.log(mockFn.mock);
});

/*======mockFn.mock=======
{   
    calls: [ [ 'abc' ], [ 'abc' ], [ 'abc' ] ],---runCallback的返回值
    instances: [ undefined, undefined, undefined ],----每个函数的this指向
    invocationCallOrder: [ 1, 2, 3 ],----runCallback函数的执行顺序
    results:
    [ { type: 'return', value: undefined },---jest.fn的返回值
       { type: 'return', value: undefined },
       { type: 'return', value: undefined } ] 
}
*/

/*
==============
 jest.fn(()=>{
        return '456'
});
=============
{ 
      calls: [ [ 'abc' ], [ 'abc' ], [ 'abc' ] ],
      instances: [ undefined, undefined, undefined ],
      invocationCallOrder: [ 1, 2, 3 ], 
      results:
       [ { type: 'return', value: '456' },
         { type: 'return', value: '456' },
         { type: 'return', value: '456' } ] 
}
*/
/*  =========mockFn.mockReturnValue('789')==========
{ 
      calls: [ [ 'abc' ], [ 'abc' ], [ 'abc' ] ],
      instances: [ undefined, undefined, undefined ],
      invocationCallOrder: [ 1, 2, 3 ],
      results:
       [ { type: 'return', value: '789' },
         { type: 'return', value: '789' },
         { type: 'return', value: '789' } ] }
*/

test('test testInstances ', () => {
    const mockFn2 = jest.fn();
    testInstances(mockFn2);
    console.log(mockFn2.mock);
});
/**
 { calls: [ [] ],
    instances: [ mockConstructor {} ],-----testInstances
    invocationCallOrder: [ 4 ],
    results: [ { type: 'return', value: undefined } ] }
 */
