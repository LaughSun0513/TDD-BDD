import timer from './timer';

// 原始测试方法---缺点:需要等待
/**
     test('test timer',(done)=>{
        timer(()=>{
            expect(1).toBe(1);
            done();
        })
    })
 */
//-----useFakeTimers模拟假时间--------

beforeEach(()=>{
    jest.useFakeTimers();
});

test('runAllTimers',()=>{
    const fn = jest.fn();
    timer(fn);
    jest.runAllTimers(); // runAllTimers 快速过时间 达到模拟等待时间的过程
    expect(fn).toHaveBeenCalledTimes(2); //  toHaveBeenCalledTimes 执行次数
})

test('runOnlyPendingTimers',()=>{
    const fn = jest.fn();
    timer(fn);
    jest.runOnlyPendingTimers(); // 只执行外层的setTimeout，因为里面的setTimeout还未创建，3s后创建
    expect(fn).toHaveBeenCalledTimes(1);
})

test('advanceTimersByTime',()=>{
    const fn = jest.fn();
    timer(fn);
    
    jest.advanceTimersByTime(3000); // 快进3s执行第一个setTimeout
    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(3000); // 再快进3s执行第二个setTimeout
    expect(fn).toHaveBeenCalledTimes(2);
})